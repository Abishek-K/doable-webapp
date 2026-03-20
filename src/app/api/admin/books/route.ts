import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb, adminStorage } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_COVER_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_AUDIO_BYTES = 20 * 1024 * 1024; // 20MB
const MAX_TOTAL_UPLOAD_BYTES = 50 * 1024 * 1024; // 50MB
const MAX_SUMMARY_CARDS = 200;

type SummaryCardInput = {
  cardTitle: string;
  contentMarkdown: string;
  audioFieldKey?: string;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function toSafeString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toBoolean(value: FormDataEntryValue | null) {
  return String(value).toLowerCase() === "true";
}

function sanitizeSlug(raw: string) {
  const slug = raw.trim().toLowerCase();
  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  return isValid ? slug : "";
}

function sanitizeCategories(raw: string) {
  const deduped = new Set(
    raw
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
      .map((item) => item.replace(/\s+/g, " "))
  );

  return Array.from(deduped)
    .filter((item) => item.length <= 40)
    .slice(0, 15);
}

function estimateSummaryReadTime(contentMarkdown: string) {
  const words = contentMarkdown
    .replace(/[#_*`>\-\[\]\(\)!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

async function uploadFileAndGetUrl(file: File, path: string, bucketName: string) {
  const bucket = adminStorage();
  const token = randomUUID();
  const buffer = Buffer.from(await file.arrayBuffer());

  await bucket.file(path).save(buffer, {
    metadata: {
      contentType: file.type || "application/octet-stream",
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
    resumable: false,
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    path
  )}?alt=media&token=${token}`;
}

export async function POST(request: NextRequest) {
  console.info("[admin/books] request received");

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonError("Missing authorization token.", 401);
    }

    const idToken = authHeader.slice("Bearer ".length).trim();
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    if (decoded.admin !== true) {
      return jsonError("Forbidden: admin access required.", 403);
    }

    const formData = await request.formData();
    const title = toSafeString(formData.get("title"));
    const author = toSafeString(formData.get("author"));
    const slug = sanitizeSlug(toSafeString(formData.get("slug")));
    const categories = sanitizeCategories(toSafeString(formData.get("categories")));
    const readTimeRaw = Number.parseInt(toSafeString(formData.get("readTime")), 10);
    const published = toBoolean(formData.get("published"));
    const coverImage = formData.get("coverImage");
    const summaryCardsRaw = formData.get("summaryCards");

    if (!title || !author || !slug || !Number.isFinite(readTimeRaw) || readTimeRaw <= 0) {
      return jsonError("Missing or invalid required fields.", 400);
    }

    if (categories.length === 0) {
      return jsonError("At least one category is required.", 400);
    }

    if (!(coverImage instanceof File)) {
      return jsonError("Cover image is required.", 400);
    }

    if (coverImage.size <= 0 || coverImage.size > MAX_COVER_BYTES) {
      return jsonError("Cover image exceeds maximum size (5MB).", 400);
    }

    if (!coverImage.type.startsWith("image/")) {
      return jsonError("Cover image must be an image file.", 400);
    }

    if (typeof summaryCardsRaw !== "string") {
      return jsonError("Summary cards payload is required.", 400);
    }

    let parsedSummaryCards: SummaryCardInput[] = [];
    try {
      parsedSummaryCards = JSON.parse(summaryCardsRaw) as SummaryCardInput[];
    } catch (error) {
      console.error("[admin/books] summaryCards JSON parse error", error);
      return jsonError("Invalid summaryCards JSON.", 400);
    }

    if (!Array.isArray(parsedSummaryCards) || parsedSummaryCards.length === 0) {
      return jsonError("At least one summary card is required.", 400);
    }

    if (parsedSummaryCards.length > MAX_SUMMARY_CARDS) {
      return jsonError(`Too many summary cards. Maximum is ${MAX_SUMMARY_CARDS}.`, 400);
    }

    const summaryCards = parsedSummaryCards.map((card, index) => ({
      cardTitle: String(card.cardTitle ?? "").trim(),
      contentMarkdown: String(card.contentMarkdown ?? "").trim(),
      audioFieldKey: card.audioFieldKey ? String(card.audioFieldKey) : "",
      order: index,
    }));

    if (summaryCards.some((card) => !card.cardTitle || !card.contentMarkdown)) {
      return jsonError("Each summary card must include title and markdown content.", 400);
    }

    let totalUploadBytes = coverImage.size;
    const audioUploads: { index: number; file: File }[] = [];

    for (const card of summaryCards) {
      if (!card.audioFieldKey) continue;

      const audioEntry = formData.get(card.audioFieldKey);
      if (!(audioEntry instanceof File) || audioEntry.size === 0) continue;

      if (audioEntry.size > MAX_AUDIO_BYTES) {
        return jsonError("An audio file exceeds maximum size (20MB).", 400);
      }

      if (audioEntry.type && !audioEntry.type.startsWith("audio/")) {
        return jsonError("Audio uploads must be valid audio files.", 400);
      }

      totalUploadBytes += audioEntry.size;
      audioUploads.push({ index: card.order, file: audioEntry });
    }

    if (totalUploadBytes > MAX_TOTAL_UPLOAD_BYTES) {
      return jsonError("Total upload size exceeds maximum limit (50MB).", 400);
    }

    const db = adminDb();
    const bookRef = db.collection("books").doc(slug);
    const existing = await bookRef.get();
    if (existing.exists) {
      return jsonError("Slug already exists. Please choose another slug.", 409);
    }

    const bucket = adminStorage();
    const bucketName = bucket.name;
    console.info("[admin/books] uploading files", {
      slug,
      audioFiles: audioUploads.length,
      bucket: bucketName,
    });

    const coverPath = `books/${slug}/cover.jpg`;
    const coverUrl = await uploadFileAndGetUrl(coverImage, coverPath, bucketName);

    const audioUrlByIndex = new Map<number, string>();
    for (const audioUpload of audioUploads) {
      const audioPath = `books/${slug}/audio/${audioUpload.index}.mp3`;
      const audioUrl = await uploadFileAndGetUrl(audioUpload.file, audioPath, bucketName);
      audioUrlByIndex.set(audioUpload.index, audioUrl);
    }

    const now = new Date();
    const summaryCount = summaryCards.length;
    const audioAvailable = audioUrlByIndex.size > 0;

    await bookRef.set({
      title,
      author,
      coverUrl,
      categories,
      readTime: readTimeRaw,
      published,
      seo: { slug },
      summaryCount,
      audioAvailable,
      createdAt: now,
      updatedAt: now,
    });

    const batch = db.batch();
    summaryCards.forEach((card) => {
      const summaryRef = bookRef.collection("summaries").doc();
      batch.set(summaryRef, {
        title: card.cardTitle,
        order: card.order,
        contentMarkdown: card.contentMarkdown,
        audioUrl: audioUrlByIndex.get(card.order) ?? "",
        highlights: [],
        readTime: estimateSummaryReadTime(card.contentMarkdown),
        createdAt: now,
        updatedAt: now,
      });
    });
    await batch.commit();

    console.info("[admin/books] book created successfully", { slug, summaryCount });
    return NextResponse.json({
      success: true,
      message: "Book created successfully.",
      data: { slug, summaryCount, audioAvailable },
    });
  } catch (error) {
    console.error("[admin/books] unexpected error", error);
    return jsonError("Failed to create book.", 500);
  }
}

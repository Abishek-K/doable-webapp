import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb, adminStorage } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_COVER_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_TAGS = 20;

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function toSafeString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function sanitizeSlug(raw: string) {
  const slug = raw.trim().toLowerCase();
  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  return isValid ? slug : "";
}

function sanitizeTags(raw: string) {
  return Array.from(
    new Set(
      raw
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, MAX_TAGS)
    )
  );
}

function estimateReadingTime(contentMarkdown: string) {
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
    const slug = sanitizeSlug(toSafeString(formData.get("slug")));
    const excerpt = toSafeString(formData.get("excerpt"));
    const contentMarkdown = toSafeString(formData.get("contentMarkdown"));
    const author = toSafeString(formData.get("author"));
    const category = toSafeString(formData.get("category"));
    const tags = sanitizeTags(toSafeString(formData.get("tags")));
    const status = toSafeString(formData.get("status")) === "published" ? "published" : "draft";
    const metaTitle = toSafeString(formData.get("metaTitle"));
    const metaDescription = toSafeString(formData.get("metaDescription"));
    const coverImage = formData.get("coverImage");

    if (!title || !slug || !excerpt || !contentMarkdown || !author || !category) {
      return jsonError("Missing required fields.", 400);
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

    const db = adminDb();
    const blogRef = db.collection("blogs").doc(slug);
    const existing = await blogRef.get();
    if (existing.exists) {
      return jsonError("Slug already exists. Please choose another slug.", 409);
    }

    const bucket = adminStorage();
    const bucketName = bucket.name;
    const coverPath = `blogs/${slug}/cover.jpg`;
    const coverUrl = await uploadFileAndGetUrl(coverImage, coverPath, bucketName);

    const now = new Date();
    const readingTime = estimateReadingTime(contentMarkdown);

    await blogRef.set({
      title,
      slug,
      excerpt,
      contentMarkdown,
      coverUrl,
      author,
      category,
      tags,
      readingTime,
      status,
      publishedAt: status === "published" ? now : null,
      updatedAt: now,
      createdAt: now,
      seo: {
        metaTitle: metaTitle || `${title} | Doable Blog`,
        metaDescription: metaDescription || excerpt,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/blogs] unexpected error", error);
    return jsonError("Failed to create blog post.", 500);
  }
}

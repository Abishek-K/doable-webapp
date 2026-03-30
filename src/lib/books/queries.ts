import type { DocumentData, DocumentReference } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { clampText, markdownToPlain } from "@/lib/books/markdown";
import {
  buildBookSummaryPageFromFirestore,
  quickExploreFromBookDoc,
} from "@/lib/books/buildSummaryPage";
import type { ExploreBook } from "@/data/exploreMock";
import type { BookSummaryPage } from "@/data/bookSummaryMock";
import type { FirestoreBookDoc, FirestoreSummaryDoc } from "@/lib/books/types";

function asBookDoc(data: DocumentData | undefined): FirestoreBookDoc | null {
  if (!data) return null;
  if (typeof data.title !== "string" || typeof data.author !== "string") return null;
  if (typeof data.coverUrl !== "string") return null;
  if (!Array.isArray(data.categories)) return null;
  if (typeof data.readTime !== "number") return null;
  if (typeof data.published !== "boolean") return null;
  return data as FirestoreBookDoc;
}

async function firstSummaryExcerpt(
  bookRef: FirebaseFirestore.DocumentReference
): Promise<string> {
  const q = await bookRef
    .collection("summaries")
    .orderBy("order")
    .limit(1)
    .get();
  if (q.empty) return "";
  const md = String(q.docs[0].data().contentMarkdown ?? "");
  const plain = markdownToPlain(md);
  return plain.length > 0 ? clampText(plain, 200) : "";
}

export async function getPublishedBooksForExplore(): Promise<ExploreBook[]> {
  try {
    const db = adminDb();
    const snap = await db.collection("books").where("published", "==", true).get();
    const rows = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = asBookDoc(doc.data());
        if (!data) return null;
        const slug = doc.id;
        const excerpt = await firstSummaryExcerpt(doc.ref);
        return quickExploreFromBookDoc(slug, data, excerpt);
      })
    );
    return rows.filter((r): r is ExploreBook => r !== null);
  } catch (err) {
    console.error("[books] getPublishedBooksForExplore", err);
    return [];
  }
}

export async function getPublishedBookSlugs(): Promise<string[]> {
  try {
    const db = adminDb();
    const snap = await db.collection("books").where("published", "==", true).get();
    return snap.docs.map((d) => d.id);
  } catch (err) {
    console.error("[books] getPublishedBookSlugs", err);
    return [];
  }
}

export async function getBookSummaryPageBySlug(
  slug: string
): Promise<BookSummaryPage | null> {
  try {
    const db = adminDb();
    const bookRef = db.collection("books").doc(slug);
    const bookSnap = await bookRef.get();
    if (!bookSnap.exists) return null;
    const book = asBookDoc(bookSnap.data());
    if (!book || book.published !== true) return null;

    const sumSnap = await bookRef
      .collection("summaries")
      .orderBy("order", "asc")
      .get();
    const summaries = sumSnap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as FirestoreSummaryDoc),
    }));

    const catalog = await getPublishedBooksForExplore();
    return buildBookSummaryPageFromFirestore(slug, book, summaries, catalog);
  } catch (err) {
    console.error("[books] getBookSummaryPageBySlug", err);
    return null;
  }
}

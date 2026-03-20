"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

type BookRow = {
  id: string;
  title: string;
  author: string;
  categories: string[];
  summaryCount: number;
  published: boolean;
  coverUrl: string;
  createdAtMs: number;
};

function normalizeDateMs(value: unknown) {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (value instanceof Date) return value.getTime();
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().getTime();
  }
  return 0;
}

function LoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="animate-pulse divide-y divide-slate-200 bg-white">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="grid grid-cols-6 gap-4 px-4 py-4">
            <div className="h-10 w-10 rounded-md bg-slate-200" />
            <div className="h-5 rounded bg-slate-200" />
            <div className="h-5 rounded bg-slate-200" />
            <div className="h-5 rounded bg-slate-200" />
            <div className="h-5 rounded bg-slate-200" />
            <div className="h-9 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<BookRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(collection(db, "books"));
      const rows: BookRow[] = snapshot.docs.map((document) => {
        const data = document.data() as Record<string, unknown>;
        return {
          id: document.id,
          title: String(data.title ?? "Untitled"),
          author: String(data.author ?? "Unknown"),
          categories: Array.isArray(data.categories)
            ? data.categories
                .filter((item): item is string => typeof item === "string")
                .slice(0, 3)
            : [],
          summaryCount:
            typeof data.summaryCount === "number" ? data.summaryCount : 0,
          published: data.published === true,
          coverUrl: String(data.coverUrl ?? ""),
          createdAtMs: normalizeDateMs(data.createdAt),
        };
      });

      rows.sort((a, b) => b.createdAtMs - a.createdAtMs);
      setBooks(rows);
    } catch (fetchError) {
      console.error("[admin/books] fetch error", fetchError);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const publishedCount = useMemo(
    () => books.filter((book) => book.published).length,
    [books]
  );

  const handleTogglePublished = async (book: BookRow) => {
    try {
      setTogglingId(book.id);
      await updateDoc(doc(db, "books", book.id), {
        published: !book.published,
        updatedAt: serverTimestamp(),
      });

      setBooks((prev) =>
        prev.map((row) =>
          row.id === book.id ? { ...row, published: !book.published } : row
        )
      );
    } catch (toggleError) {
      console.error("[admin/books] toggle error", toggleError);
      setError("Failed to update publish state.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Books
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {books.length} total books, {publishedCount} published.
          </p>
        </div>

        <Link
          href="/admin/create"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create Book
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchBooks}
            className="mt-3 inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Summaries</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-3">
                    <div className="h-12 w-10 overflow-hidden rounded-md bg-slate-100">
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={`${book.title} cover`}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                    {book.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{book.author}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {book.categories[0] ?? "â€”"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {book.summaryCount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        book.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {book.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(book)}
                      disabled={togglingId === book.id}
                      className="inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {togglingId === book.id
                        ? "Saving..."
                        : book.published
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}

              {books.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No books found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

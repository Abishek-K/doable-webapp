"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

type BlogRow = {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  coverUrl: string;
  publishedAtMs: number;
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
          <div key={idx} className="grid grid-cols-7 gap-4 px-4 py-4">
            <div className="h-10 w-10 rounded-md bg-slate-200" />
            <div className="col-span-2 h-5 rounded bg-slate-200" />
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

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(collection(db, "blogs"));
      const rows: BlogRow[] = snapshot.docs.map((document) => {
        const data = document.data() as Record<string, unknown>;
        return {
          id: document.id,
          title: String(data.title ?? "Untitled"),
          author: String(data.author ?? "Unknown"),
          category: String(data.category ?? "General"),
          tags: Array.isArray(data.tags)
            ? data.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 5)
            : [],
          status: String(data.status) === "published" ? "published" : "draft",
          coverUrl: String(data.coverUrl ?? ""),
          publishedAtMs: normalizeDateMs(data.publishedAt ?? data.createdAt),
        };
      });

      rows.sort((a, b) => b.publishedAtMs - a.publishedAtMs);
      setBlogs(rows);
    } catch (fetchError) {
      console.error("[admin/blogs] fetch error", fetchError);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const publishedCount = useMemo(
    () => blogs.filter((blog) => blog.status === "published").length,
    [blogs]
  );

  const handleTogglePublished = async (blog: BlogRow) => {
    try {
      setTogglingId(blog.id);
      const nextStatus = blog.status === "published" ? "draft" : "published";
      const updatePayload = {
        status: nextStatus,
        updatedAt: serverTimestamp(),
        ...(nextStatus === "published" ? { publishedAt: serverTimestamp() } : {}),
      };

      await updateDoc(doc(db, "blogs", blog.id), updatePayload);

      setBlogs((prev) =>
        prev.map((row) =>
          row.id === blog.id ? { ...row, status: nextStatus } : row
        )
      );
    } catch (toggleError) {
      console.error("[admin/blogs] toggle error", toggleError);
      setError("Failed to update publish state.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Blogs</h1>
          <p className="mt-1 text-sm text-slate-600">
            {blogs.length} total posts, {publishedCount} published.
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create Blog
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchBlogs}
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
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-4 py-3">
                    <div className="h-12 w-10 overflow-hidden rounded-md bg-slate-100">
                      {blog.coverUrl ? (
                        <img
                          src={blog.coverUrl}
                          alt={`${blog.title} cover`}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                    {blog.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{blog.author}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{blog.category}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {blog.tags.length > 0 ? blog.tags.join(", ") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        blog.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(blog)}
                      disabled={togglingId === blog.id}
                      className="inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {togglingId === blog.id
                        ? "Saving..."
                        : blog.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                    No blog posts found.
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

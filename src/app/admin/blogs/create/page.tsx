"use client";

import { FormEvent, useMemo, useState } from "react";
import { auth } from "@/firebase/config";
import { BLOG_CATEGORIES } from "@/data/blogPosts";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadingTime(text: string) {
  const words = text
    .replace(/[#_*`>\-\[\]\(\)!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export default function AdminCreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [author, setAuthor] = useState("Doable Team");
  const [category, setCategory] = useState<BlogCategory>(BLOG_CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const readingTime = useMemo(
    () => estimateReadingTime(contentMarkdown || excerpt || title),
    [contentMarkdown, excerpt, title]
  );

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      slug.trim().length > 0 &&
      excerpt.trim().length > 0 &&
      contentMarkdown.trim().length > 0 &&
      author.trim().length > 0 &&
      category.trim().length > 0 &&
      coverImage instanceof File &&
      !submitting
    );
  }, [author, category, contentMarkdown, coverImage, excerpt, slug, status, submitting, title]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessToast(null);

    if (!auth.currentUser) {
      setError("You must be logged in as an admin to create blog posts.");
      return;
    }

    if (!coverImage) {
      setError("Cover image is required.");
      return;
    }

    try {
      setSubmitting(true);
      const token = await auth.currentUser.getIdToken(true);
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("slug", slug.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("contentMarkdown", contentMarkdown.trim());
      formData.append("author", author.trim());
      formData.append("category", category.trim());
      formData.append("tags", tags);
      formData.append("readingTime", String(readingTime));
      formData.append("status", status);
      formData.append("metaTitle", metaTitle.trim());
      formData.append("metaDescription", metaDescription.trim());
      formData.append("coverImage", coverImage);

      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to create blog post.");
      }

      setSuccessToast("Blog post created successfully.");
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContentMarkdown("");
      setAuthor("Doable Team");
      setCategory(BLOG_CATEGORIES[0]);
      setTags("");
      setStatus("draft");
      setCoverImage(null);
      setMetaTitle("");
      setMetaDescription("");
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (submitError) {
      console.error("[admin/blogs/create] submit error", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while creating the blog post."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {successToast ? (
        <div className="fixed right-4 top-4 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
          {successToast}
        </div>
      ) : null}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Blog</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add a new article and publish it to the Doable blog.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input
              value={title}
              onChange={(event) => {
                const next = event.target.value;
                setTitle(next);
                if (!slug) {
                  setSlug(slugify(next));
                }
              }}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Slug</span>
            <input
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Excerpt</span>
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className="min-h-[120px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Author</span>
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as BlogCategory)}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
            >
              {BLOG_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Tags</span>
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="productivity, focus, mindset"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Cover Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverImage(event.target.files?.[0] ?? null)}
              className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Estimated reading time</span>
            <input
              value={`${readingTime} min`}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">SEO meta title</span>
            <input
              value={metaTitle}
              onChange={(event) => setMetaTitle(event.target.value)}
              placeholder="Optional meta title"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">SEO meta description</span>
            <textarea
              value={metaDescription}
              onChange={(event) => setMetaDescription(event.target.value)}
              placeholder="Optional meta description"
              className="min-h-[120px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Content Markdown</span>
          <textarea
            value={contentMarkdown}
            onChange={(event) => setContentMarkdown(event.target.value)}
            className="min-h-[260px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            required
          />
        </label>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Live preview</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">{title || "Blog post title"}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {excerpt || "A short excerpt will appear here once you add it."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>{category}</span>
            {tags ? <span>{tags.split(",").map((tag) => tag.trim()).filter(Boolean).join(" • ")}</span> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Saving...
            </>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
}

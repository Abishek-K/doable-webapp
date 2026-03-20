"use client";

import { FormEvent, useMemo, useState } from "react";
import { auth } from "@/firebase/config";

type SummaryCardForm = {
  id: string;
  cardTitle: string;
  contentMarkdown: string;
  audioFile: File | null;
};

function newSummaryCard(): SummaryCardForm {
  return {
    id: `card-${crypto.randomUUID()}`,
    cardTitle: "",
    contentMarkdown: "",
    audioFile: null,
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminCreateBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [readTime, setReadTime] = useState(15);
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [summaryCards, setSummaryCards] = useState<SummaryCardForm[]>([
    newSummaryCard(),
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      !submitting &&
      title.trim().length > 0 &&
      author.trim().length > 0 &&
      slug.trim().length > 0 &&
      categories.trim().length > 0 &&
      Number.isFinite(readTime) &&
      readTime > 0 &&
      coverImage instanceof File &&
      summaryCards.length > 0 &&
      summaryCards.every(
        (card) =>
          card.cardTitle.trim().length > 0 && card.contentMarkdown.trim().length > 0
      )
    );
  }, [author, categories, coverImage, readTime, slug, submitting, summaryCards, title]);

  const updateCard = (id: string, updater: (card: SummaryCardForm) => SummaryCardForm) => {
    setSummaryCards((prev) => prev.map((card) => (card.id === id ? updater(card) : card)));
  };

  const removeCard = (id: string) => {
    setSummaryCards((prev) => (prev.length <= 1 ? prev : prev.filter((card) => card.id !== id)));
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    setSummaryCards((prev) => {
      const nextIndex = direction === "up" ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessToast(null);

    if (!auth.currentUser) {
      setError("You must be logged in as an admin to create books.");
      return;
    }

    try {
      setSubmitting(true);

      const token = await auth.currentUser.getIdToken(true);
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("author", author.trim());
      formData.append("slug", slug.trim());
      formData.append("categories", categories.trim());
      formData.append("readTime", String(readTime));
      formData.append("published", String(published));

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const summaryPayload = summaryCards.map((card, index) => {
        const audioFieldKey = `audioFile_${index}`;
        if (card.audioFile) {
          formData.append(audioFieldKey, card.audioFile);
        }

        return {
          cardTitle: card.cardTitle,
          contentMarkdown: card.contentMarkdown,
          audioFieldKey: card.audioFile ? audioFieldKey : "",
        };
      });

      formData.append("summaryCards", JSON.stringify(summaryPayload));

      const response = await fetch("/api/admin/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to create book.");
      }

      setSuccessToast("Book created successfully.");
      setTitle("");
      setAuthor("");
      setSlug("");
      setCategories("");
      setReadTime(15);
      setPublished(false);
      setCoverImage(null);
      setSummaryCards([newSummaryCard()]);

      setTimeout(() => setSuccessToast(null), 3000);
    } catch (submitError) {
      console.error("[admin/create] submit error", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while creating the book."
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create Book
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Add core metadata, cover image, and summary cards.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input
              value={title}
              onChange={(event) => {
                const next = event.target.value;
                setTitle(next);
                if (!slug) setSlug(slugify(next));
              }}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
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
            <span className="text-sm font-medium text-slate-700">Slug</span>
            <input
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">
              Categories (comma separated)
            </span>
            <input
              value={categories}
              onChange={(event) => setCategories(event.target.value)}
              placeholder="productivity, leadership, habits"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Read Time (minutes)</span>
            <input
              type="number"
              min={1}
              value={readTime}
              onChange={(event) => setReadTime(Number.parseInt(event.target.value, 10) || 0)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Cover Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverImage(event.target.files?.[0] ?? null)}
              className="block h-10 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
              required
            />
          </label>
        </div>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900"
          />
          <span className="text-sm font-medium text-slate-700">Published</span>
        </label>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Summary Cards</h2>
            <button
              type="button"
              onClick={() => setSummaryCards((prev) => [...prev, newSummaryCard()])}
              className="inline-flex h-9 items-center rounded-md bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Add Card
            </button>
          </div>

          <div className="space-y-4">
            {summaryCards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Card {index + 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveCard(index, "up")}
                      className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCard(index, "down")}
                      className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCard(card.id)}
                      className="rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <label className="mb-3 block space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Card Title
                  </span>
                  <input
                    value={card.cardTitle}
                    onChange={(event) =>
                      updateCard(card.id, (item) => ({
                        ...item,
                        cardTitle: event.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-0 transition focus:border-slate-900"
                    required
                  />
                </label>

                <label className="mb-3 block space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Content Markdown
                  </span>
                  <textarea
                    value={card.contentMarkdown}
                    onChange={(event) =>
                      updateCard(card.id, (item) => ({
                        ...item,
                        contentMarkdown: event.target.value,
                      }))
                    }
                    className="min-h-[180px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
                    required
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Optional Audio File
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(event) =>
                      updateCard(card.id, (item) => ({
                        ...item,
                        audioFile: event.target.files?.[0] ?? null,
                      }))
                    }
                    className="block h-10 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  />
                </label>
              </div>
            ))}
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
              Creating...
            </>
          ) : (
            "Create Book"
          )}
        </button>
      </form>
    </div>
  );
}

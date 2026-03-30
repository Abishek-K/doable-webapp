import type {
  BookInsight,
  BookQuote,
  BookSummaryPage,
  RelatedBook,
} from "@/data/bookSummaryMock";
import { BOOK_SUMMARIES } from "@/data/bookSummaryMock";
import type { ExploreBook } from "@/data/exploreMock";
import {
  clampText,
  extractBulletLines,
  extractDoubleQuotedSnippets,
  markdownToPlain,
} from "@/lib/books/markdown";
import type { FirestoreBookDoc, FirestoreSummaryDoc } from "@/lib/books/types";
import { firestoreBookToExploreBook } from "@/lib/books/exploreMap";

type SummaryRow = FirestoreSummaryDoc & { id: string };

function summariesToInsights(summaries: SummaryRow[]): BookInsight[] {
  return summaries.map((s, i) => {
    const plain = markdownToPlain(s.contentMarkdown);
    const bullets = extractBulletLines(s.contentMarkdown);
    const description =
      plain.length > 0
        ? clampText(plain, 320)
        : "Key ideas from this section of the summary.";
    const takeaway =
      bullets[0] ?? "Spend 10 minutes applying this idea in your work today.";
    return {
      n: String(i + 1).padStart(2, "0"),
      title: s.title,
      description,
      takeaway,
    };
  });
}

function collectActions(summaries: SummaryRow[], author: string): { id: string; text: string }[] {
  const seen = new Set<string>();
  const out: { id: string; text: string }[] = [];
  let i = 0;
  for (const s of summaries) {
    for (const line of extractBulletLines(s.contentMarkdown)) {
      const norm = line.toLowerCase();
      if (!seen.has(norm) && line.length > 8) {
        seen.add(norm);
        out.push({ id: `a${++i}`, text: line });
        if (out.length >= 3) return out;
      }
    }
  }
  while (out.length < 3) {
    out.push({
      id: `a${++i}`,
      text: `Re-read one insight from this summary and note one action for ${author.split(" ")[0] ?? "your"} ideas.`,
    });
  }
  return out.slice(0, 3);
}

function buildRecap(summaries: SummaryRow[]): { keyword: string; text: string }[] {
  return summaries.slice(0, 3).map((s) => {
    const plain = markdownToPlain(s.contentMarkdown);
    const keyword = clampText(s.title.split(/[.:]/)[0].trim(), 28);
    return {
      keyword,
      text: plain.length > 0 ? clampText(plain, 140) : clampText(s.title, 120),
    };
  });
}

function buildQuotes(
  summaries: SummaryRow[],
  author: string
): BookQuote[] {
  const combined = summaries.map((s) => s.contentMarkdown).join("\n");
  const snippets = extractDoubleQuotedSnippets(combined);
  const quotes: BookQuote[] = [];
  if (snippets[0]) {
    quotes.push({
      variant: "beige",
      quote: snippets[0],
      attribution: author,
    });
  }
  if (snippets[1]) {
    quotes.push({ variant: "blue", quote: snippets[1] });
  }
  return quotes;
}

function exploreListToRelated(
  others: ExploreBook[],
  currentSlug: string
): RelatedBook[] {
  return others
    .filter((b) => b.id !== currentSlug)
    .slice(0, 3)
    .map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      coverSrc: b.coverSrc,
      cardBgClass: b.cardBgClass,
    }));
}

function mergeWithStaticFallback(
  slug: string,
  built: BookSummaryPage
): BookSummaryPage {
  const fallback = BOOK_SUMMARIES[slug];
  if (!fallback) return built;

  return {
    ...built,
    insights:
      built.insights.length > 0 ? built.insights : fallback.insights,
    actions: built.actions.length >= 2 ? built.actions : fallback.actions,
    recapBullets:
      built.recapBullets.length > 0
        ? built.recapBullets
        : fallback.recapBullets,
    quotes: built.quotes.length >= 2 ? built.quotes : fallback.quotes,
    featuredImageSrc: built.featuredImageSrc || fallback.featuredImageSrc,
    featuredImageAlt: built.featuredImageAlt || fallback.featuredImageAlt,
    related: built.related.length > 0 ? built.related : fallback.related,
    description:
      built.description.length > 40 ? built.description : fallback.description,
    progressExploredInitial:
      built.progressExploredInitial ?? fallback.progressExploredInitial,
    coverUrl: built.coverUrl ?? fallback.coverUrl,
  };
}

export function buildBookSummaryPageFromFirestore(
  slug: string,
  book: FirestoreBookDoc,
  summaries: SummaryRow[],
  allPublishedExplore: ExploreBook[]
): BookSummaryPage {
  const ordered = [...summaries].sort((a, b) => a.order - b.order);
  const firstPlain =
    ordered.length > 0
      ? markdownToPlain(ordered[0].contentMarkdown)
      : "";
  const description =
    firstPlain.length > 0
      ? clampText(firstPlain, 380)
      : `${book.title} — practical insights from ${book.author}.`;

  const categoryLabel =
    book.categories?.[0]
      ?.split(/[\s-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ")
      .toUpperCase() ?? "SUMMARY";

  const insights =
    ordered.length > 0 ? summariesToInsights(ordered) : [];
  const actions = collectActions(ordered, book.author);
  const recapBullets = buildRecap(ordered);
  let quotes = buildQuotes(ordered, book.author);

  const related = exploreListToRelated(allPublishedExplore, slug);

  if (quotes.length < 2 && ordered.length > 0) {
    const plain = markdownToPlain(ordered[0].contentMarkdown);
    if (plain.length > 24) {
      quotes = [
        {
          variant: "beige",
          quote: clampText(plain, 220),
          attribution: book.author,
        },
        {
          variant: "blue",
          quote:
            ordered[1]
              ? clampText(markdownToPlain(ordered[1].contentMarkdown), 220)
              : "Today is the best chance you have to put the work into the world.",
        },
      ];
    }
  }

  const built: BookSummaryPage = {
    slug,
    title: book.title,
    author: book.author,
    categoryLabel,
    readMinutes: book.readTime,
    description,
    progressExploredInitial: 12,
    insights,
    actions,
    recapBullets,
    quotes,
    featuredImageSrc: book.coverUrl,
    featuredImageAlt: `${book.title} cover`,
    related,
    coverUrl: book.coverUrl,
  };

  return mergeWithStaticFallback(slug, built);
}

/** Reuse explore mapping for related titles when catalog is empty. */
export function quickExploreFromBookDoc(
  slug: string,
  doc: FirestoreBookDoc,
  excerpt: string
): ExploreBook {
  return firestoreBookToExploreBook(slug, doc, excerpt);
}

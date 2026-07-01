import type { ExploreBook } from "@/data/exploreMock";

const PALETTES: Pick<
  ExploreBook,
  | "cardBgClass"
  | "categoryLabelClass"
  | "tag"
  | "tagPillClass"
>[] = [
  {
    cardBgClass: "bg-[#1e2d3d]",
    categoryLabelClass: "text-[#2D918B]",
    tag: "ACTIONABLE",
    tagPillClass: "bg-[#e6f7f5] text-[#2D918B]",
  },
  {
    cardBgClass: "bg-[#14532d]",
    categoryLabelClass: "text-[#ea580c]",
    tag: "BEGINNER FRIENDLY",
    tagPillClass: "bg-[#fff1e6] text-[#c2410c]",
  },
  {
    cardBgClass: "bg-black",
    categoryLabelClass: "text-[#94a3b8]",
    tag: "PRACTICAL",
    tagPillClass: "bg-[#ecfdf5] text-[#15803d]",
  },
  {
    cardBgClass: "bg-[#db2777]",
    categoryLabelClass: "text-[#60a5fa]",
    tag: "MINDSET",
    tagPillClass: "bg-[#eff6ff] text-[#2563eb]",
  },
  {
    cardBgClass: "bg-[#334155]",
    categoryLabelClass: "text-[#a78bfa]",
    tag: "FRAMEWORKS",
    tagPillClass: "bg-[#f5f3ff] text-[#7c3aed]",
  },
  {
    cardBgClass: "bg-[#78350f]",
    categoryLabelClass: "text-[#fbbf24]",
    tag: "BUILDING",
    tagPillClass: "bg-[#fffbeb] text-[#b45309]",
  },
  {
    cardBgClass: "bg-[#0f766e]",
    categoryLabelClass: "text-[#34d399]",
    tag: "HABITS",
    tagPillClass: "bg-[#ecfdf5] text-[#047857]",
  },
  {
    cardBgClass: "bg-[#422006]",
    categoryLabelClass: "text-[#fcd34d]",
    tag: "WEALTH",
    tagPillClass: "bg-[#fffbeb] text-[#a16207]",
  },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function topicTitle(s: string): string {
  return s
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function firestoreBookToExploreBook(
  slug: string,
  data: {
    title: string;
    author: string;
    coverUrl: string;
    categories: string[];
    readTime?: number;
    summaryCount?: number;
    createdAt?: { toDate?: () => Date };
  },
  description: string
): ExploreBook {
  const h = hashSlug(slug);
  const palette = PALETTES[h % PALETTES.length];
  const topics = (data.categories ?? []).map(topicTitle);
  const primaryCat = data.categories?.[0] ?? "general";
  const categoryLabel = topicTitle(primaryCat).toUpperCase();

  const created =
    data.createdAt?.toDate?.() instanceof Date
      ? data.createdAt!.toDate()!.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  return {
    id: slug,
    title: data.title,
    author: data.author,
    description: description || `Read this summary in ${data.readTime || 10} minutes.`,
    readMinutes: data.readTime || Math.ceil((data.summaryCount || 10) * 1.2),
    topics: topics.length > 0 ? topics : ["Productivity"],
    categoryLabel,
    categoryLabelClass: palette.categoryLabelClass,
    tag: palette.tag,
    tagPillClass: palette.tagPillClass,
    cardBgClass: palette.cardBgClass,
    coverSrc: data.coverUrl,
    trendingScore: 70 + (h % 31),
    publishedAt: created,
    practicalScore: 65 + (h % 36),
  };
}

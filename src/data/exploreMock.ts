export type ExploreBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  readMinutes: number;
  topics: string[];
  categoryLabel: string;
  categoryLabelClass: string;
  tag: string;
  tagPillClass: string;
  cardBgClass: string;
  coverSrc: string;
  trendingScore: number;
  publishedAt: string;
  practicalScore: number;
};

export type ExploreCollection = {
  id: string;
  title: string;
  subtitle: string;
  cardBgClass: string;
  watermark: "star" | "gear" | "bulb";
  previewBookIds: string[];
};

export const HERO_TOPIC_CHIPS = [
  "Productivity",
  "Business",
  "Psychology",
  "Health",
  "Finance",
  "Habits",
] as const;

export const SORT_FILTERS = [
  { id: "all" as const, label: "All Categories" },
  { id: "trending" as const, label: "Trending" },
  { id: "newest" as const, label: "Newest" },
  { id: "practical" as const, label: "Most Practical" },
];

/** Primary catalog — IDs referenced by collections & continue-learning mock */
export const EXPLORE_BOOKS: ExploreBook[] = [
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "Rules for focused success in a distracted world—actionable focus frameworks.",
    readMinutes: 10,
    topics: ["Productivity", "Business", "Habits"],
    categoryLabel: "FOCUS",
    categoryLabelClass: "text-[#2D918B]",
    tag: "ACTIONABLE",
    tagPillClass: "bg-[#e6f7f5] text-[#2D918B]",
    cardBgClass: "bg-[#1e2d3d]",
    coverSrc: "/images/blog/deep-work.png",
    trendingScore: 98,
    publishedAt: "2025-11-02",
    practicalScore: 95,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "Tiny changes, remarkable results—build systems that outperform motivation.",
    readMinutes: 12,
    topics: ["Habits", "Health", "Productivity"],
    categoryLabel: "SELF-GROWTH",
    categoryLabelClass: "text-[#ea580c]",
    tag: "BEGINNER FRIENDLY",
    tagPillClass: "bg-[#fff1e6] text-[#c2410c]",
    cardBgClass: "bg-[#14532d]",
    coverSrc: "/images/blog/morning-routine.png",
    trendingScore: 100,
    publishedAt: "2025-10-18",
    practicalScore: 99,
  },
  {
    id: "ego-enemy",
    title: "Ego is the Enemy",
    author: "Ryan Holiday",
    description:
      "Quiet the ego, sharpen judgment, and stay effective under pressure.",
    readMinutes: 9,
    topics: ["Psychology", "Business", "Productivity"],
    categoryLabel: "PSYCHOLOGY",
    categoryLabelClass: "text-[#94a3b8]",
    tag: "PRACTICAL",
    tagPillClass: "bg-[#ecfdf5] text-[#15803d]",
    cardBgClass: "bg-black",
    coverSrc: "/images/blog/meditation.png",
    trendingScore: 88,
    publishedAt: "2025-09-05",
    practicalScore: 91,
  },
  {
    id: "zero-one",
    title: "Zero to One",
    author: "Peter Thiel",
    description:
      "Contrarian startup lessons—building companies that create something new.",
    readMinutes: 11,
    topics: ["Business", "Finance", "Psychology"],
    categoryLabel: "STARTUP",
    categoryLabelClass: "text-[#60a5fa]",
    tag: "MINDSET",
    tagPillClass: "bg-[#eff6ff] text-[#2563eb]",
    cardBgClass: "bg-[#db2777]",
    coverSrc: "/images/blog/career-skills.png",
    trendingScore: 92,
    publishedAt: "2025-08-22",
    practicalScore: 88,
  },
  {
    id: "thinking-fast-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "How cognitive biases shape decisions—and how to think more clearly.",
    readMinutes: 14,
    topics: ["Psychology", "Finance", "Business"],
    categoryLabel: "DECISIONS",
    categoryLabelClass: "text-[#a78bfa]",
    tag: "FRAMEWORKS",
    tagPillClass: "bg-[#f5f3ff] text-[#7c3aed]",
    cardBgClass: "bg-[#334155]",
    coverSrc: "/images/blog/learning-skills.png",
    trendingScore: 85,
    publishedAt: "2025-07-11",
    practicalScore: 82,
  },
  {
    id: "lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    description:
      "Build-measure-learn loops to validate ideas without wasting resources.",
    readMinutes: 10,
    topics: ["Business", "Finance", "Productivity"],
    categoryLabel: "BUILDING",
    categoryLabelClass: "text-[#fbbf24]",
    tag: "ACTIONABLE",
    tagPillClass: "bg-[#fffbeb] text-[#b45309]",
    cardBgClass: "bg-[#78350f]",
    coverSrc: "/images/blog/career-skills.png",
    trendingScore: 90,
    publishedAt: "2025-06-01",
    practicalScore: 94,
  },
  {
    id: "power-of-habit",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    description:
      "Science-backed loops for cue, routine, reward—and lasting behavior change.",
    readMinutes: 11,
    topics: ["Habits", "Health", "Psychology"],
    categoryLabel: "BEHAVIOR",
    categoryLabelClass: "text-[#34d399]",
    tag: "PRACTICAL",
    tagPillClass: "bg-[#ecfdf5] text-[#047857]",
    cardBgClass: "bg-[#0f766e]",
    coverSrc: "/images/blog/morning-routine.png",
    trendingScore: 87,
    publishedAt: "2025-05-14",
    practicalScore: 93,
  },
  {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description:
      "Timeless lessons on wealth, luck, and making peace with risk.",
    readMinutes: 9,
    topics: ["Finance", "Psychology", "Health"],
    categoryLabel: "WEALTH",
    categoryLabelClass: "text-[#fcd34d]",
    tag: "BEGINNER FRIENDLY",
    tagPillClass: "bg-[#fffbeb] text-[#a16207]",
    cardBgClass: "bg-[#422006]",
    coverSrc: "/images/blog/learning-skills.png",
    trendingScore: 94,
    publishedAt: "2025-12-01",
    practicalScore: 89,
  },
];

export const EXPLORE_COLLECTIONS: ExploreCollection[] = [
  {
    id: "build-better-habits",
    title: "Build Better Habits",
    subtitle: "Systems that last longer than motivation.",
    cardBgClass: "bg-[#f7f2e9]",
    watermark: "star",
    previewBookIds: ["atomic-habits", "power-of-habit", "thinking-fast-slow"],
  },
  {
    id: "master-deep-work",
    title: "Master Deep Work",
    subtitle: "Rules for focused success in a distracted world.",
    cardBgClass: "bg-[#eaf7f2]",
    watermark: "gear",
    previewBookIds: ["deep-work", "ego-enemy", "thinking-fast-slow"],
  },
  {
    id: "think-like-founders",
    title: "Think Like Top Founders",
    subtitle: "Mental models from the world's best builders.",
    cardBgClass: "bg-[#eef5fc]",
    watermark: "bulb",
    previewBookIds: ["zero-one", "lean-startup", "psychology-money"],
  },
];

export function getBookById(id: string): ExploreBook | undefined {
  return EXPLORE_BOOKS.find((b) => b.id === id);
}

export function getCollectionById(id: string): ExploreCollection | undefined {
  return EXPLORE_COLLECTIONS.find((c) => c.id === id);
}

/** Mock continue-learning rows: only meaningful when `userId` is non-null (logged in). */
export function getMockContinueProgress(
  userId: string | null
): { bookId: string; percent: number }[] {
  if (!userId) return [];
  return [
    { bookId: "atomic-habits", percent: 65 },
    { bookId: "deep-work", percent: 20 },
  ].filter(({ percent }) => percent > 0 && percent < 100);
}

export function filterAndSortBooks(
  books: ExploreBook[],
  query: string,
  heroTopic: string | null,
  sortId: (typeof SORT_FILTERS)[number]["id"]
): ExploreBook[] {
  let list = [...books];
  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.topics.some((t) => t.toLowerCase().includes(q)) ||
        b.categoryLabel.toLowerCase().includes(q)
    );
  }
  if (heroTopic) {
    const ht = heroTopic.toLowerCase();
    list = list.filter((b) =>
      b.topics.some((t) => t.toLowerCase() === ht)
    );
  }
  switch (sortId) {
    case "trending":
      list.sort((a, b) => b.trendingScore - a.trendingScore);
      break;
    case "newest":
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      break;
    case "practical":
      list.sort((a, b) => b.practicalScore - a.practicalScore);
      break;
    default:
      break;
  }
  return list;
}

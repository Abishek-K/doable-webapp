export type BookInsight = {
  n: string;
  title: string;
  description: string;
  takeaway: string;
};

export type BookAction = {
  id: string;
  text: string;
};

export type BookQuote = {
  variant: "beige" | "blue";
  quote: string;
  attribution?: string;
};

export type RelatedBook = {
  id: string;
  title: string;
  author: string;
  coverSrc: string;
  cardBgClass: string;
};

export type BookSummaryPage = {
  slug: string;
  title: string;
  author: string;
  categoryLabel: string;
  readMinutes: number;
  description: string;
  progressExploredInitial: number;
  insights: BookInsight[];
  actions: BookAction[];
  recapBullets: { keyword: string; text: string }[];
  quotes: BookQuote[];
  featuredImageSrc: string;
  featuredImageAlt: string;
  related: RelatedBook[];
  /** Uploaded cover (Firestore). When missing, header uses themed placeholder art. */
  coverUrl?: string | null;
  seo?: {
    slug?: string;
    primaryKeyword?: string;
    keywords?: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    h1?: string;
    introParagraph?: string;
    faqContent?: { question: string; answer: string }[];
    structuredData?: string;
  };
};

export const BOOK_SUMMARIES: Record<string, BookSummaryPage> = {
  "die-empty": {
    slug: "die-empty",
    title: "Die Empty",
    author: "Todd Henry",
    categoryLabel: "PRODUCTIVITY",
    readMinutes: 10,
    description:
      "A field guide to leading a meaningful life by pouring your best work into the world every day—so you leave nothing important undone. Todd Henry shows how urgency, generosity, and consistency turn ideas into legacy.",
    progressExploredInitial: 25,
    insights: [
      {
        n: "01",
        title: "The Graveyard of Ideas",
        description:
          "The richest place on earth is the graveyard, filled with unwritten books and unstarted businesses.",
        takeaway: 'Record every "impossible" idea in a dedicated notebook today.',
      },
      {
        n: "02",
        title: "Empty Your Reservoir",
        description:
          'Don\'t save your best work for a "special occasion." Pour your best energy into today\'s tasks.',
        takeaway:
          'Identify one task you\'re "saving" and do it first thing tomorrow.',
      },
      {
        n: "03",
        title: "Curiosity vs. Comfort",
        description:
          "Stagnation happens when we choose the comfort of what we know over the curiosity of the unknown.",
        takeaway: 'Ask one "stupid" question in your next team meeting.',
      },
    ],
    actions: [
      {
        id: "a1",
        text: "Audit your current project list and cut one 'maybe' task.",
      },
      {
        id: "a2",
        text: "Set a 30-minute 'Deep Work' focus session for tomorrow morning.",
      },
      {
        id: "a3",
        text: "Share your most ambitious idea with a trusted mentor.",
      },
    ],
    recapBullets: [
      { keyword: "Urgency", text: "Live as if your time is limited, because it is." },
      {
        keyword: "Generosity",
        text: "The best way to empty yourself is to serve others with your skills.",
      },
      {
        keyword: "Consistency",
        text: "Small, daily contributions outweigh massive, sporadic bursts.",
      },
    ],
    quotes: [
      {
        variant: "beige",
        quote:
          "Do not let the graveyard win. Empty your reservoir of greatness every day.",
        attribution: "Todd Henry",
      },
      {
        variant: "blue",
        quote:
          "Urgency is not about hurry; it's about focus. It's about knowing that today matters.",
      },
    ],
    featuredImageSrc: "/images/blog/morning-routine.png",
    featuredImageAlt: "Open notebook with pen and coffee on a wooden desk",
    related: [
      {
        id: "r1",
        title: "Atomic Habits",
        author: "James Clear",
        coverSrc: "/images/blog/morning-routine.png",
        cardBgClass: "bg-[#1D4D4F]",
      },
      {
        id: "r2",
        title: "The War of Art",
        author: "Steven Pressfield",
        coverSrc: "/images/blog/career-skills.png",
        cardBgClass: "bg-gradient-to-br from-[#f5f5f4] to-[#e7e5e4]",
      },
      {
        id: "r3",
        title: "Deep Work",
        author: "Cal Newport",
        coverSrc: "/images/blog/deep-work.png",
        cardBgClass: "bg-[#2D2D2D]",
      },
    ],
  },
};

export function getBookSummaryBySlug(slug: string): BookSummaryPage | undefined {
  return BOOK_SUMMARIES[slug];
}

export function getBookSummarySlugs(): string[] {
  return Object.keys(BOOK_SUMMARIES);
}

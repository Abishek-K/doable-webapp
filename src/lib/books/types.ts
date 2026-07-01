export type FirestoreBookDoc = {
  title: string;
  author: string;
  coverUrl: string;
  categories: string[];
  readTime: number;
  published: boolean;
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
  summaryCount: number;
  audioAvailable: boolean;
  createdAt: { toDate: () => Date };
  updatedAt: { toDate: () => Date };
  summaryHtmlUrl?: string;
  documentUrl?: string;
};

export type FirestoreSummaryDoc = {
  title: string;
  order: number;
  contentMarkdown: string;
  audioUrl?: string;
  readTime?: number;
};

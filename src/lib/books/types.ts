export type FirestoreBookDoc = {
  title: string;
  author: string;
  coverUrl: string;
  categories: string[];
  readTime: number;
  published: boolean;
  seo?: { slug?: string };
  summaryCount: number;
  audioAvailable: boolean;
  createdAt: { toDate: () => Date };
  updatedAt: { toDate: () => Date };
};

export type FirestoreSummaryDoc = {
  title: string;
  order: number;
  contentMarkdown: string;
  audioUrl?: string;
  readTime?: number;
};

import { adminDb } from "@/lib/firebaseAdmin";
import { blogPosts, BlogPost } from "@/data/blogPosts";

function parseTimestamp(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  return new Date().toISOString();
}

function estimateReadingTime(markdown: string) {
  const words = markdown
    .replace(/[#_*`>\-\[\]\(\)!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

function normalizeBlogPost(id: string, data: Record<string, unknown>): BlogPost {
  const tagsValue = data.tags;
  const tags = Array.isArray(tagsValue)
    ? tagsValue.filter((tag): tag is string => typeof tag === "string")
    : [];

  const title = String(data.title ?? "");
  const excerpt = String(data.excerpt ?? "");
  const contentMarkdown = String(data.contentMarkdown ?? "");
  const seoData = data.seo as Record<string, unknown> | undefined;
  const seoTitle = seoData?.metaTitle ? String(seoData.metaTitle) : `${title} | Doable Blog`;
  const seoDescription = seoData?.metaDescription
    ? String(seoData.metaDescription)
    : excerpt;

  return {
    id,
    title,
    slug: String(data.slug ?? id),
    excerpt,
    contentMarkdown,
    coverUrl: String(data.coverUrl ?? "/images/blog/deep-work.png"),
    author: String(data.author ?? "Doable Team"),
    category: String(data.category ?? "General"),
    tags,
    readingTime:
      typeof data.readingTime === "number"
        ? data.readingTime
        : estimateReadingTime(contentMarkdown || excerpt),
    status: String(data.status ?? "draft") === "published" ? "published" : "draft",
    publishedAt: parseTimestamp(data.publishedAt ?? data.createdAt ?? new Date().toISOString()),
    updatedAt: parseTimestamp(data.updatedAt ?? data.publishedAt ?? new Date().toISOString()),
    seo: {
      metaTitle: seoTitle,
      metaDescription: seoDescription,
    },
  };
}

export async function getPublishedBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const query = adminDb()
      .collection("blogs")
      .where("status", "==", "published")
      .orderBy("publishedAt", "desc");

    const snapshot = await query.get();
    return snapshot.docs
      .map((doc) => normalizeBlogPost(doc.id, doc.data()))
      .filter((post) =>
        category
          ? post.category.toLowerCase() === category.toLowerCase()
          : true
      );
  } catch (error) {
    console.error("[lib/blogs] failed to fetch published blog posts", error);
    return blogPosts.filter((post) => post.status === "published").filter((post) =>
      category
        ? post.category.toLowerCase() === category.toLowerCase()
        : true
    );
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const doc = await adminDb().collection("blogs").doc(slug).get();
    if (!doc.exists) {
      return blogPosts.find((post) => post.slug === slug);
    }
    return normalizeBlogPost(doc.id, doc.data() ?? {});
  } catch (error) {
    console.error("[lib/blogs] failed to fetch blog post by slug", error);
    return blogPosts.find((post) => post.slug === slug);
  }
}

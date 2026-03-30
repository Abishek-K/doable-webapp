import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import MarketingFooter from "@/components/MarketingFooter";
import Navigation from "@/components/Navigation";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blogs";

export const dynamic = "force-dynamic";

/* ── Markdown → HTML renderer ─────────────────────────── */

function renderMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const blocks = normalized
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const output: string[] = [];

  for (const block of blocks) {
    // Headings
    if (/^###\s/.test(block)) {
      output.push(block.replace(/^###\s+(.*)/, "<h3>$1</h3>"));
      continue;
    }
    if (/^##\s/.test(block)) {
      output.push(block.replace(/^##\s+(.*)/, "<h2>$1</h2>"));
      continue;
    }

    // Blockquote
    if (/^>\s/.test(block)) {
      const quoteContent = block
        .split("\n")
        .map((line) => line.replace(/^>\s?/, ""))
        .join("<br />");
      output.push(`<blockquote>${applyInline(quoteContent)}</blockquote>`);
      continue;
    }

    // Unordered list
    if (/^-\s/m.test(block)) {
      const items = block
        .split("\n")
        .filter((line) => /^-\s/.test(line))
        .map((line) => `<li>${applyInline(line.replace(/^-\s+/, ""))}</li>`)
        .join("");
      output.push(`<ul>${items}</ul>`);
      continue;
    }

    // Default → paragraph
    const converted = applyInline(block.replace(/\n/g, "<br />"));
    output.push(`<p>${converted}</p>`);
  }

  return output.join("");
}

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

/* ── Page types ───────────────────────────────────────── */

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

/* ── SEO Metadata ─────────────────────────────────────── */

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found | Doable",
      description: "The post you are looking for could not be found.",
    };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: "article",
      authors: [post.author],
      images: [post.coverUrl],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

/* ── Page Component ───────────────────────────────────── */

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublishedBlogPosts(post.category))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription,
    image: post.coverUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "Doable",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link
              href="/blogs"
              className="transition-colors hover:text-slate-700"
            >
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-slate-600">{post.title}</span>
          </nav>

          {/* Header */}
          <header>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {post.category}
              </span>
              <span className="text-sm text-slate-400">
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {post.author}
                </p>
                <time
                  dateTime={post.publishedAt}
                  className="text-sm text-slate-400"
                >
                  {formattedDate}
                </time>
              </div>
            </div>
          </header>

          {/* Cover image */}
          <div className="mt-8 overflow-hidden rounded-2xl">
            <img
              src={post.coverUrl}
              alt={post.title}
              className="aspect-[2/1] w-full object-cover"
            />
          </div>

          {/* Article body */}
          <div className="blog-prose prose prose-slate prose-lg mt-10 max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.contentMarkdown),
              }}
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-20 max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Related stories
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  More to read after this
                </h2>
              </div>
              <Link
                href="/blogs"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              >
                Back to all posts
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <MarketingFooter />
    </div>
  );
}

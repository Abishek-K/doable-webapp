import Link from "next/link";
import { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import MarketingFooter from "@/components/MarketingFooter";
import Navigation from "@/components/Navigation";
import { BLOG_CATEGORIES } from "@/data/blogPosts";
import { getPublishedBlogPosts } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog — Doable",
    description:
      "Actionable insights, reading strategies, habit-building tips, and productivity stories from the Doable team. Read, learn, and do more.",
    openGraph: {
      title: "Blog — Doable",
      description:
        "Actionable insights, reading strategies, habit-building tips, and productivity stories from the Doable team.",
      url: "https://www.doable.app/blogs",
      type: "website",
    },
    twitter: {
      title: "Blog — Doable",
      description:
        "Actionable insights, reading strategies, and productivity stories from the Doable team.",
    },
  };
}

interface BlogsPageProps {
  searchParams?: { category?: string };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const activeCategory = searchParams?.category?.trim() ?? "";
  const posts = await getPublishedBlogPosts(activeCategory || undefined);

  const heroPost = posts[0] ?? null;
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pb-20">
        {/* ── Hero Section ─────────────────────────────────── */}
        <section className="bg-[#f7f5f2] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header row */}
            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
              {/* Left — hero copy */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1a73e8]">
                  The Doable Blog
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                  Insightful reads for
                  <br />
                  focused minds.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5a5a]">
                  Strategies, stories and frameworks to help you master
                  your craft with half the frustration.
                </p>
              </div>

              {/* Right — category filter card */}
              <div className="rounded-2xl border border-[#e4e7ea] bg-white p-7 shadow-sm">
                <p className="text-sm font-semibold text-[#1a1a1a]">
                  Explore topics that matter to you
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/blogs"
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      !activeCategory
                        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                        : "border-[#e4e7ea] bg-white text-[#5a5a5a] hover:border-[#1a1a1a]"
                    }`}
                  >
                    All
                  </Link>
                  {BLOG_CATEGORIES.map((category) => {
                    const isActive =
                      category.toLowerCase() === activeCategory.toLowerCase();
                    return (
                      <Link
                        key={category}
                        href={`/blogs?category=${encodeURIComponent(category)}`}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          isActive
                            ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                            : "border-[#e4e7ea] bg-white text-[#5a5a5a] hover:border-[#1a1a1a]"
                        }`}
                      >
                        {category}
                      </Link>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  {posts.length} published post{posts.length === 1 ? "" : "s"}
                  {activeCategory ? ` in "${activeCategory}"` : ""}
                </p>
              </div>
            </div>

            {/* Hero featured article */}
            {heroPost && (
              <Link
                href={`/blogs/${heroPost.slug}`}
                className="group mt-10 block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="grid lg:grid-cols-[1.2fr_1fr]">
                  <div className="relative overflow-hidden">
                    <img
                      src={heroPost.coverUrl}
                      alt={heroPost.title}
                      className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:min-h-[420px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-semibold text-[#1a73e8]">
                        {heroPost.category}
                      </span>
                      <span className="text-xs text-[#5a5a5a]">
                        {new Date(heroPost.publishedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold leading-snug text-[#1a1a1a] sm:text-3xl lg:text-4xl">
                      {heroPost.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-base leading-relaxed text-[#5a5a5a]">
                      {heroPost.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2b2b2b] transition-colors group-hover:text-[#1a73e8]">
                      Read Story
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* ── Recent Articles Grid ──────────────────────────── */}
        <section className="px-4 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {recentPosts.length > 0 ? (
              <>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-[#1a1a1a] sm:text-3xl">
                      Recent Articles
                    </h2>
                    <p className="mt-2 text-sm text-[#5a5a5a]">
                      The latest from the Doable blog
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {recentPosts.map((post, idx) => (
                    <div key={post.slug}>
                      {idx === 3 ? (
                        /* Insert CTA card at position 4 (after 3 recent cards) */
                        <>
                          <BlogCard post={post} />
                        </>
                      ) : (
                        <BlogCard post={post} />
                      )}
                    </div>
                  ))}

                  {/* CTA card — show only when there are enough posts */}
                  {recentPosts.length >= 3 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#f4c400] bg-[#fff8d6] p-8 text-center">
                      <h3 className="text-xl font-semibold text-[#1a1a1a]">
                        Want personalized learning paths?
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#5a5a5a]">
                        Get curated book summaries and action plans tailored to
                        your goals.
                      </p>
                      <Link
                        href="/pricing"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Start Your Journey
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : !heroPost ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-900">
                  No posts found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try another category or check back soon.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

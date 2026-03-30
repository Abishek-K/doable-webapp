import Link from "next/link";
import { BlogPost } from "@/data/blogPosts";

export default function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blogs/${post.slug}`} className="relative block overflow-hidden">
        <img
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.coverUrl}
          alt={post.title}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{formattedDate}</span>
          </div>

          <Link href={`/blogs/${post.slug}`} className="mt-3 block">
            <h3 className="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {post.excerpt}
            </p>
          </Link>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-400">
            {post.readingTime} min read
          </span>
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
          >
            Read Story
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Clock } from "lucide-react";
import DieEmptyCoverArt from "@/components/book-summary/DieEmptyCoverArt";
import type { BookSummaryPage } from "@/data/bookSummaryMock";

type BookSummaryHeaderProps = {
  book: BookSummaryPage;
};

export default function BookSummaryHeader({ book }: BookSummaryHeaderProps) {
  return (
    <section className="px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="rounded-[48px] bg-[#F4EEE4] p-8 shadow-[0_20px_48px_rgba(90,70,50,0.12)] sm:p-10 lg:p-12">
          {book.coverUrl ? (
            <div className="relative flex h-full min-h-[320px] w-full items-center justify-center sm:min-h-[380px] lg:min-h-[440px]">
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 440px"
                priority
              />
            </div>
          ) : (
            <DieEmptyCoverArt />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#C7F2E9] px-3 py-1 text-xs font-bold tracking-wide text-[#1A534E]">
              {book.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#888888]">
              <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
              {book.readMinutes} min read
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-xl font-medium text-[#AF5B1F] sm:text-2xl">
            by {book.author}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#666666] sm:text-lg">
            {book.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#key-insights"
              className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#AF5B1F] to-[#D98345] px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(175,91,31,0.35)] transition hover:brightness-105"
            >
              Start Learning
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-4 w-4 fill-white"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Bookmark summary"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EEE4] text-[#AF5B1F] shadow-sm ring-1 ring-black/[0.04] transition hover:bg-[#ebe3d5]"
            >
              <Bookmark className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import type { ExploreBook } from "@/data/exploreMock";

type ContinueItem = {
  book: ExploreBook;
  percent: number;
};

type ContinueLearningSectionProps = {
  items: ContinueItem[];
};

export default function ContinueLearningSection({
  items,
}: ContinueLearningSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="px-4 pb-12 sm:px-6 lg:px-8"
      aria-labelledby="continue-learning-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="continue-learning-heading"
          className="text-left text-xl font-bold tracking-tight text-black sm:text-2xl"
        >
          Pick up where you left off
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          {items.map(({ book, percent }) => (
            <article
              key={book.id}
              className="flex gap-5 rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04]"
            >
              <div className="relative h-[120px] w-20 shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6] shadow-md">
                <Image
                  src={book.coverSrc}
                  alt={book.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-[#111827]">
                      {book.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#6b7280]">{book.author}</p>
                  </div>
                  <span className="shrink-0 text-base font-semibold tabular-nums text-[#2D918B]">
                    {percent}%
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#d8e8e7]">
                    <div
                      className="h-full rounded-full bg-[#2D918B] transition-[width] duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

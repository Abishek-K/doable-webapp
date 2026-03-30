"use client";

import { Filter } from "lucide-react";
import ExploreBookGridCard from "@/components/explore/ExploreBookGridCard";
import ExploreCategoryChip from "@/components/explore/ExploreCategoryChip";
import type { ExploreBook } from "@/data/exploreMock";
import { SORT_FILTERS } from "@/data/exploreMock";

type SortId = (typeof SORT_FILTERS)[number]["id"];

type ExploreBooksSectionProps = {
  books: ExploreBook[];
  sortId: SortId;
  onSortChange: (id: SortId) => void;
  visibleCount: number;
  onLoadMore: () => void;
};

export default function ExploreBooksSection({
  books,
  sortId,
  onSortChange,
  visibleCount,
  onLoadMore,
}: ExploreBooksSectionProps) {
  const displayed = books.slice(0, visibleCount);
  const hasMore = books.length > visibleCount;

  return (
    <section
      id="book-grid"
      className="scroll-mt-[88px] px-4 pb-20 sm:px-6 lg:px-8"
      aria-labelledby="books-grid-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="books-grid-heading" className="sr-only">
          Books
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-3"
            role="tablist"
            aria-label="Sort and filter books"
          >
            {SORT_FILTERS.map((f) => (
              <ExploreCategoryChip
                key={f.id}
                label={f.label}
                variant={sortId === f.id ? "sortActive" : "sortInactive"}
                onClick={() => onSortChange(f.id)}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex items-center gap-2 self-start text-sm font-semibold text-[#4b5563] transition hover:text-[#111827] sm:self-auto"
            onClick={() =>
              document.getElementById("explore-search-focus")?.focus()
            }
          >
            <Filter className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            Filter Results
          </button>
        </div>

        {displayed.length === 0 ? (
          <p className="mt-16 text-center text-[#6b7280]">
            No books match your search. Try another title, author, or topic.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {displayed.map((book) => (
              <ExploreBookGridCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={onLoadMore}
              className="rounded-full bg-[#ebe8e2] px-12 py-3.5 text-base font-semibold text-[#6b7280] transition hover:bg-[#e0ddd6] hover:text-[#4b5563]"
            >
              Load More Books
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

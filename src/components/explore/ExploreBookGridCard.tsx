"use client";

import Image from "next/image";
import Link from "next/link";
import type { ExploreBook } from "@/data/exploreMock";

type ExploreBookGridCardProps = {
  book: ExploreBook;
};

export default function ExploreBookGridCard({ book }: ExploreBookGridCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34E0C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F8F3]"
    >
    <article className="flex flex-col">
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.12)]`}
      >
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[#e8e8e8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#374151]">
          {book.readMinutes} MIN
        </span>
        <Image
          src={book.coverSrc}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 40vw, 160px"
          className="object-cover"
        />
      </div>
      <div className="mt-5 px-0.5">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.14em] ${book.categoryLabelClass}`}
        >
          {book.categoryLabel}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight text-[#374151]">
          {book.title}
        </h3>
        <p className="mt-1 text-[15px] font-normal text-[#6b7280]">
          {book.author}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#9ca3af]">
          {book.description}
        </p>
        <p
          className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${book.tagPillClass}`}
        >
          {book.tag}
        </p>
      </div>
    </article>
    </Link>
  );
}

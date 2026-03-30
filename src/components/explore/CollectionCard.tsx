"use client";

import Image from "next/image";
import Link from "next/link";
import { Cog, Lightbulb, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExploreBook, ExploreCollection } from "@/data/exploreMock";
import { getBookById } from "@/data/exploreMock";

type CollectionCardProps = {
  collection: ExploreCollection;
};

function Watermark({ type }: { type: ExploreCollection["watermark"] }) {
  const cls =
    "pointer-events-none absolute bottom-5 right-5 h-16 w-16 text-[#1a1a1a]/[0.07]";
  if (type === "star") {
    return <Star className={cls} strokeWidth={1} fill="currentColor" />;
  }
  if (type === "gear") {
    return <Cog className={cls} strokeWidth={1.2} />;
  }
  return <Lightbulb className={cls} strokeWidth={1.2} />;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const previews: ExploreBook[] = collection.previewBookIds
    .map((id) => getBookById(id))
    .filter((b): b is ExploreBook => Boolean(b));

  return (
    <Link
      href={`/collections/${collection.id}`}
      className={cn(
        "group relative flex min-h-[200px] flex-col overflow-hidden rounded-[24px] p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)] sm:min-h-[220px] sm:p-8",
        collection.cardBgClass
      )}
    >
      <Watermark type={collection.watermark} />
      <h3 className="text-lg font-bold text-[#111827] sm:text-xl">
        {collection.title}
      </h3>
      <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-[#6b7280] sm:text-[15px]">
        {collection.subtitle}
      </p>
      <div className="mt-auto flex items-end justify-between pt-8">
        <div className="flex pl-1">
          {previews.map((book, i) => (
            <div
              key={book.id}
              className="relative h-11 w-8 overflow-hidden rounded-md bg-white shadow-md ring-2 ring-white"
              style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }}
            >
              <Image
                src={book.coverSrc}
                alt=""
                width={32}
                height={44}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

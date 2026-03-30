"use client";

import Link from "next/link";
import CollectionCard from "@/components/explore/CollectionCard";
import { EXPLORE_COLLECTIONS } from "@/data/exploreMock";

export default function CuratedCollectionsSection() {
  return (
    <section
      id="collections"
      className="px-4 pb-10 sm:px-6 lg:px-8"
      aria-labelledby="curated-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="curated-heading"
            className="text-xl font-bold tracking-tight text-black sm:text-2xl"
          >
            Curated for You
          </h2>
          <Link
            href="/explore#collections"
            className="text-sm font-semibold text-[#A34E0C] transition hover:text-[#8c430a] sm:pb-0.5"
          >
            View all collections →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
          {EXPLORE_COLLECTIONS.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

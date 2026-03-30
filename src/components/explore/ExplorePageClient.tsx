"use client";

import { useAuth } from "@/hooks/useAuth";
import ContinueLearningSection from "@/components/explore/ContinueLearningSection";
import CuratedCollectionsSection from "@/components/explore/CuratedCollectionsSection";
import ExploreBooksSection from "@/components/explore/ExploreBooksSection";
import ExploreHero from "@/components/explore/ExploreHero";
import {
  filterAndSortBooks,
  getMockContinueProgress,
  SORT_FILTERS,
} from "@/data/exploreMock";
import type { ExploreBook } from "@/data/exploreMock";
import { useEffect, useMemo, useState } from "react";

type SortId = (typeof SORT_FILTERS)[number]["id"];

type ExplorePageClientProps = {
  initialBooks: ExploreBook[];
};

export default function ExplorePageClient({
  initialBooks,
}: ExplorePageClientProps) {
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [heroTopic, setHeroTopic] = useState<string | null>(null);
  const [sortId, setSortId] = useState<SortId>("all");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setVisibleCount(4);
  }, [search, heroTopic, sortId]);

  const filteredBooks = useMemo(
    () => filterAndSortBooks(initialBooks, search, heroTopic, sortId),
    [initialBooks, search, heroTopic, sortId]
  );

  const continueItems = useMemo(() => {
    if (loading) return [];
    const uid = user?.uid ?? null;
    if (!uid) return [];
    return getMockContinueProgress(uid)
      .map((row) => {
        const book = initialBooks.find((b) => b.id === row.bookId);
        if (!book) return null;
        return { book, percent: row.percent };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [user, loading, initialBooks]);


  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <ExploreHero
        search={search}
        onSearchChange={setSearch}
        heroTopic={heroTopic}
        onHeroTopicChange={setHeroTopic}
      />
      <ContinueLearningSection items={continueItems} />
      <CuratedCollectionsSection />
      <ExploreBooksSection
        books={filteredBooks}
        sortId={sortId}
        onSortChange={setSortId}
        visibleCount={visibleCount}
        onLoadMore={() => setVisibleCount((c) => c + 4)}
      />
    </main>
  );
}

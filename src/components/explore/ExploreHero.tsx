"use client";

import ExploreCategoryChip from "@/components/explore/ExploreCategoryChip";
import ExploreSearchBar from "@/components/explore/ExploreSearchBar";
import { HERO_TOPIC_CHIPS } from "@/data/exploreMock";
import { cn } from "@/lib/utils";

type ExploreHeroProps = {
  search: string;
  onSearchChange: (v: string) => void;
  heroTopic: string | null;
  onHeroTopicChange: (topic: string | null) => void;
};

export default function ExploreHero({
  search,
  onSearchChange,
  heroTopic,
  onHeroTopicChange,
}: ExploreHeroProps) {
  return (
    <section className="px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
          Learn the best ideas from top books —{" "}
          <span className="font-bold italic text-[#945200]">in 10 minutes</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
          Focus on action, not just reading. Gain real-world insights from
          non-fiction books, perfectly summarized for your busy schedule.
        </p>
        <div className="mt-10">
          <ExploreSearchBar value={search} onChange={onSearchChange} />
        </div>
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          role="group"
          aria-label="Browse by topic"
        >
          {HERO_TOPIC_CHIPS.map((topic) => {
            const selected = heroTopic === topic;
            return (
              <ExploreCategoryChip
                key={topic}
                label={topic}
                variant={selected ? "sortActive" : "hero"}
                onClick={() =>
                  onHeroTopicChange(selected ? null : topic)
                }
                className={cn(!selected && "font-semibold")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

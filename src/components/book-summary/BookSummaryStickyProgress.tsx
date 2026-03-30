"use client";

import { useEffect, useState } from "react";

const NAV_STACK_HEIGHT_PX = 116;

type BookSummaryStickyProgressProps = {
  /** Blends scroll position with a baseline (e.g. saved reading progress). */
  baselinePercent?: number;
};

export default function BookSummaryStickyProgress({
  baselinePercent = 0,
}: BookSummaryStickyProgressProps) {
  const [percent, setPercent] = useState(baselinePercent);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scroll = el.scrollTop;
      const range = el.scrollHeight - el.clientHeight;
      const scrollPct =
        range <= 0 ? 0 : Math.min(100, Math.max(0, (scroll / range) * 100));
      setPercent(
        Math.min(
          100,
          Math.round(Math.max(baselinePercent, scrollPct))
        )
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [baselinePercent]);

  return (
    <div
      className="sticky z-40 border-b border-[#e8e4dc]/80 bg-[#FCFBF7]/95 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8"
      style={{ top: NAV_STACK_HEIGHT_PX }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#D1EAE5]">
          <div
            className="h-full rounded-full bg-[#1A534E] transition-[width] duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="shrink-0 text-xs font-bold uppercase tracking-wide text-[#6B6B6B]">
          {percent}% explored
        </p>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import type { BookAction } from "@/data/bookSummaryMock";

type ApplyTodaySectionProps = {
  actions: BookAction[];
};

export default function ApplyTodaySection({ actions }: ApplyTodaySectionProps) {
  const [done, setDone] = useState<Set<string>>(() => new Set());

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <section className="bg-[#FCFAF7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 rounded-[36px] bg-[#f0efeb] p-8 ring-1 ring-black/[0.04] sm:p-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14 lg:p-14">
          <div className="max-w-md lg:shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
              Apply This Today
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#555555]">
              Three actionable steps to turn these insights into habits
              immediately.
            </p>
          </div>

          <ul className="flex w-full flex-col gap-4 lg:max-w-[52%]" role="list">
            {actions.map((item) => {
              const checked = done.has(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-start gap-4 rounded-[28px] bg-white px-5 py-4 text-left shadow-[0_4px_20px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.05] transition hover:shadow-[0_6px_24px_rgba(15,23,42,0.1)]"
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#B87333]"
                      aria-hidden
                    >
                      {checked && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#B87333]" />
                      )}
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-[#1A1A1A]">
                      {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";

const SLIDE_DURATION_MS = 320;

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function animateScrollBy(container: HTMLElement, distance: number) {
  const start = container.scrollLeft;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const target = Math.max(0, Math.min(maxScrollLeft, start + distance));
  const delta = target - start;

  if (delta === 0) return;

  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / SLIDE_DURATION_MS);
    const eased = easeOutCubic(progress);

    container.scrollLeft = start + delta * eased;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

function getCardsPerView() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 768px)").matches) return 2;
  return 1;
}

export default function ReviewCarouselSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const visibleReviews = reviews.slice(0, 10);

  const handleScroll = (direction: "next" | "prev") => {
    const container = scrollRef.current;
    if (!container) return;
    if (direction === "prev" && !canScrollPrev) return;
    if (direction === "next" && !canScrollNext) return;

    const firstCard = container.querySelector<HTMLElement>("[data-review-card]");
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth;
    const cardGap = 24;
    const cardsPerView = getCardsPerView();
    const offset = (cardWidth + cardGap) * cardsPerView;
    const signedOffset = direction === "next" ? offset : -offset;

    animateScrollBy(container, signedOffset);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const epsilon = 2;

      setCanScrollPrev(container.scrollLeft > epsilon);
      setCanScrollNext(container.scrollLeft < maxScrollLeft - epsilon);
    };

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [visibleReviews.length]);

  return (
    <section className="bg-white px-6 py-[64px] font-sans lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleReviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              data-review-card
              className="flex min-h-[260px] w-full shrink-0 flex-col justify-between rounded-[26px] bg-[#ebe7e4] p-8 sm:p-9 lg:min-h-[290px] lg:basis-[calc((100%-48px)/3)] md:basis-[calc((100%-24px)/2)] basis-full"
            >
              <p className="text-[20px] leading-[1.6] tracking-[-0.01em] text-[#2e2e2e] sm:text-[21px]">
                {"\u201C"}
                {review.text}
                {"\u201D"}
              </p>
              <p className="mt-10 text-[14px] leading-[1.45] text-[#6b6b6b] sm:text-[15px]">
                {review.name}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Scroll to previous reviews"
            disabled={!canScrollPrev}
            onClick={() => handleScroll("prev")}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
              canScrollPrev
                ? "border-slate-200 bg-white text-slate-700 shadow-[0_5px_14px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:text-slate-900"
                : "cursor-not-allowed border-slate-200/80 bg-white/80 text-slate-400 shadow-none"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll to next reviews"
            disabled={!canScrollNext}
            onClick={() => handleScroll("next")}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
              canScrollNext
                ? "border-slate-200 bg-white text-slate-700 shadow-[0_5px_14px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:text-slate-900"
                : "cursor-not-allowed border-slate-200/80 bg-white/80 text-slate-400 shadow-none"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

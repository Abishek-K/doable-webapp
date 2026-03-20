"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const blockColors = ["#bfd4ea", "#d8d1e8", "#f2d8d2"] as const;
const blockTabs = [
  "Bite-sized bestsellers",
  "Expert-led programs",
  "Learning Spaces",
] as const;

export default function PlainBlocksCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < blockColors.length - 1;

  const getTrackPaddingLeft = (track: HTMLDivElement) => {
    const styles = window.getComputedStyle(track);
    const value = Number.parseFloat(styles.paddingLeft);
    return Number.isFinite(value) ? value : 0;
  };

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = cardRefs.current.filter(
      (card): card is HTMLElement => card !== null
    );
    if (!cards.length) return;

    const leftInset = getTrackPaddingLeft(track);
    const currentLeft = track.scrollLeft + leftInset;

    let nearestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - currentLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      const cards = cardRefs.current;
      if (!track || !cards.length) return;

      const clampedIndex = Math.max(0, Math.min(cards.length - 1, index));
      const card = cards[clampedIndex];
      if (!card) return;

      const leftInset = getTrackPaddingLeft(track);
      const targetLeft = Math.max(0, card.offsetLeft - leftInset);

      setActiveIndex(clampedIndex);
      track.scrollTo({ left: targetLeft, behavior });
    },
    []
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      updateActiveFromScroll();
    };

    scrollToIndex(0, "auto");
    updateActiveFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [scrollToIndex, updateActiveFromScroll]);

  const scrollByCard = (direction: "prev" | "next") => {
    if (direction === "prev" && !canScrollPrev) return;
    if (direction === "next" && !canScrollNext) return;

    const nextIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;
    scrollToIndex(nextIndex);
  };

  return (
    <section className="bg-white py-10 font-sans">
      <div className="w-full">
        <div className="px-4 pb-8 text-center sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#2f2f32] sm:text-5xl lg:text-6xl">
            The mental health app for every moment
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {blockTabs.map((label, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={`inline-flex min-h-[54px] items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 sm:px-8 sm:text-[1.05rem] ${
                    isActive
                      ? "bg-[#2f2f32] text-white"
                      : "bg-[#ece8e6] text-[#1f2937] hover:bg-[#e5dfdc]"
                  }`}
                  aria-label={`Show ${label}`}
                  aria-pressed={isActive}
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="mr-3 h-2.5 w-2.5 rounded-full bg-white"
                    />
                  ) : null}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pl-4 pr-4 scroll-pl-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:pl-6 sm:pr-6 sm:scroll-pl-6 lg:pl-8 lg:pr-8 lg:scroll-pl-8 [&::-webkit-scrollbar]:hidden"
        >
          {blockColors.map((color, index) => (
            <article
              key={color}
              data-block-card
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="h-[280px] w-[calc(100vw-140px)] shrink-0 snap-start rounded-[40px] sm:h-[340px] sm:w-[calc(100vw-210px)] lg:h-[430px] lg:w-[calc(100vw-380px)]"
              style={{ backgroundColor: color }}
              aria-label={`Carousel block ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
          <div aria-hidden="true" />

          <div className="flex items-center justify-center gap-3">
            {blockColors.map((_, index) => (
              <span
                key={`indicator-${index}`}
                aria-hidden="true"
                className={`h-1 rounded-full transition-all duration-200 ${
                  activeIndex === index
                    ? "w-16 bg-[#4a585f]"
                    : "w-12 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              aria-label="Scroll to previous block"
              disabled={!canScrollPrev}
              onClick={() => scrollByCard("prev")}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                canScrollPrev
                  ? "bg-white text-slate-700 hover:-translate-y-0.5 hover:text-slate-900"
                  : "cursor-not-allowed bg-white text-slate-400"
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
              aria-label="Scroll to next block"
              disabled={!canScrollNext}
              onClick={() => scrollByCard("next")}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                canScrollNext
                  ? "bg-white text-slate-700 hover:-translate-y-0.5 hover:text-slate-900"
                  : "cursor-not-allowed bg-white text-slate-400"
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
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const carouselCards = [
  {
    color: "#fece00",
    textColor: "text-[#2f2f32]",
    tabLabel: "15-Minute Summaries",
    headline: "Get the best ideas from world-class books in minutes",
    description:
      "Discover powerful lessons from productivity, business, psychology, health, and personal growth books without spending hours reading.",
    buttonText: "Explore library",
    media: {
      src: "/images/doable-book-summaries-hero.webp",
      alt: "Doable book summaries hero graphic",
    },
  },
  {
    color: "#0061ee",
    textColor: "text-white",
    tabLabel: "Actionable Insights",
    headline: "Turn knowledge into action",
    description:
      "Every summary is packed with practical takeaways, frameworks, and next steps you can apply immediately in work and life.",
    buttonText: "See how it works",
    media: {
      src: "/images/doable-actionable-insights.webp",
      alt: "Doable actionable insights hero graphic",
    },
  },
  {
    color: "#3c197f",
    textColor: "text-white",
    tabLabel: "Audio Learning",
    headline: "Learn while you walk, drive, or work out",
    description:
      "Listen to concise audio summaries and keep growing even when you don't have time to sit down and read.",
    buttonText: "Try audio mode",
    media: {
      src: "/images/doable-audio-summaries.webp",
      alt: "Doable audio summaries hero graphic",
      containerClassName: "scale-105 sm:scale-110 lg:scale-125",
    },
  },
] as const;

export default function PlainBlocksCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClickScrollingRef = useRef(false);

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < carouselCards.length - 1;

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

      isClickScrollingRef.current = true;
      setActiveIndex(clampedIndex);
      track.scrollTo({ left: targetLeft, behavior });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);
    },
    []
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (isClickScrollingRef.current) {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
          updateActiveFromScroll();
        }, 150);
        return;
      }
      updateActiveFromScroll();
    };

    scrollToIndex(0, "auto");
    updateActiveFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
        <div className="px-6 pb-8 text-center lg:px-12">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#2f2f32] sm:text-5xl lg:text-6xl">
            Learn smarter. Act faster. Grow every day.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {carouselCards.map((card, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={card.tabLabel}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={`inline-flex min-h-[54px] items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 sm:px-8 sm:text-[1.05rem] ${
                    isActive
                      ? "bg-[#2f2f32] text-white"
                      : "bg-[#ece8e6] text-[#1f2937] hover:bg-[#e5dfdc]"
                  }`}
                  aria-label={`Show ${card.tabLabel}`}
                  aria-pressed={isActive}
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="mr-3 h-2.5 w-2.5 rounded-full bg-white"
                    />
                  ) : null}
                  {card.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pl-6 pr-6 scroll-pl-6 [scrollbar-width:none] [-ms-overflow-style:none] lg:pl-12 lg:pr-12 lg:scroll-pl-12 [&::-webkit-scrollbar]:hidden"
        >
          {carouselCards.map((card, index) => (
            <article
              key={card.tabLabel}
              data-block-card
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`relative flex h-[360px] w-[calc(100vw-140px)] shrink-0 snap-start flex-col overflow-hidden rounded-[40px] sm:h-[440px] sm:w-[calc(100vw-210px)] sm:flex-row lg:h-[560px] lg:w-[calc(100vw-380px)] ${card.textColor}`}
              style={{ backgroundColor: card.color }}
              aria-label={`Carousel block ${index + 1}`}
            >
              {/* Left Media Area */}
              <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
                {card.media ? (
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-2xl ${
                      "containerClassName" in card.media
                        ? card.media.containerClassName
                        : ""
                    }`}
                  >
                    <Image
                      src={card.media.src}
                      alt={card.media.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null}
              </div>

              {/* Right Content Area */}
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-10 lg:p-14 lg:pr-20">
                <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-[2.5rem]">
                  {card.headline}
                </h3>
                <p className="mt-4 text-sm font-medium leading-relaxed sm:mt-6 sm:text-base lg:text-lg">
                  {card.description}
                </p>
                <div className="mt-6 sm:mt-8 lg:mt-10">
                  <button
                    type="button"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#2f2f32] transition-transform hover:-translate-y-0.5 sm:h-14 sm:px-8 sm:text-base"
                  >
                    {card.buttonText}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-12">
          <div aria-hidden="true" />

          <div className="flex items-center justify-center gap-3">
            {carouselCards.map((_, index) => (
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

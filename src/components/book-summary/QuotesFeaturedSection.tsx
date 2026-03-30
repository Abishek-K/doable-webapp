import Image from "next/image";
import type { BookQuote } from "@/data/bookSummaryMock";

type QuotesFeaturedSectionProps = {
  quotes: BookQuote[];
  featuredImageSrc: string;
  featuredImageAlt: string;
};

export default function QuotesFeaturedSection({
  quotes,
  featuredImageSrc,
  featuredImageAlt,
}: QuotesFeaturedSectionProps) {
  const beige = quotes.find((q) => q.variant === "beige");
  const blue = quotes.find((q) => q.variant === "blue");

  return (
    <section className="bg-[#FCFBF7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
          <div className="flex flex-col gap-8">
            {beige && (
              <blockquote className="relative overflow-hidden rounded-[32px] bg-[#FDF5E6] p-10 sm:p-12">
                <span
                  className="pointer-events-none absolute -left-2 top-2 font-serif text-[120px] font-bold leading-none text-[#EBE0CC]/90 sm:text-[140px]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="relative z-[1] text-lg font-bold leading-relaxed text-[#5C4033] sm:text-xl">
                  &ldquo;{beige.quote}&rdquo;
                </p>
                {beige.attribution && (
                  <footer className="relative z-[1] mt-6 text-base font-semibold text-[#5C4033]">
                    — {beige.attribution}
                  </footer>
                )}
              </blockquote>
            )}

            <div className="relative lg:hidden">
              <FeaturedImage src={featuredImageSrc} alt={featuredImageAlt} />
            </div>

            {blue && (
              <blockquote className="relative rounded-[32px] border-l-[6px] border-[#1B4B72] bg-[#F0F4F8] p-10 sm:p-12">
                <p className="text-lg italic leading-relaxed text-[#1B4B72] sm:text-xl">
                  &ldquo;{blue.quote}&rdquo;
                </p>
              </blockquote>
            )}
          </div>

          <div className="relative hidden min-h-[420px] overflow-hidden rounded-[32px] lg:block lg:min-h-full">
            <FeaturedImage src={featuredImageSrc} alt={featuredImageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] min-h-[280px] w-full overflow-hidden rounded-[32px] bg-[#e8e4dc] shadow-inner lg:aspect-auto lg:h-full lg:min-h-[420px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplyTodaySection from "@/components/book-summary/ApplyTodaySection";
import BookSummaryHeader from "@/components/book-summary/BookSummaryHeader";
import BookSummaryStickyProgress from "@/components/book-summary/BookSummaryStickyProgress";
import KeyInsightsSection from "@/components/book-summary/KeyInsightsSection";
import MarkCompleteSection from "@/components/book-summary/MarkCompleteSection";
import QuotesFeaturedSection from "@/components/book-summary/QuotesFeaturedSection";
import RelatedBooksSection from "@/components/book-summary/RelatedBooksSection";
import SummaryRecapSection from "@/components/book-summary/SummaryRecapSection";
import MarketingFooter from "@/components/MarketingFooter";
import Navigation from "@/components/Navigation";
import {
  getBookSummaryBySlug,
  getBookSummarySlugs,
} from "@/data/bookSummaryMock";
import type { BookSummaryPage } from "@/data/bookSummaryMock";
import {
  getBookSummaryPageBySlug,
  getPublishedBookSlugs,
} from "@/lib/books/queries";

type BookPageProps = { params: { slug: string } };

async function resolveBookSummary(slug: string): Promise<BookSummaryPage | null> {
  const fromDb = await getBookSummaryPageBySlug(slug);
  if (fromDb) return fromDb;
  return getBookSummaryBySlug(slug) ?? null;
}

export async function generateStaticParams() {
  const [fromDb, fromMock] = await Promise.all([
    getPublishedBookSlugs(),
    Promise.resolve(getBookSummarySlugs()),
  ]);
  const slugs = Array.from(new Set([...fromDb, ...fromMock]));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const book = await resolveBookSummary(params.slug);
  if (!book) return { title: "Book | Doable" };
  return {
    title: `${book.title} Summary | Doable`,
    description: book.description.slice(0, 155),
    openGraph: {
      title: `${book.title} Summary | Doable`,
      description: book.description.slice(0, 155),
      type: "article",
    },
  };
}

export default async function BookSummaryPage({ params }: BookPageProps) {
  const book = await resolveBookSummary(params.slug);
  if (!book) notFound();

  return (
    <div className="min-h-screen bg-[#FCFBF7] font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <BookSummaryStickyProgress baselinePercent={book.progressExploredInitial} />

      <main>
        <BookSummaryHeader book={book} />
        <KeyInsightsSection insights={book.insights} />
        <QuotesFeaturedSection
          quotes={book.quotes}
          featuredImageSrc={book.featuredImageSrc}
          featuredImageAlt={book.featuredImageAlt}
        />
        <ApplyTodaySection actions={book.actions} />
        <SummaryRecapSection bullets={book.recapBullets} />
        <MarkCompleteSection />
        <RelatedBooksSection books={book.related} />
      </main>

      <MarketingFooter />
    </div>
  );
}

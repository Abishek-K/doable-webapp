import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplyTodaySection from "@/components/book-summary/ApplyTodaySection";
import BookSummaryHeader from "@/components/book-summary/BookSummaryHeader";
import BookSEOSection from "@/components/book-summary/BookSEOSection";
import BookSummaryStickyProgress from "@/components/book-summary/BookSummaryStickyProgress";
import KeyInsightsSection from "@/components/book-summary/KeyInsightsSection";
import MarkCompleteSection from "@/components/book-summary/MarkCompleteSection";
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
  
  const seo = book.seo;
  
  return {
    title: seo?.metaTitle || `${book.title} Summary | Doable`,
    description: seo?.metaDescription || book.description.slice(0, 155),
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || `${book.title} Summary | Doable`,
      description: seo?.ogDescription || seo?.metaDescription || book.description.slice(0, 155),
      type: "article",
      images: book.coverUrl ? [{ url: book.coverUrl }] : undefined,
    },
  };
}

export default async function BookSummaryPage({ params }: BookPageProps) {
  const book = await resolveBookSummary(params.slug);
  if (!book) notFound();

  return (
    <div className="min-h-screen bg-[#FCFBF7] font-[family-name:var(--font-geist-sans)]">
      {book.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: book.seo.structuredData }}
        />
      )}
      <Navigation />
      <BookSummaryStickyProgress baselinePercent={book.progressExploredInitial} />

      <main>
        <BookSummaryHeader book={book} />
        <BookSEOSection 
          h1={book.seo?.h1} 
          introParagraph={book.seo?.introParagraph} 
          faqContent={book.seo?.faqContent} 
        />
        <KeyInsightsSection insights={book.insights} />
        <ApplyTodaySection actions={book.actions} />
        <SummaryRecapSection bullets={book.recapBullets} />
        <MarkCompleteSection />
        <RelatedBooksSection books={book.related} />
      </main>

      <MarketingFooter />
    </div>
  );
}

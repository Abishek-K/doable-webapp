import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import MarketingFooter from "@/components/MarketingFooter";
import { getBookById, getCollectionById } from "@/data/exploreMock";

type CollectionPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionById(params.id);
  if (!collection) {
    return { title: "Collection | Doable" };
  }
  return {
    title: `${collection.title} | Doable`,
    description: collection.subtitle,
  };
}

export default function CollectionDetailPage({ params }: CollectionPageProps) {
  const collection = getCollectionById(params.id);
  if (!collection) {
    return (
      <div className="min-h-screen bg-[#F9F8F3]">
        <Navigation />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#111827]">Collection not found</h1>
          <Link
            href="/explore"
            className="mt-6 inline-block font-semibold text-[#A34E0C] hover:underline"
          >
            Back to Explore
          </Link>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  const books = collection.previewBookIds
    .map((id) => getBookById(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="min-h-screen bg-[#F9F8F3]">
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-14 font-[family-name:var(--font-geist-sans)] sm:px-6 lg:px-8">
        <Link
          href="/explore#collections"
          className="text-sm font-semibold text-[#A34E0C] hover:underline"
        >
          ← All collections
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          {collection.title}
        </h1>
        <p className="mt-3 text-lg text-[#6b7280]">{collection.subtitle}</p>
        <ul className="mt-12 space-y-6">
          {books.map((book, i) => (
            <li
              key={book.id}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04]"
            >
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={book.coverSrc}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#9ca3af]">
                  {i + 1}. Summary
                </p>
                <h2 className="mt-1 font-bold text-[#111827]">{book.title}</h2>
                <p className="text-sm text-[#6b7280]">{book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <MarketingFooter />
    </div>
  );
}

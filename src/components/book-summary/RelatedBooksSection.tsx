import Image from "next/image";
import Link from "next/link";
import type { RelatedBook } from "@/data/bookSummaryMock";

type RelatedBooksSectionProps = {
  books: RelatedBook[];
};

export default function RelatedBooksSection({ books }: RelatedBooksSectionProps) {
  return (
    <section className="bg-[#F9F8F3] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
          You may also like
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {books.map((b) => (
            <Link
              key={b.id}
              href={`/books/${b.id}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#136058] focus-visible:ring-offset-2"
            >
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.12)]`}
              >
                <Image
                  src={b.coverSrc}
                  alt={b.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-black group-hover:underline">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{b.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import ExplorePageClient from "@/components/explore/ExplorePageClient";
import { getPublishedBooksForExplore } from "@/lib/books/queries";

export default async function ExploreWithData() {
  const books = await getPublishedBooksForExplore();
  return <ExplorePageClient initialBooks={books} />;
}

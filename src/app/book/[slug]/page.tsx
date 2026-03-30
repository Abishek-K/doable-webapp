import { redirect } from "next/navigation";

type BookAliasPageProps = { params: { slug: string } };

export default function BookAliasPage({ params }: BookAliasPageProps) {
  redirect(`/books/${params.slug}`);
}

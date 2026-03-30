import { redirect } from "next/navigation";

interface BlogSlugProps {
  params: {
    slug: string;
  };
}

export default function BlogSlugRedirectPage({ params }: BlogSlugProps) {
  redirect(`/blogs/${params.slug}`);
}

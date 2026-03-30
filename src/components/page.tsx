import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MarketingFooter from "@/components/MarketingFooter";

interface Props {
    params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        return { title: "Post Not Found | Doable" };
    }

    return {
        title: post.seo.metaTitle,
        description: post.seo.metaDescription,
        openGraph: {
            title: post.seo.metaTitle,
            description: post.seo.metaDescription,
            type: "article",
            authors: [post.author],
            images: [post.coverUrl],
        },
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <main>
                <article className="px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <p className="text-base font-semibold leading-7 text-blue-600">{post.category}</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
                        <p className="mt-6 text-xl leading-8">{post.excerpt}</p>

                        <div className="mt-6 flex items-center gap-x-4 text-sm text-gray-500">
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </time>
                            <span>&middot;</span>
                            <span>{post.readingTime} min read</span>
                            <span>&middot;</span>
                            <span>By {post.author}</span>
                        </div>

                        <div className="mt-8">
                            <img src={post.coverUrl} alt={post.title} className="w-full h-[400px] rounded-xl bg-gray-100 object-cover" />
                        </div>

                        <div className="prose prose-blue prose-lg mt-10 max-w-2xl text-gray-700">
                            {/* Uses simple naive rendering. Consider replacing with react-markdown down the line */}
                            <div dangerouslySetInnerHTML={{ __html: post.contentMarkdown.replace(/\n\n/g, '<br/><br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                    </div>
                </article>
            </main>
            <MarketingFooter />
        </div>
    );
}
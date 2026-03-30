import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreWithData from "@/app/explore/ExploreWithData";
import MarketingFooter from "@/components/MarketingFooter";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Explore Book Summaries — Doable",
  description:
    "Browse hundreds of actionable book summaries by topic — productivity, mindset, leadership, habits, and more. Find your next 10-minute mission on Doable.",
  openGraph: {
    title: "Explore Book Summaries — Doable",
    description:
      "Browse hundreds of actionable book summaries by topic. Find your next 10-minute mission on Doable.",
    url: "https://www.doable.app/explore",
    type: "website",
  },
  twitter: {
    title: "Explore Book Summaries — Doable",
    description:
      "Browse hundreds of actionable book summaries by topic on Doable.",
  },
};

function ExploreLoadingFallback() {
  return (
    <main className="min-h-[50vh] bg-[#F9F8F3] px-4 py-24 text-center font-[family-name:var(--font-geist-sans)] text-[#6b7280]">
      Loading library…
    </main>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#F9F8F3]">
      <Navigation />
      <Suspense fallback={<ExploreLoadingFallback />}>
        <ExploreWithData />
      </Suspense>
      <MarketingFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreWithData from "@/app/explore/ExploreWithData";
import MarketingFooter from "@/components/MarketingFooter";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Explore | Doable",
  description:
    "Browse book summaries by topic, search the library, and pick up curated collections built for action.",
  openGraph: {
    title: "Explore | Doable",
    description:
      "Browse book summaries by topic, search the library, and pick up curated collections built for action.",
    type: "website",
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

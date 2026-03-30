import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — Doable",
  description:
    "Get unlimited access to Doable's full library of actionable book summaries, audio learning, and progress tracking. Simple, transparent pricing. Cancel anytime.",
  openGraph: {
    title: "Pricing — Doable",
    description:
      "Unlock unlimited book summaries, audio learning, and daily action missions. Simple pricing, cancel anytime.",
    url: "https://www.doable.app/pricing",
    type: "website",
  },
  twitter: {
    title: "Pricing — Doable",
    description:
      "Unlock unlimited book summaries and daily missions. Simple pricing, cancel anytime.",
  },
};
import WhyUpgradeSection from "@/components/WhyUpgradeSection";
import TrustedBySection from "@/components/TrustedBySection";
import ComparisonTableSection from "@/components/ComparisonTableSection";
import PricingFAQSection from "@/components/PricingFAQSection";
import PricingCTASection from "@/components/PricingCTASection";
import MarketingFooter from "@/components/MarketingFooter";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <PricingSection />
        <WhyUpgradeSection />
        <TrustedBySection />
        <ComparisonTableSection />
        <PricingFAQSection />
        <PricingCTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}

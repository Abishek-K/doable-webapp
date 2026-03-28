import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
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

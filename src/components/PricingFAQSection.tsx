import FAQAccordion from "./FAQAccordion";

const pricingFaqItems = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time without any restrictions or hidden conditions. Once you cancel, you'll continue to have full access to your plan until the end of your current billing cycle, and you won't be charged again after that. We've designed Doable to be flexible, so you stay only because it's valuable—not because you're locked in.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Doable offers a free plan that allows you to explore a selection of summaries and understand how the platform works before upgrading. This gives you a chance to experience the quality, format, and usefulness of the content at your own pace. When you're ready for unlimited access and deeper learning, you can upgrade anytime.",
  },
  {
    question: "What books are included?",
    answer:
      "Doable features a curated collection of high-impact books across areas like business, productivity, mindset, psychology, and personal growth. We focus specifically on books that offer practical, real-world insights you can apply immediately, rather than abstract ideas. New summaries are added regularly to ensure you always have access to relevant and valuable content.",
  },
  {
    question: "How is Doable different?",
    answer:
      "Most learning platforms are designed for consuming more information, but Doable is built for applying what you learn. Instead of long, passive summaries, Doable breaks down books into short, structured insights that are easy to understand and immediately actionable. The focus is not just on learning faster, but on turning ideas into real progress in your work and life.",
  },
];

export default function PricingFAQSection() {
  return (
    <section className="bg-white px-4 py-12 font-sans sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[820px]">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-[#2b2b2b] sm:text-5xl">
          Frequently asked questions
        </h2>

        <div className="mt-12" id="faq">
          <FAQAccordion items={pricingFaqItems} />
        </div>
      </div>
    </section>
  );
}

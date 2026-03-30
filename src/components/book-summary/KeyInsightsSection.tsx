import InsightCard from "@/components/book-summary/InsightCard";
import type { BookInsight } from "@/data/bookSummaryMock";

type KeyInsightsSectionProps = {
  insights: BookInsight[];
};

export default function KeyInsightsSection({ insights }: KeyInsightsSectionProps) {
  return (
    <section
      id="key-insights"
      className="bg-[#F9F7F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="key-insights-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="key-insights-heading"
          className="text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl"
        >
          Key Insights
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {insights.map((insight) => (
            <InsightCard key={insight.n} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}

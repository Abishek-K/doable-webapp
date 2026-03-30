import type { BookInsight } from "@/data/bookSummaryMock";

export default function InsightCard({ insight }: { insight: BookInsight }) {
  return (
    <article className="flex flex-col rounded-[24px] bg-white p-7 shadow-[0_2px_16px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.03] sm:p-8">
      <span className="text-4xl font-bold leading-none text-[#E5DED0] sm:text-5xl">
        {insight.n}
      </span>
      <h3 className="mt-4 text-lg font-bold text-[#1A1A1A] sm:text-xl">
        {insight.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#6B6B6B]">
        {insight.description}
      </p>
      <div className="mt-6 rounded-2xl bg-white px-4 py-3 ring-1 ring-[#e8e4dc] sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#1A534E]">
          Practical takeaway
        </p>
        <p className="mt-1 text-sm font-medium leading-snug text-[#1A1A1A]">
          {insight.takeaway}
        </p>
      </div>
    </article>
  );
}

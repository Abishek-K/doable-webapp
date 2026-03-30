import { Zap } from "lucide-react";

type RecapBullet = { keyword: string; text: string };

type SummaryRecapSectionProps = {
  bullets: RecapBullet[];
};

export default function SummaryRecapSection({ bullets }: SummaryRecapSectionProps) {
  return (
    <section className="bg-[#FCFAF7] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
          Summary Recap: In 30 Seconds
        </h2>
        <ul className="mx-auto mt-10 max-w-xl space-y-6 sm:mt-12">
          {bullets.map((b) => (
            <li key={b.keyword} className="flex gap-4">
              <Zap
                className="mt-0.5 h-5 w-5 shrink-0 text-[#B87333]"
                strokeWidth={2.25}
                aria-hidden
              />
              <p className="text-base leading-relaxed text-[#555555] sm:text-lg">
                <span className="font-bold text-[#1A1A1A]">{b.keyword}:</span>{" "}
                {b.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

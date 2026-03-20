export type FAQItem = {
  question: string;
  answer: string;
};

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="w-full">
      {items.map((item, index) => {
        return (
          <details key={item.question} className="group border-b border-[#e5e5e5]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left sm:py-7 [&::-webkit-details-marker]:hidden">
              <span className="text-[1.35rem] font-medium leading-snug text-[#2b2b2b]">
                {item.question}
              </span>
              <span
                className="relative h-6 w-6 shrink-0 text-[#2b2b2b]"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-300 ease-in-out group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>

            <div
              id={`faq-answer-${index}`}
              className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100"
            >
              <p className="overflow-hidden pb-7 pr-10 text-base leading-[1.6] text-[#5a5a5a]">
                {item.answer}
              </p>
            </div>
          </details>
        );
      })}
    </div>
  );
}

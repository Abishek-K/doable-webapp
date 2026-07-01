import React from "react";

type FAQ = {
  question: string;
  answer: string;
};

type BookSEOSectionProps = {
  h1?: string;
  introParagraph?: string;
  faqContent?: FAQ[];
};

export default function BookSEOSection({
  h1,
  introParagraph,
  faqContent,
}: BookSEOSectionProps) {
  if (!h1 && !introParagraph && (!faqContent || faqContent.length === 0)) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {h1 && (
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {h1}
          </h1>
        )}
        {introParagraph && (
          <p className="mb-12 text-lg leading-relaxed text-slate-600">
            {introParagraph}
          </p>
        )}

        {faqContent && faqContent.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-12">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {faqContent.map((faq, index) => (
                <div key={index}>
                  <dt className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-slate-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
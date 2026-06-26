import Image from "next/image";

type InsightCard = {
  title: string;
  description: string;
  topColor: string;
  image: string;
};

const insightCards: InsightCard[] = [
  {
    title: "Designed for Busy Lives",
    description:
      "Learn the core ideas from bestselling books in around 15 minutes. Keep growing every day, even with the busiest schedule.",
    topColor: "#dde2f1",
    image: "/images/discover-book-summaries.webp",
  },
  {
    title: "Practical, Not Theoretical",
    description:
      "Every summary focuses on actionable insights, proven frameworks, and real-world takeaways. Learn ideas you can apply immediately.",
    topColor: "#e2def8",
    image: "/images/track-reading-progress.webp",
  },
  {
    title: "Knowledge That Sticks",
    description:
      "Save your favorite insights, revisit key lessons anytime, and turn learning into lasting habits that compound over time.",
    topColor: "#dce3ef",
    image: "/images/learn-smarter-not-harder.webp",
  },
];

export default function InsightsSection() {
  return (
    <section className="bg-white px-6 py-16 font-sans sm:py-20 lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.03em] text-[#101114] sm:text-5xl lg:text-6xl">
            Read less. Learn more.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Grow every single day.</span>
              <span
                aria-hidden="true"
                className="absolute bottom-[0.06em] left-0 z-0 h-[0.24em] w-full bg-[#fff3a6]"
              />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.45] text-[#212327]">
            From discovering powerful ideas to applying them in everyday life, Doable simplifies your learning journey —{" "}
            <strong className="font-extrabold text-[#101114]">
              no information overload, just actionable insights.
            </strong>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {insightCards.map((card) => (
            <article
              key={card.title}
              className="origin-bottom-left overflow-hidden rounded-2xl border border-[#cfd4ea] bg-[#ececf2] transition-transform duration-300 ease-out hover:rotate-[1.5deg] motion-reduce:transform-none"
            >
              <div
                className="relative h-[220px] w-full border-b border-[#d8dcee]"
                style={{ backgroundColor: card.topColor }}
                aria-hidden="true"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-8 pb-10 pt-9">
                <h3 className="text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#101114]">
                  {card.title}
                </h3>
                <p className="mt-4 text-[1.03rem] leading-[1.45] text-[#1f2227]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type InsightCard = {
  title: string;
  description: string;
  topColor: string;
};

const insightCards: InsightCard[] = [
  {
    title: "Incredibly personalised",
    description:
      "Add your branding, change the interface layout and colors, customise your menus and everything else you need to make Plutio truly yours.",
    topColor: "#dde2f1",
  },
  {
    title: "Easily build anything",
    description:
      "Our intuitive drag and drop editor is packed with features and styling options that makes it incredibly easy to create stunning proposals, invoices, forms and even schedulers.",
    topColor: "#e2def8",
  },
  {
    title: "Collaborate in realtime",
    description:
      "Communicate with anyone through comments, direct messaging, channels and project discussions. The best part is no one needs to be in-app to communicate back.",
    topColor: "#dce3ef",
  },
];

export default function InsightsSection() {
  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.03em] text-[#101114] sm:text-5xl lg:text-6xl">
            Not another tool in your stack.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">This one replaces the stack.</span>
              <span
                aria-hidden="true"
                className="absolute bottom-[0.06em] left-0 z-0 h-[0.24em] w-full bg-[#fff3a6]"
              />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.45] text-[#212327]">
            From the first hello to the final payment, your entire workflow in
            one app, powered by Super Work AI{" "}
            <strong className="font-extrabold text-[#101114]">
              - no apps to juggle, no busywork to hold you back.
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
                className="h-[220px] w-full border-b border-[#d8dcee]"
                style={{ backgroundColor: card.topColor }}
                aria-hidden="true"
              />

              <div className="px-8 pb-10 pt-9">
                <h3 className="text-[2.3rem] font-bold leading-[1.05] tracking-[-0.02em] text-[#101114]">
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

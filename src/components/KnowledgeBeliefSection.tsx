export default function KnowledgeBeliefSection() {
  const beliefs = [
    {
      quote: '"Learning without action is wasted."',
      bgColor: "#FFF5EE",
      textColor: "#92400E",
    },
    {
      quote: '"Clarity beats complexity."',
      bgColor: "#F0F7F7",
      textColor: "#1E5A5A",
    },
    {
      quote: '"Small actions create real change."',
      bgColor: "#EBF5F5",
      textColor: "#1A7A7A",
    },
  ];

  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <h2 className="mb-14 text-center text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
          We believe knowledge should be useful.
        </h2>

        {/* Quote Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {beliefs.map((belief, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-3xl px-8 py-10 text-center"
              style={{ backgroundColor: belief.bgColor }}
            >
              <p
                className="text-lg font-semibold leading-relaxed sm:text-xl"
                style={{ color: belief.textColor }}
              >
                {belief.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

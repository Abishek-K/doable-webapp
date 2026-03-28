export default function ReadingToDoingSection() {
  const steps = [
    {
      number: "01",
      title: "Learn fast",
      description:
        "Scan the key ideas and core concepts of any book in under 10 minutes.",
    },
    {
      number: "02",
      title: "Understand why",
      description:
        "Grasp the mental models and frameworks that actually drive results.",
    },
    {
      number: "03",
      title: "Apply instantly",
      description:
        "Complete a focused exercise to integrate the learning into your life.",
    },
  ];

  return (
    <section className="px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8" style={{ backgroundColor: "#EDEAE4" }}>
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <h2
          className="mb-16 text-center text-4xl sm:text-5xl text-slate-900"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          From reading → doing
        </h2>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting horizontal line - positioned behind the circles */}
          <div className="absolute left-0 right-0 hidden md:block" style={{ top: "32px" }}>
            <div className="mx-auto" style={{ width: "66%", height: "4px", background: "linear-gradient(to right, #2C8C8C, #7DD5D5)" }} />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Numbered circle */}
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-lg font-medium"
                  style={{
                    backgroundColor: index === 2 ? "#D4F2F0" : "#EDEAE4",
                    border: index === 2 ? "2px solid #A8E4E0" : "2px solid #2C8C8C",
                    color: "#2C8C8C",
                  }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

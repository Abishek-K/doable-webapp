const beliefs = [
  {
    quote: '"Learning without action is wasted."',
    bg: "bg-[#fff4ed]",
    text: "text-[#b45309]",
  },
  {
    quote: '"Clarity beats complexity."',
    bg: "bg-[#f0fdf4]",
    text: "text-[#14532d]",
  },
  {
    quote: '"Small actions create real change."',
    bg: "bg-[#f0f9ff]",
    text: "text-[#1e3a5f]",
  },
] as const;

export default function BeliefsSection() {
  return (
    <section
      className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="beliefs-heading"
    >
      <div className="mx-auto w-full max-w-6xl text-center">
        <h2
          id="beliefs-heading"
          className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl"
        >
          We believe knowledge should be useful.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {beliefs.map((item) => (
            <div
              key={item.quote}
              className={`flex min-h-[180px] items-center justify-center rounded-[28px] px-6 py-10 sm:min-h-[200px] sm:px-8 ${item.bg}`}
            >
              <p
                className={`text-center text-lg font-bold leading-snug sm:text-xl ${item.text}`}
              >
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "I used to feel guilty about not finishing books. Now I actually implement the best parts in my daily workflow.",
    name: "Sarah J.",
    title: "Product Lead",
    avatarClass: "bg-[#fca16d]",
  },
  {
    quote:
      "The only learning platform that doesn't just ask me to watch more. It asks me to do more. Total game changer.",
    name: "Marcus T.",
    title: "Entrepreneur",
    avatarClass: "bg-[#9fe4d8]",
  },
  {
    quote:
      "Finally, a way to keep up with the knowledge I need without spending my entire weekend reading.",
    name: "Elena R.",
    title: "Creative Director",
    avatarClass: "bg-[#8bc2eb]",
  },
] as const;

export default function SocialProofSection() {
  return (
    <section
      className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="social-proof-heading"
          className="text-center text-3xl font-bold tracking-tight text-[#3d3d3d] sm:text-4xl"
        >
          Built for people who want progress.
        </h2>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-10 sm:gap-24 md:gap-32">
          <div className="text-center">
            <p className="text-4xl font-bold tabular-nums text-[#b06a2e] sm:text-5xl">
              1,000+
            </p>
            <p className="mt-1 text-sm text-[#9aa1a6]">Active Learners</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold tabular-nums text-[#b06a2e] sm:text-5xl">
              450+
            </p>
            <p className="mt-1 text-sm text-[#9aa1a6]">Action Guides</p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col rounded-[24px] bg-[#f2f1ea] p-8"
            >
              <blockquote className="flex-1 text-lg italic leading-relaxed text-[#3d3d3d]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 flex items-center gap-3">
                <span
                  className={`h-10 w-10 shrink-0 rounded-full ${t.avatarClass}`}
                  aria-hidden
                />
                <p className="text-sm text-[#3d3d3d]">
                  <span className="font-normal">{t.name}</span>
                  <span className="text-[#3d3d3d]/80"> — {t.title}</span>
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

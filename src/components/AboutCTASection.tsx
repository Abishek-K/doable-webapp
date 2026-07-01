import Link from "next/link";

export default function AboutCTASection() {
  return (
    <section className="bg-white px-4 pb-16 font-sans sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="relative overflow-hidden rounded-[36px] px-8 py-14 shadow-[0_20px_50px_-12px_rgba(26,115,232,0.35)] sm:px-12 sm:py-16 md:px-16"
          style={{
            background:
              "linear-gradient(to right, #1a73e8 0%, #1765cc 100%)",
          }}
        >
          {/* Subtle smoke / depth overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            aria-hidden
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 20% 20%, rgba(255, 200, 160, 0.25) 0%, transparent 55%),
                radial-gradient(ellipse 100% 60% at 75% 70%, rgba(255, 220, 190, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 45%)
              `,
            }}
          />

          <div className="relative flex flex-col items-center justify-center text-center">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-tight">
              Start learning. Start doing.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Join the new generation of active learners who value execution over
              consumption.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-3.5 text-base font-bold text-[#1a1a1a] transition-colors hover:bg-[#f4c400]"
            >
              Get Started Free
            </Link>
            <p className="mt-10 max-w-md text-sm font-light leading-relaxed text-white">
              No credit card required. Instant access to your first 3 insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

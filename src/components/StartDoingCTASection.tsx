import Link from "next/link";

export default function StartDoingCTASection() {
  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* CTA Card */}
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20"
          style={{
            background:
              "linear-gradient(135deg, #C67B3C 0%, #D4914E 30%, #D89A58 50%, #CC8040 70%, #C07038 100%)",
          }}
        >
          {/* Subtle decorative circle in top-left */}
          <div
            className="absolute -left-8 -top-8 h-40 w-40 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Heading */}
          <h2
            className="relative z-10 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ fontStyle: "italic" }}
          >
            Start learning. Start doing.
          </h2>

          {/* Subtext */}
          <p className="relative z-10 mx-auto mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            Join the new generation of active learners who value execution over
            consumption.
          </p>

          {/* CTA Button */}
          <div className="relative z-10 mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
              style={{ color: "#92400E" }}
            >
              Get Started Free
            </Link>
          </div>

          {/* Fine print */}
          <p
            className="relative z-10 mt-5 text-xs italic"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            No credit card required. Instant access to your first 3 Insights.
          </p>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function PricingCTASection() {
  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl bg-orange-100 px-8 py-16 text-center sm:px-12 sm:py-20">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Ready to stop reading and start doing?
          </h2>

          {/* Subheading */}
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Join thousands of others who are transforming their lives 10 minutes
            at a time.
          </p>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="mt-10 inline-flex rounded-full bg-amber-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-amber-800 shadow-lg"
          >
            Start Your Free 7-Day Trial
          </Link>

          {/* Footer Text */}
          <p className="mt-6 text-base text-slate-600 sm:text-lg">
            Cancel anytime. No strings attached.
          </p>
        </div>
      </div>
    </section>
  );
}

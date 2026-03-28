import Navigation from "@/components/Navigation";
import MarketingFooter from "@/components/MarketingFooter";
import LearningBrokenSection from "@/components/LearningBrokenSection";
import SolutionSection from "@/components/SolutionSection";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-white px-4 py-12 font-sans sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Content */}
              <div className="flex flex-col">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
                  Learning that{" "}
                  <span className="text-amber-700">actually</span> changes your
                  life.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                  Doable turns the world's best ideas into simple, actionable
                  10-minute insights you can apply instantly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full bg-amber-700 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-amber-800 shadow-lg"
                  >
                    Start Learning
                  </Link>
                  <button className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-3 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50">
                    How it works
                  </button>
                </div>
              </div>

              {/* Right Content - Image Placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-500 via-orange-400 to-teal-500 shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <LearningBrokenSection />
        <SolutionSection />
      </main>
      <MarketingFooter />
    </div>
  );
}

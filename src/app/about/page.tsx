import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "About Doable — Learning That Actually Changes Your Life",
  description:
    "Learn how Doable transforms world-class books into simple, actionable 10-minute insights. Discover our mission to make real learning accessible to everyone.",
  openGraph: {
    title: "About Doable — Learning That Actually Changes Your Life",
    description:
      "Doable turns the world's best ideas into actionable 10-minute insights. Discover the mission behind the platform built for execution, not consumption.",
    url: "https://www.doable.app/about",
    type: "website",
  },
  twitter: {
    title: "About Doable — Learning That Actually Changes Your Life",
    description:
      "Discover how Doable turns world-class books into 10-minute actionable missions.",
  },
};
import LearningBrokenSection from "@/components/LearningBrokenSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import AboutCTASection from "@/components/AboutCTASection";
import BeliefsSection from "@/components/BeliefsSection";
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
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-6xl">
                  Learning that{" "}
                  <span className="text-[#f4c400]">actually</span> changes your
                  life.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[#5a5a5a] sm:text-xl">
                  Doable turns the world's best ideas into simple, actionable
                  10-minute insights you can apply instantly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full bg-[#f4c400] px-8 py-3 text-base font-semibold text-[#1a1a1a] transition-all hover:bg-[#e0b400] shadow-md"
                  >
                    Start Learning
                  </Link>
                  <a href="#how-it-works" className="inline-flex items-center justify-center rounded-full border border-[#e4e7ea] px-8 py-3 text-base font-semibold text-[#2b2b2b] transition-all hover:bg-slate-50">
                    How it works
                  </a>
                </div>
              </div>

              {/* Right Content - Image Placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#fff8d6] via-[#f4c400] to-[#e0b400] shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <LearningBrokenSection />
        <SolutionSection />

        {/* From Reading to Doing Section */}
        <section id="how-it-works" className="bg-[#f7f5f2] px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
              From reading → doing
            </h2>

            <div className="mt-16">
              <div className="flex items-start justify-center gap-0 md:gap-0">
                {/* Step 1 */}
                <div className="flex flex-1 flex-col items-center px-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#1a73e8] bg-white text-3xl font-bold text-[#1a73e8]">
                    01
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-[#1a1a1a]">
                    Learn fast
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a5a5a]">
                    Scan the key ideas and core concepts of any book in under 10 minutes.
                  </p>
                </div>

                {/* Connecting line 1 - hidden on mobile */}
                <div className="hidden md:flex flex-1 items-center">
                  <div className="h-1 w-full bg-[#1a73e8]"></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-1 flex-col items-center px-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#f4c400] bg-white text-3xl font-bold text-[#f4c400]">
                    02
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-[#1a1a1a]">
                    Understand why
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a5a5a]">
                    Grasp the mental models and frameworks that actually drive results.
                  </p>
                </div>

                {/* Connecting line 2 - hidden on mobile */}
                <div className="hidden md:flex flex-1 items-center">
                  <div className="h-1 w-full bg-[#f4c400]"></div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-1 flex-col items-center px-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white text-3xl font-bold text-[#1a1a1a]">
                    03
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-[#1a1a1a]">
                    Apply instantly
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a5a5a]">
                    Complete a focused exercise to integrate the learning into your life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BeliefsSection />

        {/* Old vs Doable Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#f1f1ef]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 sm:p-14">
                  <h3 className="text-2xl font-semibold text-[#2f2f32]">The Old Way</h3>
                  <ul className="mt-8 space-y-6 text-sm text-[#9aa1a6]">
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5f5] text-[#ef6b6b]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Hours of passive reading</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5f5] text-[#ef6b6b]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Theories with no examples</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5f5] text-[#ef6b6b]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Easily forgotten content</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5f5] text-[#ef6b6b]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Zero accountability for change</span>
                    </li>
                  </ul>
                </div>

                <div className="p-10 sm:p-14 bg-[#fff8d6]">
                  <h3 className="text-2xl font-semibold text-[#1a1a1a]">The Doable Way</h3>
                  <p className="mt-2 text-xs font-semibold uppercase text-[#a38200] tracking-wider">Built for execution, not consumption</p>
                  <ul className="mt-8 space-y-4 text-sm text-[#1a1a1a]">
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#a38200]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 5L4 8L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>10-minute focus sessions</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#a38200]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 5L4 8L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Step-by-step frameworks</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ddfbf5] text-[#0d7b68]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 5L4 8L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Embedded action exercises</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ddfbf5] text-[#0d7b68]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 5L4 8L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Continuous progress tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SocialProofSection />
        <AboutCTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}

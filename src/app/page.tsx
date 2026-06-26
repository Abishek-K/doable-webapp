import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";
import CategoryCardsSection from "@/components/CategoryCardsSection";
import PlainBlocksCarouselSection from "@/components/PlainBlocksCarouselSection";
import ReviewCarouselSection from "@/components/ReviewCarouselSection";
import InsightsSection from "@/components/InsightsSection";

export const metadata: Metadata = {
  title: "Doable — Turn Books Into Action in 10 Minutes",
  description:
    "Stop collecting highlights and start building habits. Doable extracts core frameworks from world-class books and turns them into 10-minute daily missions you can act on immediately.",
  openGraph: {
    title: "Doable — Turn Books Into Action in 10 Minutes",
    description:
      "Stop collecting highlights and start building habits. Doable extracts core frameworks from world-class books and turns them into 10-minute daily missions.",
    url: "https://www.doable.app",
    type: "website",
  },
  twitter: {
    title: "Doable — Turn Books Into Action in 10 Minutes",
    description:
      "Stop collecting highlights and start building habits. Doable turns world-class books into 10-minute daily missions.",
  },
};

export const runtime = "nodejs";

const faqItems: FAQItem[] = [
  {
    question: "What can Doable help me achieve?",
    answer:
      "Doable helps you turn knowledge into real-world action faster. Instead of spending hours reading full books, you get structured, practical summaries that highlight key ideas, frameworks, and next steps. Whether you want to grow in your career, build better habits, or improve productivity, Doable helps you stay consistent and focused.",
  },
  {
    question: "How does Doable work?",
    answer:
      "Doable gives you short, structured summaries that you can read or listen to in minutes. You can explore topics like business, self-improvement, psychology, and productivity, and track your learning progress inside the app. This makes it easier to learn daily, even with a busy schedule.",
  },
  {
    question: "How long does it take to complete a summary?",
    answer:
      "Most summaries on Doable are designed to be completed in about 10-15 minutes. You can read them during short breaks, commute time, or before starting your workday to quickly gain useful insights.",
  },
  {
    question: "What type of content is available on Doable?",
    answer:
      "Doable covers a wide range of high-impact non-fiction topics including productivity, business strategy, mindset, leadership, personal growth, decision-making, and habits. The library is continuously expanding so you always have fresh ideas to explore.",
  },
  {
    question: "Can I listen to summaries instead of reading?",
    answer:
      "Yes. Many summaries are available in audio format so you can learn while walking, commuting, working out, or doing daily tasks. This allows you to make the most of your otherwise idle time.",
  },
  {
    question:
      "How is Doable different from other learning or summary apps?",
    answer:
      "Doable focuses not just on learning, but on execution. The summaries are structured to help you understand key concepts quickly and apply them in real situations. The platform is designed to support consistent progress rather than passive consumption.",
  },
  {
    question:
      "Is Doable suitable for busy professionals and students?",
    answer:
      "Absolutely. Doable is built for people with limited time who still want to keep learning and improving. You can finish meaningful content in short sessions without disrupting your routine.",
  },
  {
    question: "What's included in the Doable subscription?",
    answer:
      "A subscription gives you unlimited access to the full summary library, audio learning features, progress tracking tools, and new content updates. You can explore topics freely and learn at your own pace.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your trial or subscription at any time from your account settings. If you cancel during the trial period, you will not be charged.",
  },
];

async function handleEmailSignup(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return;

  console.log("Weekly insights signup:", email);
}

function EmailSignupSection() {
  return (
    <section className="bg-white px-6 py-12 font-sans sm:py-14 lg:px-12">
      <div className="mx-auto w-full max-w-[820px] text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl">
          Stay ahead every week
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-base leading-relaxed text-[#5f6670] sm:text-lg">
          Get hand-picked book summaries, productivity insights, and new
          releases delivered to your inbox.
        </p>
        <p className="mt-3 text-sm font-semibold text-[#34414d] sm:text-base">
          Weekly learning. Zero noise.
        </p>

        <form
          action={handleEmailSignup}
          className="mx-auto mt-7 flex w-full max-w-[760px] flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="weekly-insights-email" className="sr-only">
            Enter your email
          </label>
          <input
            id="weekly-insights-email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            aria-label="Enter your email"
            className="h-[52px] w-full rounded-full border border-[#e4e7ea] bg-white px-5 text-[15px] text-[#2b2b2b] placeholder:text-[#8a9199] outline-none ring-0 transition focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20"
          />
          <button
            type="submit"
            className="h-[52px] w-full rounded-full bg-[#1a73e8] px-7 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-colors duration-200 hover:bg-[#1765cc] sm:w-auto"
          >
            Get weekly insights
          </button>
        </form>

        <p className="mt-4 text-sm text-[#7a828c]">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="flex min-h-[85vh] items-center bg-white px-6 py-12 font-sans sm:min-h-[80vh] sm:py-16 lg:min-h-[90vh] lg:px-12 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col">
            {/* Eyebrow tag */}
            <div className="inline-flex w-fit items-center rounded-full bg-[#fff8d6] px-4 py-1.5 text-xs font-semibold tracking-widest text-[#a38200] uppercase">
              Execution-First Learning
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[3.5rem]">
              Turn books into action in{" "}
              <em className="not-italic font-extrabold italic text-[#f4c400]">
                10 minutes.
              </em>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base leading-relaxed text-[#5a5a5a] sm:text-lg">
              Most people read and forget. Doers read and act. Doable breaks
              down powerful books into sharp, structured summaries with one
              goal: help you apply what matters immediately.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#f4c400] px-8 py-3.5 text-base font-semibold text-[#1a1a1a] shadow-md transition-all hover:bg-[#e0b400] hover:-translate-y-0.5"
              >
                Start free trial
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-3">
              {/* Stacked avatar circles */}
              <div className="flex -space-x-2">
                {["/images/review1.png", "/images/review2.png", "/images/review3.png"].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#f7f5f2]"
                  >
                    <Image
                      src={src}
                      alt={`Reviewer avatar ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#5a5a5a]">
                Trusted by{" "}
                <span className="font-bold text-[#1a1a1a]">10,000+ Doers</span>{" "}
                building faster careers and sharper lives
              </p>
            </div>
          </div>

          {/* Right Content — Hero Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[640px] overflow-hidden rounded-3xl xl:max-w-[720px]">
              <Image
                src="/images/doable-book-summaries-hero.webp"
                alt="Doable app showing a Deep Work Action session"
                width={1080}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const memberVisuals = [
  { key: "top-left", className: "left-[8%] top-0 h-20 w-20 md:h-28 md:w-28", src: "/images/doable-icon-book.svg" },
  { key: "bottom-left", className: "left-[20%] bottom-2 h-16 w-16 md:h-24 md:w-24", src: "/images/doable-icon-achievement.svg" },
  { key: "top-mid-left", className: "left-[42%] top-3 h-16 w-16 md:h-24 md:w-24", src: "/images/doable-icon-ideas.svg" },
  { key: "top-mid-right", className: "right-[30%] top-7 h-16 w-16 md:h-24 md:w-24", src: "/images/doable-icon-growth.svg" },
  { key: "top-right", className: "right-[8%] top-0 h-20 w-20 md:h-28 md:w-28", src: "/images/doable-icon-audio.svg" },
  { key: "bottom-right", className: "right-[18%] bottom-5 h-14 w-14 md:h-20 md:w-20", src: "/images/doable-icon-goals.svg" },
] as const;

function FutureSelfSection() {
  return (
    <section className="bg-white px-6 py-12 font-sans sm:py-14 lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="relative mx-auto flex min-h-[320px] items-center justify-center md:min-h-[400px]">
          {memberVisuals.map((item) => (
            <div key={item.key} className={`absolute ${item.className}`}>
              <Image
                src={item.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 80px, 128px"
                className="rounded-full object-cover"
              />
            </div>
          ))}

          <h2 className="relative z-10 mx-auto max-w-[980px] px-4 text-center text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#2f2f32] sm:text-5xl lg:text-7xl">
            Become the person your future self will thank you for.
          </h2>
        </div>
      </div>
    </section>
  );
}



export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <CategoryCardsSection />

      <PlainBlocksCarouselSection />

      <FutureSelfSection />

      <ReviewCarouselSection />

      <InsightsSection />

      <section className="bg-white px-6 py-12 sm:py-14 lg:px-12">
        <div className="mx-auto w-full max-w-[820px]">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-[#2b2b2b] sm:text-5xl">
            Frequently asked questions
          </h2>

          <div id="faq" className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </main>
  );
}

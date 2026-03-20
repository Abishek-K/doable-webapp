import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";
import CategoryCardsSection from "@/components/CategoryCardsSection";
import PlainBlocksCarouselSection from "@/components/PlainBlocksCarouselSection";
import ReviewCarouselSection from "@/components/ReviewCarouselSection";
import InsightsSection from "@/components/InsightsSection";

export const metadata: Metadata = {
  title: "Book Summaries App",
  description: "Read and listen to bestselling book summaries in minutes",
};

export const runtime = "nodejs";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

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

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Book summaries", href: "/explore" },
      { label: "Audio summaries", href: "/explore" },
      { label: "Categories", href: "/explore" },
      { label: "Pricing", href: "/pricing" },
      { label: "Free trial", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Productivity guides", href: "/blogs" },
      { label: "FAQ", href: "#faq" },
      { label: "Help center", href: "#" },
      { label: "Contact support", href: "mailto:support@doable.app" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Doable", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Affiliate program", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Subscription & Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
] as const;

async function handleEmailSignup(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return;

  console.log("Weekly insights signup:", email);
}

function EmailSignupSection() {
  return (
    <section className="bg-white px-4 py-12 font-sans sm:px-6 sm:py-14 lg:px-8">
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
    <section
      className="bg-[#f2f2f2] bg-cover bg-center bg-no-repeat px-4 py-35 font-sans sm:px-6 sm:py-36 lg:py-44"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
        <h1 className="max-w-[1320px] text-[clamp(1.35rem,4vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-black">
          <span className="relative inline-block font-black">
            <span className="relative z-10">Organize</span>
            <span
              aria-hidden="true"
              className="absolute bottom-[0.11em] left-[0.02em] z-0 h-[0.15em] w-[102%] rounded-[6px] bg-[#f3bfd2]"
            />
          </span>{" "}
          everything
          <br />
          in your{" "}
          <span className="font-semibold text-[#8eaedd]">
            life
          </span>
        </h1>

        <Link
          href="/pricing"
          className="mt-7 inline-flex h-[41px] w-full max-w-[290px] items-center justify-center rounded-full bg-black px-5 text-[clamp(0.75rem,1.15vw,1.55rem)] font-medium text-white shadow-[0_14px_22px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111111]"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

const memberVisuals = [
  { key: "top-left", className: "left-[8%] top-0 h-20 w-20 md:h-28 md:w-28" },
  { key: "bottom-left", className: "left-[20%] bottom-2 h-16 w-16 md:h-24 md:w-24" },
  { key: "top-mid-left", className: "left-[42%] top-3 h-8 w-8 md:h-10 md:w-10" },
  { key: "top-mid-right", className: "right-[30%] top-7 h-7 w-7 md:h-8 md:w-8" },
  { key: "top-right", className: "right-[8%] top-0 h-20 w-20 md:h-28 md:w-28" },
  { key: "bottom-right", className: "right-[18%] bottom-5 h-14 w-14 md:h-20 md:w-20" },
] as const;

function MemberHappinessSection() {
  return (
    <section className="bg-white px-4 py-12 font-sans sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="relative mx-auto flex min-h-[320px] items-center justify-center md:min-h-[400px]">
          {memberVisuals.map((item) => (
            <div key={item.key} className={`absolute ${item.className}`}>
              <Image
                src="/icon.svg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 80px, 128px"
                className="rounded-full object-cover"
              />
            </div>
          ))}

          <h2 className="relative z-10 mx-auto max-w-[980px] px-4 text-center text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#2f2f32] sm:text-5xl lg:text-7xl">
            Members are enjoying happier and healthier lives
          </h2>
        </div>
      </div>
    </section>
  );
}

function MarketingFooter() {
  return (
    <footer className="bg-[#eef2f3] font-sans text-[#46525e]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-3xl font-semibold tracking-tight text-[#1f2a37]">
              Doable
            </p>
            <p className="mt-4 text-xl font-medium text-[#22303d]">
              Turn ideas into daily action.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#5b6672]">
              Learn faster with structured summaries, audio learning, and
              focused execution tools.
            </p>
            <Link
              href="/pricing"
              className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-[#22303d] opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              Start your free 7-day trial today
            </Link>
            <p className="mt-4 text-sm text-[#5b6672]">support@doable.app</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-[#1f1f1f] px-5 py-3 text-sm font-medium text-white opacity-90 transition-opacity duration-200 hover:opacity-100"
              >
                App Store
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-[#1f1f1f] px-5 py-3 text-sm font-medium text-white opacity-90 transition-opacity duration-200 hover:opacity-100"
              >
                Google Play
              </Link>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-3">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-base font-semibold text-[#1f2a37]">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#5b6672] opacity-80 transition-opacity duration-200 hover:opacity-100"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="text-base font-semibold text-[#1f2a37]">
                Join thousands building better habits with Doable
              </h4>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-sm text-[#5b6672] opacity-80 transition-opacity duration-200 hover:opacity-100"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-300/80 pt-6">
          <div className="flex flex-col gap-3 text-sm text-[#5b6672] md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 Doable Technologies Pvt Ltd &mdash; All rights reserved</p>
            <p className="opacity-90">
              <Link
                href="#"
                className="transition-opacity duration-200 hover:opacity-100"
              >
                Sitemap
              </Link>{" "}
              |{" "}
              <Link
                href="#"
                className="transition-opacity duration-200 hover:opacity-100"
              >
                Legal Notice
              </Link>{" "}
              |{" "}
              <Link
                href="#"
                className="transition-opacity duration-200 hover:opacity-100"
              >
                Accessibility
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />

        <CategoryCardsSection />

        <PlainBlocksCarouselSection />

        <MemberHappinessSection />

        <ReviewCarouselSection />

        <InsightsSection />

        <section className="bg-white px-4 py-12 sm:px-6 sm:py-14">
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

        <MarketingFooter />
      </main>
    </>
  );
}

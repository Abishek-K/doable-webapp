import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram } from "lucide-react";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

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
      { label: "FAQ", href: "#faq" },
      { label: "Help center", href: "mailto:hustlemindsco@gmail.com" },
      { label: "Contact support", href: "mailto:hustlemindsco@gmail.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Doable", href: "/about" },
      { label: "Careers", href: "mailto:hustlemindsco@gmail.com" },
      { label: "Affiliate program", href: "mailto:hustlemindsco@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
            { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Subscription & Refund Policy", href: "/subscription-policy-and-refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function MarketingFooter() {
  return (
    <footer className="bg-[#eef2f3] px-6 font-sans text-[#46525e] lg:px-12">
      <div className="mx-auto w-full max-w-[1440px] pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/doable-logo-transparent-2048.png"
                alt="Doable Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-3xl font-semibold tracking-tight text-[#1f2a37]">
                Doable
              </span>
            </Link>
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

            <div className="mt-8 flex flex-wrap gap-3">
              {/* <Link
                href="/"
                className="opacity-90 transition-opacity duration-200 hover:opacity-100"
              >
                <Image
                  src="/images/apple-app-store-badge.webp"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
              </Link> */}
              <Link
                href="/"
                className="opacity-90 transition-opacity duration-200 hover:opacity-100"
              >
                <Image
                  src="/images/google-play-store-badge.webp"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
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
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="text-[#101114] opacity-80 transition-opacity duration-200 hover:opacity-100"
                    >
                      <Icon className="h-6 w-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-300/80 pt-6">
          <div className="flex flex-col gap-3 text-sm text-[#5b6672] md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p>&copy; Doable 2026 &mdash; All rights reserved</p>
              <span className="hidden md:inline text-slate-300">|</span>
              <a href="mailto:hustlemindsco@gmail.com" className="hover:text-[#46525e] transition-colors">hustlemindsco@gmail.com</a>
            </div>
            <p className="opacity-90">
              <Link
                href="/"
                className="transition-opacity duration-200 hover:opacity-100"
              >
                Sitemap
              </Link>{" "}
              |{" "}
              <Link
                href="/legal-notice"
                className="transition-opacity duration-200 hover:opacity-100"
              >
                Legal Notice
              </Link>{" "}
              |{" "}
              <Link
                href="/accessibility"
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

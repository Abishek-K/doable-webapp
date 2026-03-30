import Link from "next/link";

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
            { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Subscription & Refund Policy", href: "/subscription-policy-and-refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function MarketingFooter() {
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

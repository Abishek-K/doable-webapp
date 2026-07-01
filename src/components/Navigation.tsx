"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavigationProps {
  showBackButton?: boolean;
  isAuthenticated?: boolean;
}

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
] as const;

export default function Navigation({
  showBackButton = false,
  isAuthenticated = false,
}: NavigationProps) {
  const pathname = usePathname();
  const rightTextLink = { href: "/login", label: "Log in" };
  void isAuthenticated;

  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showBanner && (
        <aside className="relative flex h-[58px] w-full items-center justify-center bg-[#f4c400] px-4 font-sans">
          <Link
            href="/pricing"
            className="text-center text-base font-semibold text-[#1f1f1f] transition-opacity duration-200 hover:underline hover:opacity-90"
          >
            Start your free 7-day trial today.
          </Link>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
            className="absolute right-4 p-1 text-[#1f1f1f] opacity-70 transition-opacity hover:opacity-100 sm:right-6 lg:right-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </aside>
      )}

      <div className="sticky top-0 z-50 w-full font-sans">
        <header
          className={`w-full bg-white transition-shadow duration-300 ${
            scrolled
              ? "shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
              : "border-b border-slate-200"
          }`}
        >
        <div className="flex h-20 w-full items-center justify-between px-6 font-sans lg:px-12">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/doable-logo-transparent-2048.png"
                alt="Doable Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                Doable
              </span>
            </Link>

            {!showBackButton && (
              <nav
                aria-label="Main navigation"
                className="hidden items-center gap-8 lg:flex"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base transition-colors hover:text-slate-900 ${
                        isActive
                          ? "font-medium text-slate-900"
                          : "font-normal text-slate-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {showBackButton ? (
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Back to Home
            </Link>
          ) : (
            <>
              <div className="hidden items-center gap-6 lg:flex">
                <Link
                  href={rightTextLink.href}
                  className="text-base font-medium text-slate-800 transition hover:text-slate-950"
                >
                  {rightTextLink.label}
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] px-6 py-2.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1765cc]"
                >
                  Try for free
                </Link>
              </div>

              <details className="relative lg:hidden">
                <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                  <span className="sr-only">Toggle navigation menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </summary>

                <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                  <nav aria-label="Mobile navigation" className="flex flex-col">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-slate-50 ${
                            isActive
                              ? "font-semibold text-slate-900"
                              : "font-medium text-slate-700"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                    <div className="my-2 h-px bg-slate-200" />
                    <Link
                      href={rightTextLink.href}
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 transition-colors hover:bg-slate-50"
                    >
                      {rightTextLink.label}
                    </Link>
                    <Link
                      href="/signup"
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1765cc]"
                    >
                      Try for free
                    </Link>
                  </nav>
                </div>
              </details>
            </>
          )}
        </div>
      </header>
    </div>
    </>
  );
}

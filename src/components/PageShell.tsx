"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import MarketingFooter from "@/components/MarketingFooter";

const excludedExactPaths = [
  "/login",
  "/signup",
  "/dashboard",
  "/about",
  "/pricing",
  "/explore",
  "/blogs",
  "/admin-debug",
];

const excludedPrefixPaths = [
  "/admin",
  "/blogs/",
  "/books/",
  "/collections/",
];

function shouldRenderShell(pathname: string | null) {
  if (!pathname) return true;
  if (excludedExactPaths.includes(pathname)) return false;
  return !excludedPrefixPaths.some((prefix) => pathname.startsWith(prefix));
}

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showShell = shouldRenderShell(pathname);

  return (
    <>
      {showShell && <Navigation />}
      {children}
      {showShell && <MarketingFooter />}
    </>
  );
}

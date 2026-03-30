import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In — Doable",
  description:
    "Log in to your Doable account to continue your daily learning missions, track progress, and explore your book summary library.",
  openGraph: {
    title: "Log In — Doable",
    description:
      "Log in to your Doable account to continue your daily learning missions and track your progress.",
    url: "https://www.doable.app/login",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

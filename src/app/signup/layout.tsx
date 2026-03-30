import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Account — Doable",
  description:
    "Sign up for Doable and start turning world-class books into 10-minute daily missions. Free to get started — no credit card required.",
  openGraph: {
    title: "Create Your Free Account — Doable",
    description:
      "Join Doable and start turning world-class books into 10-minute daily missions. Free to get started.",
    url: "https://www.doable.app/signup",
    type: "website",
  },
  twitter: {
    title: "Create Your Free Account — Doable",
    description:
      "Join Doable and start turning world-class books into 10-minute daily missions.",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

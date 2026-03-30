import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Doable",
  description:
    "Your personal Doable dashboard. Track your learning progress, manage your subscription, and pick up where you left off.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

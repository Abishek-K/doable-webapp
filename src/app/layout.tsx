import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../hooks/useAuth";
import PageShell from "@/components/PageShell";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Doable — Turn Books Into Daily Action",
    template: "%s | Doable",
  },
  description:
    "Doable transforms world-class books into 10-minute actionable missions. Build stronger habits, sharper focus, and better routines — one insight at a time.",
  keywords: [
    "book summaries",
    "actionable learning",
    "productivity app",
    "habit building",
    "self improvement",
    "daily missions",
    "non-fiction summaries",
  ],
  metadataBase: new URL("https://www.doable.app"),
  openGraph: {
    siteName: "Doable",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@doableapp",
  },
  icons: {
    icon: [
      { url: "/images/doable-logo-transparent-2048.png", type: "image/png" },
    ],
    shortcut: "/images/doable-logo-transparent-2048.png",
    apple: "/images/doable-logo-transparent-2048.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <PageShell>{children}</PageShell>
        </AuthProvider>
      </body>
    </html>
  );
}

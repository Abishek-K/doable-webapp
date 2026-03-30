"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type AdminGateState = "checking" | "allowed" | "blocked";

const sidebarLinks = [
  { label: "Books", href: "/admin/books" },
  { label: "Create Book", href: "/admin/create" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Create Blog", href: "/admin/blogs/create" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [gateState, setGateState] = useState<AdminGateState>("checking");

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setGateState("blocked");
      router.replace("/");
      return;
    }

    let cancelled = false;
    const verifyAdmin = async () => {
      try {
        const tokenResult = await user.getIdTokenResult(true);
        if (cancelled) return;

        if (tokenResult.claims.admin === true) {
          setGateState("allowed");
        } else {
          setGateState("blocked");
          router.replace("/");
        }
      } catch (error) {
        console.error("[admin/layout] failed to verify admin claim", error);
        if (!cancelled) {
          setGateState("blocked");
          router.replace("/");
        }
      }
    };

    verifyAdmin();
    return () => {
      cancelled = true;
    };
  }, [loading, user, router]);

  if (gateState !== "allowed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
          Checking admin access...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500">
            Admin Panel
          </h2>
          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          {children}
        </section>
      </div>
    </div>
  );
}

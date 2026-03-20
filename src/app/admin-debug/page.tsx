"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";

type DebugResult = {
  user: {
    uid: string;
    email: string | null;
  } | null;
  clientClaims: Record<string, unknown> | null;
  clientAdminClaim: boolean;
  clientIssuedAt: string | null;
  clientExpiresAt: string | null;
  firestoreUserDocExists: boolean | null;
  firestoreUserRole: string | null;
  serverVerified: boolean | null;
  serverAdminClaim: boolean | null;
  serverRole: string | null;
  error: string | null;
};

function prettyJson(data: unknown) {
  return JSON.stringify(data, null, 2);
}

export default function AdminDebugPage() {
  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<DebugResult>({
    user: null,
    clientClaims: null,
    clientAdminClaim: false,
    clientIssuedAt: null,
    clientExpiresAt: null,
    firestoreUserDocExists: null,
    firestoreUserRole: null,
    serverVerified: null,
    serverAdminClaim: null,
    serverRole: null,
    error: null,
  });

  const runCheck = useCallback(
    async (forceRefreshToken: boolean) => {
      if (!user) {
        setResult({
          user: null,
          clientClaims: null,
          clientAdminClaim: false,
          clientIssuedAt: null,
          clientExpiresAt: null,
          firestoreUserDocExists: null,
          firestoreUserRole: null,
          serverVerified: null,
          serverAdminClaim: null,
          serverRole: null,
          error: "You are not logged in.",
        });
        return;
      }

      try {
        setChecking(true);

        const tokenResult = await user.getIdTokenResult(forceRefreshToken);
        const userDocSnap = await getDoc(doc(db, "users", user.uid));

        const response = await fetch("/api/admin/debug", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
        });

        const serverPayload = (await response.json()) as {
          success?: boolean;
          error?: string;
          data?: {
            isAdminClaim?: boolean;
            firestoreUserRole?: string | null;
          };
        };

        const serverVerified = response.ok && serverPayload.success === true;
        setResult({
          user: {
            uid: user.uid,
            email: user.email,
          },
          clientClaims: tokenResult.claims,
          clientAdminClaim: tokenResult.claims.admin === true,
          clientIssuedAt: tokenResult.issuedAtTime,
          clientExpiresAt: tokenResult.expirationTime,
          firestoreUserDocExists: userDocSnap.exists(),
          firestoreUserRole: userDocSnap.exists()
            ? (userDocSnap.data()?.role as string | undefined) ?? null
            : null,
          serverVerified,
          serverAdminClaim: serverPayload.data?.isAdminClaim ?? null,
          serverRole: serverPayload.data?.firestoreUserRole ?? null,
          error: serverVerified ? null : serverPayload.error ?? "Server verification failed.",
        });
      } catch (error) {
        console.error("[admin-debug] check failed", error);
        setResult((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : "Unexpected debug error occurred.",
        }));
      } finally {
        setChecking(false);
      }
    },
    [user]
  );

  useEffect(() => {
    if (loading) return;
    runCheck(false);
  }, [loading, runCheck]);

  const diagnosis = useMemo(() => {
    if (!user) return "Login required. Go to /login first.";
    if (!result.clientAdminClaim) {
      return "Client token does not contain admin:true. Custom claim is missing or token not refreshed.";
    }
    if (result.clientAdminClaim && result.serverAdminClaim === false) {
      return "Client and server claim mismatch. Refresh token and retry login.";
    }
    if (result.clientAdminClaim && result.serverAdminClaim) {
      return "Admin claim looks correct. You should be able to access /admin/books.";
    }
    return "Run refresh check to diagnose.";
  }, [result.clientAdminClaim, result.serverAdminClaim, user]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Admin Debug
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Validate custom claims and admin portal access state.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/books"
              className="inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Go to Admin
            </Link>
            <button
              type="button"
              onClick={() => runCheck(true)}
              disabled={checking || loading}
              className="inline-flex h-9 items-center rounded-md bg-slate-900 px-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checking ? "Checking..." : "Refresh Token & Recheck"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Diagnosis
          </h2>
          <p className="mt-2 text-sm text-slate-800">{diagnosis}</p>
          {result.error ? (
            <p className="mt-2 text-sm font-medium text-red-700">{result.error}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Client Auth
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>
                <span className="font-semibold">UID:</span>{" "}
                {result.user?.uid ?? "—"}
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                {result.user?.email ?? "—"}
              </li>
              <li>
                <span className="font-semibold">admin claim:</span>{" "}
                {String(result.clientAdminClaim)}
              </li>
              <li>
                <span className="font-semibold">Issued:</span>{" "}
                {result.clientIssuedAt ?? "—"}
              </li>
              <li>
                <span className="font-semibold">Expires:</span>{" "}
                {result.clientExpiresAt ?? "—"}
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Firestore User Doc
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>
                <span className="font-semibold">Exists:</span>{" "}
                {String(result.firestoreUserDocExists)}
              </li>
              <li>
                <span className="font-semibold">role:</span>{" "}
                {result.firestoreUserRole ?? "—"}
              </li>
              <li className="pt-2 text-xs text-slate-500">
                Note: Admin layout checks custom claim, not Firestore role.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Server Verification
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-3">
              <li>
                <span className="font-semibold">Verified:</span>{" "}
                {String(result.serverVerified)}
              </li>
              <li>
                <span className="font-semibold">admin claim:</span>{" "}
                {String(result.serverAdminClaim)}
              </li>
              <li>
                <span className="font-semibold">server role:</span>{" "}
                {result.serverRole ?? "—"}
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Raw Client Claims
          </h3>
          <pre className="mt-3 max-h-[360px] overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
            {prettyJson(result.clientClaims)}
          </pre>
        </div>
      </div>
    </main>
  );
}

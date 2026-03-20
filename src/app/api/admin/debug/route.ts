import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonError("Missing authorization token.", 401);
    }

    const idToken = authHeader.slice("Bearer ".length).trim();
    const decodedToken = await adminAuth().verifyIdToken(idToken, true);
    const userDoc = await adminDb().collection("users").doc(decodedToken.uid).get();

    return NextResponse.json({
      success: true,
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email ?? null,
        claims: decodedToken,
        isAdminClaim: decodedToken.admin === true,
        firestoreUserDocExists: userDoc.exists,
        firestoreUserRole: userDoc.exists ? userDoc.data()?.role ?? null : null,
      },
    });
  } catch (error) {
    console.error("[api/admin/debug] verification error", error);
    return jsonError("Failed to verify token.", 500);
  }
}

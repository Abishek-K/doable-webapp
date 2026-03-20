import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/firebase/admin';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const auth = getAdminAuth();
    const db = getAdminDb();

    const { email, password } = await req.json();

    const userRecord = await auth.createUser({
      email,
      password,
    });

    const userDoc = db.collection('users').doc(userRecord.uid);
    await userDoc.set({
      email: email,
      role: "user",
      stripeId: null,
      subscriptionId: null,
      subscriptionStatus: null,
      createdAt: Date.now()
    });

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during registration' },
      { status: 400 }
    );
  }
}

import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const uid = process.argv[2];
if (!uid) {
  throw new Error("Usage: node --env-file=.env.local scripts/set-admin-claim.mjs <UID>");
}

await getAuth(app).setCustomUserClaims(uid, { admin: true });
const user = await getAuth(app).getUser(uid);
console.log("Updated custom claims:", user.customClaims);

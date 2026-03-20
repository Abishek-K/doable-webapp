import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyAbTT5HaJ09vU_fCCvra1xFHWnEnwEAcw4",
  authDomain: "doable-webapp.firebaseapp.com",
  projectId: "doable-webapp",
  storageBucket: "doable-webapp.firebasestorage.app",
  messagingSenderId: "849752174111",
  appId: "1:849752174111:web:caacffe4e9846b04a16f2a",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
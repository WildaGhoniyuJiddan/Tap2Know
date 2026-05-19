import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "tap2know-e3755.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "tap2know-e3755",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "tap2know-e3755.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "946167511084",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:946167511084:web:1db839eb09d6661ac2b989"
};

// Initialize Firebase (mencegah inisialisasi ganda)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Synthetic email helper — converts username to internal Firebase Auth email
export const toSyntheticEmail = (username: string) => `${username.toLowerCase()}@tap2know.id`;

export { signInWithCustomToken, signInWithEmailAndPassword, signOut };
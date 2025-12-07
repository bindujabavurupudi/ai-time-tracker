import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 REPLACE THESE VALUES WITH YOUR OWN FROM FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDPE9DablVNOr95SdrrUG8R7DejZSrRld0",
  authDomain: "ai-time-tracker-ec0d2.firebaseapp.com",
  projectId: "ai-time-tracker-ec0d2",
  storageBucket: "ai-time-tracker-ec0d2.firebasestorage.app",
  messagingSenderId: "370025836726",
  appId: "1:370025836726:web:65a83b1eaae9fa45cd3617"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth, DB, and Google Provider
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

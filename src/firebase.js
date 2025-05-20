import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjY8-iTdHAiwocrKDMS-uSFm5i3vY3Hg4",
  authDomain: "mi-app-login-454dd.firebaseapp.com",
  projectId: "mi-app-login-454dd",
  storageBucket: "mi-app-login-454dd.firebasestorage.app",
  messagingSenderId: "922079627591",
  appId: "1:922079627591:web:a1c1eb96fb84a16be12462"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

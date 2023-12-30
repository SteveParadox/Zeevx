import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXYWZzVmpSFKDyNvfcZ-V91I_poXlHJA4",
  authDomain: "zeevx-90c48.firebaseapp.com",
  projectId: "zeevx-90c48",
  storageBucket: "zeevx-90c48.appspot.com",
  messagingSenderId: "714618924637",
  appId: "1:714618924637:web:a9a4deff16f123ccf2a7b4",
  measurementId: "G-HNZRHSLPTX"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };

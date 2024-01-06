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

const App = initializeApp(firebaseConfig);
const analytics = getAnalytics(App);
const FirebaseAuth = getAuth(App);
const provider = new GoogleAuthProvider();

export { FirebaseAuth, provider };

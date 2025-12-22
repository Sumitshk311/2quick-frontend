import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAi7KGDLU9QXt2elTHiJxgHddZC56_jIno",
  authDomain: "quick-3477f.firebaseapp.com",
  projectId: "quick-3477f",
  storageBucket: "quick-3477f.appspot.com",
  messagingSenderId: "1009305318998",
  appId: "1:1009305318998:web:a7275d022faf84b8ef6df7",
  measurementId: "G-573D15E221"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, analytics };

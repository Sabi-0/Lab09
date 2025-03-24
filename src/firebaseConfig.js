import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcvqYz733cspudYZa_albxduZrhlEN3XQ",
  authDomain: "ykro-sandbox.firebaseapp.com",
  projectId: "ykro-sandbox",
  storageBucket: "ykro-sandbox.firebasestorage.app",
  messagingSenderId: "761465028213",
  appId: "1:761465028213:web:f29f836235f5569bf2423c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

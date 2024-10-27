import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUlUUVyX7G1Fnpq10Dw56bPyNLT8xSVCA",
  authDomain: "boiler-dorms.firebaseapp.com",
  projectId: "boiler-dorms",
  storageBucket: "boiler-dorms.appspot.com",
  messagingSenderId: "866464735986",
  appId: "1:866464735986:web:ba0f20bfd9e344189e666b",
  measurementId: "G-94D37MBPJ1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
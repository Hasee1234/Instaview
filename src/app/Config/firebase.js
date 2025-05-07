import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCYTjowAzqL4v9afwxtDvfG7zgHuNh77E4",
  authDomain: "instaview-10e82.firebaseapp.com",
  projectId: "instaview-10e82",
  storageBucket: "instaview-10e82.firebasestorage.app",
  messagingSenderId: "569392071891",
  appId: "1:569392071891:web:0bc8ca92436d8bc73e0026",
  measurementId: "G-FD542TQ1GS"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)
export const auth=getAuth(app)
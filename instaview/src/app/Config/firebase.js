import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYTjowAzqL4v9afwxtDvfG7zgHuNh77E4",
  authDomain: "instaview-10e82.firebaseapp.com",
  projectId: "instaview-10e82",
  storageBucket: "instaview-10e82.firebasestorage.app",
  messagingSenderId: "569392071891",
  appId: "1:569392071891:web:0bc8ca92436d8bc73e0026",
  measurementId: "G-FD542TQ1GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)
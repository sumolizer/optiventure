// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0oJgD2ykU4NXEq1DyfV5kFGTsKOu6QI0",
  authDomain: "optiventure-54919.firebaseapp.com",
  projectId: "optiventure-54919",
  storageBucket: "optiventure-54919.firebasestorage.app",
  messagingSenderId: "624482937613",
  appId: "1:624482937613:web:2bfe1c5c91732e63671e44",
  measurementId: "G-K5J30RX5NE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzVKF0JcPlPv2ktD0M5CyBZXImOmYK3A0",
  authDomain: "movie-library-web.firebaseapp.com",
  projectId: "movie-library-web",
  storageBucket: "movie-library-web.appspot.com",
  messagingSenderId: "702449085614",
  appId: "1:702449085614:web:d0bd0c41ae4ad4983a513f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
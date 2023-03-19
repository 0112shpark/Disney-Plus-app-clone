// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO_g20Q0vQk4jHwL8VEicH1j4NRbpg1vQ",
  authDomain: "react-disney-plus-app-196b2.firebaseapp.com",
  projectId: "react-disney-plus-app-196b2",
  storageBucket: "react-disney-plus-app-196b2.appspot.com",
  messagingSenderId: "819557160590",
  appId: "1:819557160590:web:c0c294356ef354d5cb9bdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

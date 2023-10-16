// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1bG8RG8vhH_G8O9AmSSIrFKIuTN6Ppm4",
  authDomain: "othlanding.firebaseapp.com",
  databaseURL: "https://othlanding-default-rtdb.firebaseio.com",
  projectId: "othlanding",
  storageBucket: "othlanding.appspot.com",
  messagingSenderId: "516659795219",
  appId: "1:516659795219:web:42201a6485e2fc873336e6",
  measurementId: "G-J7SBTGESD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
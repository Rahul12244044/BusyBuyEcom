// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPecvFEdlzr_sKDWSg1owRaO_jVwOKrGw",
  authDomain: "reduxbusybuy.firebaseapp.com",
  projectId: "reduxbusybuy",
  storageBucket: "reduxbusybuy.firebasestorage.app",
  messagingSenderId: "614921704716",
  appId: "1:614921704716:web:1c456abf4edca0414de529",
  measurementId: "G-2TZ1T6SHSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getFirestore();
export default db;
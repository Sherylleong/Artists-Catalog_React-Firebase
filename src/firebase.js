// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHZhnhGjjFHZx5SL1m2Sfp7cS360ZeY_0",
  authDomain: "vascatalogue.firebaseapp.com",
  projectId: "vascatalogue",
  storageBucket: "vascatalogue.appspot.com",
  messagingSenderId: "1068851407821",
  appId: "1:1068851407821:web:0ef595eecabbe8fa1cb284",
  measurementId: "G-3V1YPEKE09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};
export const storage = getStorage(app);
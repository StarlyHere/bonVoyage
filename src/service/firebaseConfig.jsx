// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxCsyWLVyxWCkYaY2BAfPVdSUVhRhIt5k",
  authDomain: "travel-planner-8a6df.firebaseapp.com",
  projectId: "travel-planner-8a6df",
  storageBucket: "travel-planner-8a6df.firebasestorage.app",
  messagingSenderId: "334284025317",
  appId: "1:334284025317:web:73410fb35c3d151fe6530c",
  measurementId: "G-T6VQY8DVRH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
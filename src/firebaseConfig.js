// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZs9J72s_YQhtGQJU3B69VQYuRfMnh18I",
    authDomain: "task-manager-42eb0.firebaseapp.com",
    databaseURL: "https://task-manager-42eb0-default-rtdb.firebaseio.com",
    projectId: "task-manager-42eb0",
    storageBucket: "task-manager-42eb0.firebasestorage.app",
    messagingSenderId: "210252950184",
    appId: "1:210252950184:web:d19318a0aad99c4001309d",
    measurementId: "G-820ZLX1452"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
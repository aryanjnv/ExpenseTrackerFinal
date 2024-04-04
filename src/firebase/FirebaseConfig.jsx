// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkAt3QMRrKPqkJpl7LNnFh7icac2hS0xU",
  authDomain: "expensesh-ef202.firebaseapp.com",
  projectId: "expensesh-ef202",
  storageBucket: "expensesh-ef202.appspot.com",
  messagingSenderId: "637415732417",
  appId: "1:637415732417:web:f23b407467cb14b43ed040"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const database = getDatabase(app);
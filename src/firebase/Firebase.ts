// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDiaYE9ovPubDezjt_E9yjTObVKCRuXaUo",

  authDomain: "rent-a-thing-87258.firebaseapp.com",

  projectId: "rent-a-thing-87258",

  storageBucket: "rent-a-thing-87258.appspot.com",

  messagingSenderId: "1029853980537",

  appId: "1:1029853980537:web:84bc30a8bc51ad9f8cf1a8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

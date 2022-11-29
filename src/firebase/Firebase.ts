// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDkzuD17ZVReO8GqskdK5Uw35ktHlQofL0',
  authDomain: 'rent-a-thing-91c42.firebaseapp.com',
  projectId: 'rent-a-thing-91c42',
  storageBucket: 'rent-a-thing-91c42.appspot.com',
  messagingSenderId: '117537224066',
  appId: '1:117537224066:web:79962770fc1ac5c6e74b9b',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

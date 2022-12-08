// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBR6Me9ah43zhtoQqriLq-8r_RNzGyzLzw',
  authDomain: 'rent-a-thing-3.firebaseapp.com',
  projectId: 'rent-a-thing-3',
  storageBucket: 'rent-a-thing-3.appspot.com',
  messagingSenderId: '362117846980',
  appId: '1:362117846980:web:47a4757cf1593459c7f691',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

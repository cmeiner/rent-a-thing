// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAjAeh3P8fV2nZ1h56rYZdEWHibRhh1Qzc',
  authDomain: 'rent-a-thing-2.firebaseapp.com',
  projectId: 'rent-a-thing-2',
  storageBucket: 'rent-a-thing-2.appspot.com',
  messagingSenderId: '756905740631',
  appId: '1:756905740631:web:3b98414b356abeb6a31612',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

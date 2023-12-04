// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_DOMAIN_KEY,
  projectId: 'mern-estate',
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_KEY,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

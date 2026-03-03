// Firebase initialization will be added here.
// Use environment variables for config and export auth, firestore, and storage instances.
// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQi1s-gqWt1IFrMYAI4iAQywOd1XAh6pQ',
  authDomain: 'seedit-d8663.firebaseapp.com',
  projectId: 'seedit-d8663',
  storageBucket: 'seedit-d8663.firebasestorage.app',
  messagingSenderId: '548547878621',
  appId: '1:548547878621:web:5a12657e9afe531afb8534',
  measurementId: "G-2JG1XW10QC"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);


// 🔹 Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

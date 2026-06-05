import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSXzKgTAZL0A2hb1mcOoS-iEZB0Ot55iw",
  authDomain: "rideandread-876f9.firebaseapp.com",
  projectId: "rideandread-876f9",
  storageBucket: "rideandread-876f9.firebasestorage.app",
  messagingSenderId: "1068340167829",
  appId: "1:1068340167829:web:3be96344c00a3006e6c79c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

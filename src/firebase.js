// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfdbDeWLAApNYv624b5r0MOnHUnzAM7NA",
  authDomain: "todoapp-55446.firebaseapp.com",
  projectId: "todoapp-55446",
  storageBucket: "todoapp-55446.appspot.com",
  messagingSenderId: "992622009574",
  appId: "1:992622009574:web:19aa5d18d67eb8b0b7af27",
  measurementId: "G-NBXLDXKMED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
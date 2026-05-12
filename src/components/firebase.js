import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRZVgN1Tsg5BexrlWTeR45-ul9cwirMjY",
  authDomain: "titan-hosting-bffb6.firebaseapp.com",
  projectId: "titan-hosting-bffb6",
  storageBucket: "titan-hosting-bffb6.firebasestorage.app",
  messagingSenderId: "254132690920",
  appId: "1:254132690920:web:7015d61fae1f6b3d060e5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services taaki components mein use ho sakein
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;


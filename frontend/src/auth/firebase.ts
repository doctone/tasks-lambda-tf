import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBq2opKCe3SecLcDRkeDbng1YWZO8eFMZs",
  authDomain: "task-manager-a6daf.firebaseapp.com",
  projectId: "task-manager-a6daf",
  storageBucket: "task-manager-a6daf.firebasestorage.app",
  messagingSenderId: "1070943901021",
  appId: "1:1070943901021:web:a765b7766de120f03a44b4",
});

export const firebaseAuth = getAuth(app);
export default app;

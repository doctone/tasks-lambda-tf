import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase/config";

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export default app;

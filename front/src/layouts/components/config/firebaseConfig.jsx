import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQNQZja2mElcj5KKYjbtsGsARxWHGPTVg",
  authDomain: "lqvalentino.firebaseapp.com",
  projectId: "lqvalentino",
  storageBucket: "lqvalentino.appspot.com",
  messagingSenderId: "140072978980",
  appId: "1:140072978980:web:be64db69408b59d831e6b1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const initFirestore = getFirestore(app);
const initStorage = getStorage(app);
 export default app;


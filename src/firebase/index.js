import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfyXkeFOSHntnY46coadMzEwHXdfvQwhg",
  authDomain: "practice-six.firebaseapp.com",
  projectId: "practice-six",
  storageBucket: "practice-six.appspot.com",
  messagingSenderId: "378242484741",
  appId: "1:378242484741:web:f2d496bb8ef8bc3ef66a6c",
  measurementId: "G-HFXMW50YWQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

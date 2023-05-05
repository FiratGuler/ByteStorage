import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvA2GKtIYSeAi3ZLgCzTkXnZNftLiggJs",
  authDomain: "bytestorage-4f161.firebaseapp.com",
  projectId: "bytestorage-4f161",
  storageBucket: "bytestorage-4f161.appspot.com",
  messagingSenderId: "651092798279",
  appId: "1:651092798279:web:aa455ae0cd85fb6711ba62"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db 
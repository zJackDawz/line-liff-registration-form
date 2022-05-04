import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Add your Firebase Configuration here.
};

const app = initializeApp(firebaseConfig);

export default getFirestore();

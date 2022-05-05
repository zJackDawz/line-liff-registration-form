import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf5B_22EiUGGR-HX9g0W_SKjUXT3F46TA",
  authDomain: "bestcareline-7e95e.firebaseapp.com",
  databaseURL: "https://bestcareline-7e95e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bestcareline-7e95e",
  storageBucket: "bestcareline-7e95e.appspot.com",
  messagingSenderId: "432779792138",
  appId: "1:432779792138:web:4f37121119bc95d38ef4f3",
  measurementId: "G-VMFLP9GP4E"
};

const app = initializeApp(firebaseConfig);

export default getFirestore();

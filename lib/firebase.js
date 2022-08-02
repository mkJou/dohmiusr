import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHjbaHRmlHGPzZt-99Yk2Y1SmYhwGoGSQ",
  authDomain: "dohmiusr.firebaseapp.com",
  projectId: "dohmiusr",
  storageBucket: "dohmiusr.appspot.com",
  messagingSenderId: "81484010552",
  appId: "1:81484010552:web:f99bf1cd710fc3d17dc2cd",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLzwmwB2BA5owgZm6gATn6elsBzrpCRVU",
  authDomain: "cyebermangement.firebaseapp.com",
  projectId: "cyebermangement",
  storageBucket: "cyebermangement.appspot.com",
  messagingSenderId: "905877341068",
  appId: "1:905877341068:web:afabe6613e7ceea86fcca9",
  measurementId: "G-EQY0E1G6V1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

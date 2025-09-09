import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyB2D-1LleiF29iO4YMIm-fl2ESdQT8t4qQ",
  authDomain: "gameradar-649eb.firebaseapp.com",
  projectId: "gameradar-649eb",
  storageBucket: "gameradar-649eb.appspot.com",
  messagingSenderId: "1041759240370",
  appId: "1:1041759240370:web:42aad3f3ed206cd8ad09ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
const db = getFirestore(app);
const auth = getAuth(app);

import { setPersistence, browserLocalPersistence } from "firebase/auth";

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Erreur de persistance :", error);
});

export { db, auth };


// Code fait avec l'aide du tuto sur Firebase
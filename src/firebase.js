// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD5lGst2PlN_gvsXu-ttIDR_yezdbSmkfc",
  authDomain: "aardvik-60ea1.firebaseapp.com",
  projectId: "aardvik-60ea1",
  storageBucket: "aardvik-60ea1.appspot.com",
  messagingSenderId: "820192623514",
  appId: "1:820192623514:web:2d31ee5e229eb3b8b11823",
  measurementId: "G-P7ZG050L9P",
  databaseURL: "https://aardvik-60ea1-default-rtdb.firebaseio.com/"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
export const db = getDatabase(app);

// No need to call goOffline() or goOnline(), Firebase handles syncing automatically
export const auth = getAuth(app);
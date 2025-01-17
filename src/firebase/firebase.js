// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBRZjlhMDGjs7NnroxIOCe7VvhRJjBQewQ",
  authDomain: "instagram-clone-7e559.firebaseapp.com",
  projectId: "instagram-clone-7e559",
  storageBucket: "instagram-clone-7e559.firebasestorage.app",
  messagingSenderId: "824334738097",
  appId: "1:824334738097:web:702d0a2e96e1e38ff7b890",
  measurementId: "G-TYDCLD1GXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, auth, storage, firestore};
// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC01hqMzfCH7BD_aA8jui4vCV11m2dwFRA",
    authDomain: "hardware-hub-chat.firebaseapp.com",
    projectId: "hardware-hub-chat",
    storageBucket: "hardware-hub-chat.firebasestorage.app",
    messagingSenderId: "248911084902",
    appId: "1:248911084902:web:a4dbc0435d1cb51cc7dca7",
    measurementId: "G-0N8TTJZ8QQ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db };

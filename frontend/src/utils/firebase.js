import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyDLKcsrrOurJCserOSmmsCLc11Q4K37iH4",
    authDomain: "nextwork-f2484.firebaseapp.com",
    projectId: "nextwork-f2484",
    storageBucket: "nextwork-f2484.firebasestorage.app",
    messagingSenderId: "1012980291990",
    appId: "1:1012980291990:web:9de28b786ff88732a865b7",
    measurementId: "G-98FM635LYL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
    new GoogleAuthProvider();
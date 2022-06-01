//FIREBASE: pour authtifier & gérer les utilisateurs sans code coté serveur

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlTuVRCM7x8LStkURY-JcLsIW3L8xWGhw",
    authDomain: "blogprojectreact-70003.firebaseapp.com",
    projectId: "blogprojectreact-70003",
    storageBucket: "blogprojectreact-70003.appspot.com",
    messagingSenderId: "544029532376",
    appId: "1:544029532376:web:41d4800201392ed9fcf7ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
//gérer la config de l'authentification Google via Firebase
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
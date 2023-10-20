// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHvdzbgdC0zdTni1zavxQtrmHRe757jAg",
    authDomain: "imagine-app-2146f.firebaseapp.com",
    projectId: "imagine-app-2146f",
    storageBucket: "imagine-app-2146f.appspot.com",
    messagingSenderId: "300705523884",
    appId: "1:300705523884:web:a101deabb1e77ed505d709",
    measurementId: "G-WJDQB1TFHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)

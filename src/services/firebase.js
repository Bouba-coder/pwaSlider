import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAg6n1n4PxoGQl4LxQ4C99j2Mi7OxxVRcg",
    authDomain: "pwa-firebase-e1679.firebaseapp.com",
    databaseURL: "https://pwa-firebase-e1679-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pwa-firebase-e1679",
    storageBucket: "pwa-firebase-e1679.appspot.com",
    messagingSenderId: "797355236587",
    appId: "1:797355236587:web:b934ae57f1618c0fbf72ae",
    measurementId: "G-PFSVY1P5EJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
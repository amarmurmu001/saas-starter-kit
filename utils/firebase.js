import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC8tjPjbtiOYpkmBDP3psTn7GsroF_-St0",
    authDomain: "saas-starter-kit-31379.firebaseapp.com",
    projectId: "saas-starter-kit-31379",
    storageBucket: "saas-starter-kit-31379.firebasestorage.app",
    messagingSenderId: "219745430374",
    appId: "1:219745430374:web:b575868ca63f0c290276a7",
    measurementId: "G-7T248K8BPV"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

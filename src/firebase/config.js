import app from "firebase/app"
import firebase from "firebase";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyClCaIpGHHiZ9Cwc3RRHEoD-t3zDsXI0fE",
  authDomain: "pi-grupo5-prog3.firebaseapp.com",
  projectId: "pi-grupo5-prog3",
  storageBucket: "pi-grupo5-prog3.firebasestorage.app",
  messagingSenderId: "1085240492489",
  appId: "1:1085240492489:web:93395f004c83093362e818"
};

const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

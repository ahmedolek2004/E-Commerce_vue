// firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDECeB9L31lpjmaSBt6Y8dZirjvpPkGfLE",
  authDomain: "vue-project-year-one.firebaseapp.com",
  projectId: "vue-project-year-one",
  storageBucket: "vue-project-year-one.firebasestorage.app",
  messagingSenderId: "778186375642",
  appId: "1:778186375642:web:e02921e111bb23750c00e3"
};
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)


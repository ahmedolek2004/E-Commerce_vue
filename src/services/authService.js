// authService.js
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"


// تسجيل جديد + تخزين بيانات في Firestore
export const register = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // تخزين بيانات إضافية في Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    createdAt: new Date()
  })

  return user
}

// تسجيل دخول
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

// تسجيل خروج
export const logout = () => signOut(auth)

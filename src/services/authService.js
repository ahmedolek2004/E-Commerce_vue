import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"

// تسجيل جديد + تخزين بيانات في Firestore
export const register = async (name, email, password, role = "user") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    createdAt: new Date()
  })

  return user
}

// تسجيل دخول
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

// تسجيل خروج
export const logout = () => signOut(auth)

// تعديل مستخدم
export const updateUser = async (uid, newData) => {
  await updateDoc(doc(db, "users", uid), newData)
}

// حذف مستخدم
export const deleteUser = async (uid) => {
  await deleteDoc(doc(db, "users", uid))
}

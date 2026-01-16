import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const ADMIN_EMAILS = ['admin@example.com', 'ahmed@example.com', 'test@test.com']

export const isAdminEmail = (email) => ADMIN_EMAILS.includes(email)

export const checkAdminRole = async (user) => {
  if (!user) return false
  
  if (isAdminEmail(user.email)) {
    return true
  }
  
  try {
    const snap = await getDoc(doc(db, "users", user.uid))
    return snap.exists() && snap.data().role === "admin"
  } catch (error) {
    console.error("Error checking admin role:", error)
    return false
  }
}

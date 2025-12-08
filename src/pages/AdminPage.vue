<template>
  <div class="container py-5">
    <h2 class="mb-4">Admin Dashboard</h2>

    <!-- Add user -->
    <div class="mb-4">
      <h4 class="mb-3">Add New User</h4>
      <div class="row g-2">
        <div class="col-md-4">
          <input v-model="newName" type="text" placeholder="Name" class="form-control" />
        </div>
        <div class="col-md-4">
          <input v-model="newEmail" type="email" placeholder="Email" class="form-control" />
        </div>
        <div class="col-md-3">
          <select v-model="newRole" class="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="col-md-1 d-grid">
          <button @click="addUser" class="btn btn-primary">Add</button>
        </div>
      </div>
      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-success mt-2">{{ successMsg }}</p>
    </div>

    <!-- Users table -->
    <div v-if="users.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style="width:200px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name || '-' }}</td>
            <td>{{ user.email || '-' }}</td>
            <td>
              <span class="badge" :class="user.role === 'admin' ? 'bg-success' : 'bg-secondary'">
                {{ user.role || 'user' }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <button @click="makeAdmin(user.id)" class="btn btn-sm btn-warning">Make Admin</button>
                <button @click="removeUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-muted">No users found or loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "../firebase"
// تأكد إن المسار ده صحيح حسب مشروعك
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

const users = ref([])
const newName = ref("")
const newEmail = ref("")
const newRole = ref("user")

const errorMsg = ref("")
const successMsg = ref("")

const clearMessages = () => {
  errorMsg.value = ""
  successMsg.value = ""
}

const fetchUsers = async () => {
  clearMessages()
  try {
    const querySnapshot = await getDocs(collection(db, "users"))
    users.value = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    console.log("Users fetched:", users.value)
  } catch (error) {
    console.error("Error fetching users:", error)
    errorMsg.value = "Failed to fetch users. Check Firestore rules and network."
  }
}

const addUser = async () => {
  clearMessages()
  try {
    if (!newName.value.trim() || !newEmail.value.trim()) {
      errorMsg.value = "Please fill in name and email."
      return
    }
    await addDoc(collection(db, "users"), {
      name: newName.value.trim(),
      email: newEmail.value.trim(),
      role: newRole.value,
      createdAt: serverTimestamp(),
    })
    successMsg.value = "User added successfully."
    newName.value = ""
    newEmail.value = ""
    newRole.value = "user"
    await fetchUsers()
  } catch (error) {
    console.error("Error adding user:", error)
    errorMsg.value = error.message || "Failed to add user."
  }
}

const makeAdmin = async (uid) => {
  clearMessages()
  try {
    await updateDoc(doc(db, "users", uid), { role: "admin" })
    successMsg.value = "Role updated to admin."
    await fetchUsers()
  } catch (error) {
    console.error("Error updating role:", error)
    errorMsg.value = error.message || "Failed to update role."
  }
}

const removeUser = async (uid) => {
  clearMessages()
  try {
    await deleteDoc(doc(db, "users", uid))
    successMsg.value = "User deleted."
    await fetchUsers()
  } catch (error) {
    console.error("Error deleting user:", error)
    errorMsg.value = error.message || "Failed to delete user."
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

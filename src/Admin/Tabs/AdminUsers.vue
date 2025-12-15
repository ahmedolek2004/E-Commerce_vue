<template>
  <section class="admin-users">

    <!--  Add User Form -->
    <div class="card user-form">
      <h4>Add New User</h4>

      <form @submit.prevent="addUser">
        <div class="form-row">
          <input v-model="newName" class="form-input" placeholder="Name" />
          <input v-model="newEmail" class="form-input" placeholder="Email" />
          <select v-model="newRole" class="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>

    <!--  Users Table -->
    <div class="card user-table">
      <h4>All Users</h4>

      <div class="table-scroll">
        <table class="styled-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>
                <span :class="['role-badge', u.role === 'admin' ? 'admin' : 'user']">
                  {{ u.role }}
                </span>
              </td>
              <td>
                <button class="btn btn-warning btn-sm" @click="startUserEdit(u)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="removeUser(u.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--  Edit User Form -->
    <div v-if="editingUser" class="card user-form">
      <h4>Edit User</h4>

      <div class="form-row">
        <input v-model="editUserName" class="form-input" placeholder="Name" />
        <input v-model="editUserEmail" class="form-input" placeholder="Email" />
        <select v-model="editUserRole" class="form-select">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button class="btn btn-success" @click="saveUserEdit">Save</button>
        <button class="btn btn-secondary" @click="cancelUserEdit">Cancel</button>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "../../firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

const users = ref([])
const newName = ref("")
const newEmail = ref("")
const newRole = ref("user")

const editingUser = ref(null)
const editUserName = ref("")
const editUserEmail = ref("")
const editUserRole = ref("user")

const fetchUsers = () => {
  onSnapshot(collection(db, "users"), (snap) => {
    users.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

const addUser = async () => {
  await addDoc(collection(db, "users"), {
    name: newName.value,
    email: newEmail.value,
    role: newRole.value,
    createdAt: serverTimestamp(),
  })

  newName.value = ""
  newEmail.value = ""
  newRole.value = "user"
}

const startUserEdit = (u) => {
  editingUser.value = u.id
  editUserName.value = u.name
  editUserEmail.value = u.email
  editUserRole.value = u.role
}

const saveUserEdit = async () => {
  await updateDoc(doc(db, "users", editingUser.value), {
    name: editUserName.value,
    email: editUserEmail.value,
    role: editUserRole.value,
  })
  editingUser.value = null
}

const cancelUserEdit = () => {
  editingUser.value = null
}

const removeUser = async (id) => {
  await deleteDoc(doc(db, "users", id))
}

onMounted(fetchUsers)
</script>

<style scoped>
.admin-users {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/*  Card Style */
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}

/*  Form Layout */
.user-form h4 {
  margin-bottom: 15px;
  font-weight: 600;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-input,
.form-select {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/*  Table Layout */
.user-table h4 {
  margin-bottom: 15px;
  font-weight: 600;
}

.table-scroll {
  overflow-x: auto;
  max-height: 70vh;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.styled-table thead {
  background: #343a40;
  color: white;
}

.role-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.role-badge.admin {
  background: #198754;
  color: white;
}

.role-badge.user {
  background: #6c757d;
  color: white;
}

/*  Buttons */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary {
  background: #0d6efd;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: black;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-success {
  background: #198754;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}
</style>

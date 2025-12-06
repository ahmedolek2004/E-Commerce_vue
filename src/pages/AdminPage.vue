<template>
  <div class="container py-5">
    <h2 class="mb-4">Admin Dashboard</h2>

    <!-- بيانات المستخدم الحالي -->
    <table class="table table-striped" v-if="currentUserData">
      <thead>
        <tr>
          <th>UID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentUserData.id }}</td>
          <td>{{ currentUserData.name }}</td>
          <td>{{ currentUserData.email }}</td>
          <td>{{ currentUserData.createdAt?.toDate().toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">
      No user logged in.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { auth, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

const currentUserData = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // جلب بيانات المستخدم من Firestore
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        currentUserData.value = {
          id: user.uid,
          ...docSnap.data()
        }
      }
    } else {
      currentUserData.value = null
    }
  })
})
</script>

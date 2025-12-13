<template>
  <div class="row g-4">

    <div class="col-md-3">
      <div class="card p-4 shadow-sm text-center">
        <h5 class="fw-bold">Users</h5>
        <h2 class="text-primary">{{ usersCount }}</h2>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card p-4 shadow-sm text-center">
        <h5 class="fw-bold">Products</h5>
        <h2 class="text-success">{{ productsCount }}</h2>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card p-4 shadow-sm text-center">
        <h5 class="fw-bold">Categories</h5>
        <h2 class="text-warning">{{ categoriesCount }}</h2>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card p-4 shadow-sm text-center">
        <h5 class="fw-bold">Deals</h5>
        <h2 class="text-danger">{{ dealsCount }}</h2>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "../../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const usersCount = ref(0)
const productsCount = ref(0)
const categoriesCount = ref(0)
const dealsCount = ref(0)

onMounted(() => {
  onSnapshot(collection(db, "users"), snap => usersCount.value = snap.size)
  onSnapshot(collection(db, "products"), snap => productsCount.value = snap.size)
  onSnapshot(collection(db, "categories"), snap => categoriesCount.value = snap.size)
  onSnapshot(collection(db, "deals"), snap => dealsCount.value = snap.size)
})
</script>

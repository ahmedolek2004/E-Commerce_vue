<template>
  <div class="container py-5">
    <h1 class="mb-4">Categories</h1>

    <div v-if="categories.length === 0" class="alert alert-info">
      No categories available.
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="c in categories" :key="c.id">
        <div class="card h-100 shadow-sm">
          <img :src="c.image" class="card-img-top" :alt="c.name" />

          <div class="card-body">
            <h5 class="card-title">{{ c.name }}</h5>
            <p class="text-muted">{{ c.description }}</p>

            <RouterLink :to="`/categories/${c.id}`" class="btn btn-primary btn-sm">
              View Products
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const categories = ref([])

onMounted(() => {
  onSnapshot(collection(db, "categories"), (snapshot) => {
    categories.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})
</script>

<style scoped>
.card-img-top {
  height: 220px;
  object-fit: cover;
}
</style>

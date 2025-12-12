<template>
  <div class="container py-5">
    <h1 class="mb-4">Our Products</h1>

    <div v-if="products.length === 0" class="alert alert-info">
      No products available.
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="p in products" :key="p.id">
        <div class="card h-100 shadow-sm">
          <img :src="p.img" class="card-img-top" />

          <div class="card-body">
            <h5 class="card-title">{{ p.title }}</h5>
            <p class="text-muted">{{ p.desc }}</p>
            <p class="fw-bold">{{ p.price }} EGP</p>

            <RouterLink :to="`/products/${p.id}`" class="btn btn-primary btn-sm">
              View Details
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

const products = ref([])

onMounted(() => {
  onSnapshot(collection(db, "products"), (snapshot) => {
    products.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})
</script>

<style scoped>
.card-img-top {
  height: 240px;
  object-fit: cover;
}
</style>

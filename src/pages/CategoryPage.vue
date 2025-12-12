<template>
  <div class="container py-5">

    <h2 class="mb-4">{{ category?.name }}</h2>
    <p class="text-muted">{{ category?.description }}</p>

    <hr />

    <h4 class="mb-3">Products</h4>

    <div v-if="products.length === 0" class="alert alert-warning">
      No products in this category.
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
import { useRoute, RouterLink } from "vue-router"
import { db } from "../firebase"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"

const route = useRoute()
const categoryId = route.params.id

const category = ref(null)
const products = ref([])

onMounted(async () => {
  // ✅ Load category info
  const catRef = doc(db, "categories", categoryId)
  const catSnap = await getDoc(catRef)

  if (catSnap.exists()) {
    category.value = { id: catSnap.id, ...catSnap.data() }
  }

  // ✅ Load products in this category
  const q = query(collection(db, "products"), where("categoryId", "==", categoryId))
  const snap = await getDocs(q)

  products.value = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})
</script>

<style scoped>
.card-img-top {
  height: 220px;
  object-fit: cover;
}
</style>

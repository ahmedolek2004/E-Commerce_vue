<template>
  <div class="container py-5">
    <h3 class="mb-4">Search Results for: "{{ query }}"</h3>

    <div v-if="filteredProducts.length === 0" class="alert alert-warning">
      No products found.
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" v-for="p in filteredProducts" :key="p.id">
        <div class="card h-100 shadow-sm">
          <img :src="p.img" class="card-img-top" />
          <div class="card-body">
            <h6 class="card-title">{{ p.title }}</h6>
            <p class="text-muted small">{{ p.desc }}</p>
            <p class="fw-bold">{{ formatCurrency(p.price) }} EGP</p>
            <RouterLink :to="'/products/' + p.id" class="btn btn-primary btn-sm">
              View
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

// ✅ Route
const route = useRoute()

// ✅ Search query (dynamic)
const query = ref(route.query.query?.toLowerCase() || "")

// ✅ Watch for changes in URL search
watch(
  () => route.query.query,
  (newVal) => {
    query.value = newVal?.toLowerCase() || ""
  }
)

// ✅ Products
const products = ref([])

// ✅ Load from Firestore
onMounted(() => {
  onSnapshot(collection(db, "products"), (snapshot) => {
    products.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})

// ✅ Filtered results
const filteredProducts = computed(() => {
  if (!query.value) return []
  return products.value.filter(p =>
    p.title?.toLowerCase().includes(query.value) ||
    p.desc?.toLowerCase().includes(query.value)
  )
})

// ✅ Format price
const formatCurrency = (value) => `${value.toFixed(2)} EGP`
</script>

<style scoped>
.card-img-top {
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}
.card {
  border-radius: 10px;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
}
</style>

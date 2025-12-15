<template>
  <div class="container py-5">
    <h1 class="mb-4">Our Products</h1>


    <!-- ✅ No products -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info">
      No products found.
    </div>

    <!-- ✅ Products -->
    <div class="row">
     <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" v-for="p in products" :key="p.id">
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
import { ref, computed, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const products = ref([])

// ✅ Filters
const searchName = ref("")
const minPrice = ref("")
const maxPrice = ref("")
const selectedCategory = ref("")

// ✅ Extract categories dynamically
const categories = ref([])

onMounted(() => {
  onSnapshot(collection(db, "products"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    products.value = data

    // ✅ Get unique categories
    categories.value = [...new Set(data.map(p => p.categoryName))]
  })
})

// ✅ Computed filtered products
const filteredProducts = computed(() => {
  return products.value.filter(p => {

    // Filter by name
    if (searchName.value && !p.title.toLowerCase().includes(searchName.value.toLowerCase())) {
      return false
    }

    // Filter by min price
    if (minPrice.value && p.price < minPrice.value) {
      return false
    }

    // Filter by max price
    if (maxPrice.value && p.price > maxPrice.value) {
      return false
    }

    // Filter by category
    if (selectedCategory.value && p.categoryName !== selectedCategory.value) {
      return false
    }

    return true
  })
})



</script>

<style scoped>
  .product-card {
  transition: 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

</style>

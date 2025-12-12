<template>
  <div class="container py-5">
    <h3 class="mb-4">Search Results for: "{{ query }}"</h3>

    <div v-if="filteredProducts.length === 0" class="text-muted">
      No products found.
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" v-for="p in filteredProducts" :key="p.id">
        <div class="card h-100 shadow-sm">
          <img :src="p.img" class="card-img-top" />
          <div class="card-body">
            <h6 class="card-title">{{ p.title }}</h6>
            <p class="text-muted small">{{ p.desc }}</p>
            <p class="fw-bold">{{ p.price }} EGP</p>
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
import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const query = route.query.query?.toLowerCase() || ""

// ✅ منتجات تجريبية (بدلها بمنتجات Firestore لو عندك)
const products = ref([
  { id: 1, title: "Smart Watch", desc: "Latest model", price: 1200, img: "https://via.placeholder.com/300" },
  { id: 2, title: "Headphones", desc: "Noise cancelling", price: 800, img: "https://via.placeholder.com/300" },
  { id: 3, title: "Laptop", desc: "High performance", price: 15000, img: "https://via.placeholder.com/300" },
  { id: 4, title: "Shoes", desc: "Comfortable", price: 500, img: "https://via.placeholder.com/300" },
])

// ✅ فلترة المنتجات حسب كلمة البحث
const filteredProducts = computed(() =>
  products.value.filter((p) =>
    p.title.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  )
)
</script>

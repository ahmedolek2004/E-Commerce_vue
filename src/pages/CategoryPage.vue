<template>
  <div class="container py-5">
    <h1 class="mb-4">Category: {{ categoryName }}</h1>

    <!-- لو مفيش منتجات -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info">
      No products found in this category.
    </div>

    <!-- شبكة المنتجات -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in filteredProducts" :key="product.id">
        <div class="card h-100 shadow-sm">
          <img :src="product.image" class="card-img-top" :alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted">{{ product.description }}</p>
            <p class="fw-bold">{{ formatCurrency(product.price) }}</p>
            <RouterLink
              :to="`/products/${product.id}`"
              class="btn btn-primary btn-sm"
            >
              View Details
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
import { RouterLink } from "vue-router"

const route = useRoute()

// بيانات تجريبية للمنتجات
const products = ref([
  { id: "p1", name: "Smartphone", description: "Latest Android phone", price: 299.99, image: "/images/electronics.webp", category: "electronics" },
  { id: "p2", name: "Laptop", description: "Powerful laptop for work", price: 899.99, image: "/images/electronics.webp", category: "electronics" },
  { id: "p3", name: "T-Shirt", description: "Comfortable cotton shirt", price: 19.99, image: "/images/fashion.webp", category: "fashion" },
  { id: "p4", name: "Sneakers", description: "Stylish running shoes", price: 59.99, image: "/images/fashion.webp", category: "fashion" },
  { id: "p5", name: "Coffee Maker", description: "Automatic coffee machine", price: 129.99, image: "/images/Home & Garden.webp", category: "home" },
])

// تصفية المنتجات حسب الـ id من الـ route
const filteredProducts = computed(() =>
  products.value.filter((p) => p.category === route.params.id)
)

// اسم التصنيف (ممكن تجيبه من قاعدة بيانات أو ثابت)
const categoryName = computed(() => {
  const map = {
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home & Kitchen",
  }
  return map[route.params.id] || "Unknown"
})

// تنسيق السعر
const formatCurrency = (value) => `$${value.toFixed(2)}`
</script>

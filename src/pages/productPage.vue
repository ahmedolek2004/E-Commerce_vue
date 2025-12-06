<template>
  <div class="container py-5">
    <div v-if="product" class="row">
      <!-- صورة المنتج -->
      <div class="col-md-6">
        <img :src="product.image" class="img-fluid rounded shadow-sm" :alt="product.name" />
      </div>

      <!-- تفاصيل المنتج -->
      <div class="col-md-6">
        <h1>{{ product.name }}</h1>
        <p class="text-muted">{{ product.description }}</p>
        <h3 class="text-primary">{{ formatCurrency(product.price) }}</h3>

        <div class="mt-4">
          <button class="btn btn-success me-2" @click="addToCart(product)">
            Add to Cart
          </button>
          <RouterLink to="/products" class="btn btn-outline-secondary">
            Back to Products
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- لو المنتج مش موجود -->
    <div v-else class="alert alert-danger">
      Product not found.
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
  {
    id: "p1",
    name: "Product 1",
    description: "This is a great product.",
    price: 99.99,
    image: "/images/1.webp",
  },
  {
    id: "p2",
    name: "Product 2",
    description: "Another amazing product.",
    price: 149.99,
    image: "/images/2.webp",
  },
  {
    id: "p3",
    name: "Product 3",
    description: "High quality and affordable.",
    price: 199.99,
    image: "/images/3.webp",
  },
])

// الحصول على المنتج بناءً على الـ id من الـ route
const product = computed(() =>
  products.value.find((p) => p.id === route.params.id)
)

// إضافة للسلة (مبدئيًا مجرد console.log)
const addToCart = (product) => {
  console.log("Added to cart:", product)
  alert(`${product.name} added to cart!`)
}

// تنسيق السعر
const formatCurrency = (value) => `$${value.toFixed(2)}`
</script>

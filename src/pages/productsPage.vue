<template>
  <div class="container py-5">
    <h1 class="mb-4">Our Products</h1>

    <!-- لو مفيش منتجات -->
    <div v-if="products.length === 0" class="alert alert-info">
      No products available.
    </div>

    <!-- شبكة المنتجات -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
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
            <button
              class="btn btn-success btn-sm ms-2"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"

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
    image: "/images/1.webp",
  },
  {
    id: "p3",
    name: "Product 3",
    description: "High quality and affordable.",
    price: 199.99,
    image: "/images/1.webp",
  },
   {
    id: "p4",
    name: "Product 4",
    description: "This is a great product.",
    price: 99.99,
    image: "/images/1.webp",
  },
  {
    id: "p5",
    name: "Product 5",
    description: "Another amazing product.",
    price: 149.99,
    image: "/images/1.webp",
  },
  {
    id: "p6",
    name: "Product 6",
    description: "High quality and affordable.",
    price: 199.99,
    image: "/images/1.webp",
  },
   {
    id: "p7",
    name: "Product 7",
    description: "This is a great product.",
    price: 99.99,
    image: "/images/1.webp",
  },
  {
    id: "p8",
    name: "Product 8",
    description: "Another amazing product.",
    price: 149.99,
    image: "/images/1.webp",
  },
  {
    id: "p9",
    name: "Product 9",
    description: "High quality and affordable.",
    price: 199.99,
    image: "/images/1.webp",
  },
])

// إضافة للسلة (مبدئيًا مجرد console.log)
const addToCart = (product) => {
  console.log("Added to cart:", product)
  alert(`${product.name} added to cart!`)
}

// تنسيق السعر
const formatCurrency = (value) => `$${value.toFixed(2)}`
</script>

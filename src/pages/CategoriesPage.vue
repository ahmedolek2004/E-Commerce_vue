<template>
  <div class="container py-5">
    <h1 class="mb-4">Categories</h1>

    <!-- لو مفيش تصنيفات -->
    <div v-if="categories.length === 0" class="alert alert-info">
      No categories available.
    </div>

    <!-- شبكة التصنيفات -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="category in categories" :key="category.id">
        <div class="card h-100 shadow-sm">
          <img :src="category.image" class="card-img-top" :alt="category.name" />
          <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
            <p class="card-text text-muted">{{ category.description }}</p>
            <RouterLink
              :to="`/categories/${category.id}`"
              class="btn btn-primary btn-sm"
            >
              View Products
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"

// بيانات تجريبية للتصنيفات
const categories = ref([
  {
    id: "c1",
    name: "Electronics",
    description: "Smartphones, laptops, and gadgets.",
    image: "/images/electronics.webp",
  },
  {
    id: "c2",
    name: "Fashion",
    description: "Clothing, shoes, and accessories.",
    image: "/images/fashion.webp",
  },
  {
    id: "c3",
    name: "Home & Kitchen",
    description: "Furniture, appliances, and decor.",
    image: "/images/Home & Garden.webp",
  },
  {
    id: "c4",
    name: "Book",
    description: "",
    image: "/images/book.webp",
  },
  {
    id: "c3",
    name: "Sports & Outdoors",
    description: ".",
    image: "/images/Toys & Games.webp",
  },
  {
    id: "c3",
    name: "Toys & Games",
    description: ".",
    image: "/images/Sports & Outdoors.webp",
  },
])
</script>

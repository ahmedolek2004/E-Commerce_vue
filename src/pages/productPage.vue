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
import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const products = ref([])

onMounted(async () => {
  const snap = await getDocs(collection(db, "products"))
  products.value = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})

</script>

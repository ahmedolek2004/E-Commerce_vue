<template>
  <div class="container py-5">

    <div v-if="product" class="row">

      <div class="col-md-6 mb-4">
        <img :src="product.img" class="img-fluid rounded shadow-sm product-image" />
      </div>

      <div class="col-md-6">
        <h2 class="fw-bold">{{ product.title }}</h2>
        <p class="text-muted">{{ product.desc }}</p>

        <h3 class="text-primary fw-bold">{{ product.price }} EGP</h3>

        <div class="mt-4">
          <button class="btn btn-success me-2" @click="cartStore.addToCart(product)">
            Add to Cart
          </button>

          <RouterLink to="/products" class="btn btn-outline-secondary">
            Back to Products
          </RouterLink>
        </div>
      </div>

    </div>

    <div v-else class="alert alert-danger text-center">
      Product not found.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const cartStore = useCartStore()
const route = useRoute()
const productId = route.params.id

const product = ref(null)

onMounted(async () => {
  const docRef = doc(db, "products", productId)
  const snap = await getDoc(docRef)

  if (snap.exists()) {
    product.value = { id: snap.id, ...snap.data() }
  } else {
    product.value = null
  }
})
</script>

<style scoped>
.product-image {
  max-height: 420px;
  object-fit: cover;
  border-radius: 12px;
}
</style>

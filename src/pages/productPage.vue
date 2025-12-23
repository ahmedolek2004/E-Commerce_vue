<template>
  <div class="container py-5">
    <!-- Loading State -->
    <div v-if="!product && !error" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading product details...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="error || !product" class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-exclamation-triangle display-1 text-danger"></i>
      </div>
      <h3 class="fw-semibold text-danger mb-3">Product Not Found</h3>
      <p class="text-muted mb-4">The product you're looking for doesn't exist or has been removed.</p>
      <RouterLink to="/products" class="btn btn-primary">
        <i class="bi bi-arrow-left me-2"></i>Back to Products
      </RouterLink>
    </div>

    <!-- Product Details -->
    <div v-else class="row g-5">
      <!-- Product Images -->
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="product-image-container p-3 bg-light">
            <img
              :src="product.img || '/placeholder.jpg'"
              :alt="product.title"
              class="img-fluid w-100 product-main-image"
              @error="handleImageError"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="col-lg-5">
        <div class="d-flex flex-column h-100">
          <!-- Category Badge -->
          <div class="mb-3">
            <span class="badge bg-primary fs-6">
              {{ product.categoryName || 'Uncategorized' }}
            </span>
          </div>

          <!-- Product Title -->
          <h1 class="fw-bold mb-3">{{ product.title }}</h1>

          <!-- Product Description -->
          <div class="mb-4">
            <h5 class="text-muted mb-2">Description</h5>
            <p class="lead" style="line-height: 1.8;">{{ product.desc }}</p>
          </div>

          <!-- Price -->
          <div class="mb-4">
            <h5 class="text-muted mb-2">Price</h5>
            <div class="d-flex align-items-center">
              <span class="display-5 fw-bold text-primary me-3">
                {{ formatPrice(product.price) }} EGP
              </span>
              <span v-if="product.originalPrice" class="text-decoration-line-through text-muted">
                {{ formatPrice(product.originalPrice) }} EGP
              </span>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="mb-4">
            <span class="badge bg-success fs-6">
              <i class="bi bi-check-circle me-1"></i>In Stock
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="mt-auto">
            <div class="d-grid gap-3">
              <button
                class="btn btn-primary btn-lg py-3 fw-semibold"
                @click="handleAddToCart"
              >
                <i class="bi bi-cart-plus me-2"></i>Add to Cart
              </button>

              <div class="d-flex gap-3">
                <RouterLink to="/products" class="btn btn-outline-secondary flex-fill">
                  <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                </RouterLink>

                <button
                  class="btn btn-outline-success flex-fill"
                  @click="handleBuyNow"
                >
                  <i class="bi bi-bag-check me-2"></i>Buy Now
                </button>
              </div>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="mt-5 pt-4 border-top">
            <div class="row text-center">
              <div class="col-4">
                <div class="text-muted mb-2">
                  <i class="bi bi-truck fs-4"></i>
                </div>
                <small class="d-block">Free Shipping</small>
              </div>
              <div class="col-4">
                <div class="text-muted mb-2">
                  <i class="bi bi-arrow-counterclockwise fs-4"></i>
                </div>
                <small class="d-block">30-Day Returns</small>
              </div>
              <div class="col-4">
                <div class="text-muted mb-2">
                  <i class="bi bi-shield-check fs-4"></i>
                </div>
                <small class="d-block">Secure Payment</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, RouterLink, useRouter } from "vue-router"
import { useCartStore } from "../stores/cart"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const productId = route.params.id

const product = ref(null)
const error = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc(db, "products", productId)
    const snap = await getDoc(docRef)

    if (snap.exists()) {
      product.value = { id: snap.id, ...snap.data() }
    } else {
      error.value = true
    }
  } catch (err) {
    console.error("Error fetching product:", err)
    error.value = true
  } finally {
    loading.value = false
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EG').format(price || 0)
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/800x600?text=Product+Image'
}

const handleAddToCart = () => {
  if (!product.value) return

  cartStore.addToCart(product.value)

  // Show success feedback (you can use a toast notification here)
  const button = event?.target
  if (button) {
    const originalText = button.innerHTML
    button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added to Cart'
    button.classList.remove('btn-primary')
    button.classList.add('btn-success')

    setTimeout(() => {
      button.innerHTML = originalText
      button.classList.remove('btn-success')
      button.classList.add('btn-primary')
    }, 2000)
  }
}

const handleBuyNow = () => {
  if (!product.value) return

  cartStore.addToCart(product.value)
  router.push('/checkout')
}
</script>

<style scoped>
.product-main-image {
  height: 500px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-main-image:hover {
  transform: scale(1.02);
}

.product-image-container {
  border-radius: 12px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .product-main-image {
    height: 400px;
  }

  .product-image-container {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .product-main-image {
    height: 350px;
  }

  .product-image-container {
    min-height: 350px;
  }

  .display-5 {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .product-main-image {
    height: 300px;
  }

  .product-image-container {
    min-height: 300px;
  }
}

/* Loading animation */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Smooth transitions */
.product-image-container {
  transition: background-color 0.3s ease;
}

.btn {
  transition: all 0.3s ease;
}
</style>

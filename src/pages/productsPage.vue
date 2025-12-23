<template>
  <div class="container py-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5">
      <div>
        <h1 class="fw-bold text-dark mb-2">Our Products</h1>
        <p class="text-muted">{{ filteredProducts.length }} products available</p>
      </div>

      <!-- Search and Filters -->
      <div class="d-flex flex-wrap gap-3 mt-3 mt-md-0">
        <div class="input-group" style="min-width: 250px;">
          <span class="input-group-text bg-light border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Search products..."
            v-model="searchName"
          >
        </div>

        <select class="form-select" style="width: auto;" v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Price Range Filters -->
    <div class="row mb-4">
      <div class="col-md-6 col-lg-3 mb-3">
        <label class="form-label text-muted small">Min Price</label>
        <div class="input-group">
          <span class="input-group-text">EGP</span>
          <input
            type="number"
            class="form-control"
            placeholder="0"
            min="0"
            v-model="minPrice"
          >
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <label class="form-label text-muted small">Max Price</label>
        <div class="input-group">
          <span class="input-group-text">EGP</span>
          <input
            type="number"
            class="form-control"
            placeholder="10000"
            min="0"
            v-model="maxPrice"
          >
        </div>
      </div>
    </div>

    <!-- No products message -->
    <div v-if="filteredProducts.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-search display-1 text-muted opacity-50"></i>
      </div>
      <h3 class="fw-semibold text-muted mb-3">No products found</h3>
      <p class="text-muted mb-4">Try adjusting your search or filter criteria</p>
      <button class="btn btn-outline-primary" @click="clearFilters">
        <i class="bi bi-arrow-counterclockwise me-2"></i>Clear Filters
      </button>
    </div>

    <!-- Products Grid -->
    <div class="row g-4">
      <div
        class="col-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="(p, index) in filteredProducts"
        :key="p.id"
      >
        <div class="card h-100 product-card border-0 shadow-sm overflow-hidden">
          <!-- Product Image with fixed aspect ratio -->
          <div class="product-image-wrapper position-relative">
            <img
              :src="p.img || '/placeholder-image.jpg'"
              :alt="p.title"
              class="card-img-top product-image"
              loading="lazy"
              @error="handleImageError"
            />
            <div class="product-badge" v-if="p.categoryName">
              <span class="badge bg-primary">{{ p.categoryName }}</span>
            </div>
            <!-- Quick Add to Cart Button -->
            <button
              class="btn btn-primary btn-sm quick-add-btn"
              @click.stop="addToCart(p)"
              :title="`Add ${p.title} to cart`"
            >
              <i class="bi bi-cart-plus"></i>
              <span class="ms-1">Add to Cart</span>
            </button>
          </div>

          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-semibold text-dark mb-2">
              {{ p.title }}
            </h5>

            <!-- Description with expand/collapse -->
            <div class="description-wrapper mb-3">
              <p
                class="card-text text-muted small mb-2 description-text"
                :class="{ 'expanded': expandedDescriptions[index] }"
              >
                {{ p.desc }}
              </p>
              <button
                v-if="shouldShowReadMore(p.desc)"
                class="btn btn-link btn-sm text-decoration-none p-0 read-more-btn"
                @click="toggleDescription(index)"
              >
                {{ expandedDescriptions[index] ? 'Show Less' : 'Read More' }}
                <i class="bi ms-1" :class="expandedDescriptions[index] ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
              </button>
            </div>

            <!-- Price -->
            <div class="d-flex align-items-center justify-content-between mt-auto">
              <div>
                <span class="h5 fw-bold text-primary mb-0 d-block">
                  {{ formatPrice(p.price) }} EGP
                </span>
                <small class="text-muted" v-if="p.stock">
                  {{ p.stock }} in stock
                </small>
              </div>
              <div class="d-flex gap-2">
                <RouterLink
                  :to="`/products/${p.id}`"
                  class="btn btn-outline-primary btn-sm"
                  title="View product details"
                >
                  <i class="bi bi-eye me-1"></i>Details
                </RouterLink>
                <!-- Mobile Add to Cart Button -->
                <button
                  class="btn btn-primary btn-sm d-md-none"
                  @click="addToCart(p)"
                  title="Add to cart"
                >
                  <i class="bi bi-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/global.css";
import { ref, computed, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const cartStore = useCartStore()
const products = ref([])
const searchName = ref("")
const minPrice = ref("")
const maxPrice = ref("")
const selectedCategory = ref("")
const categories = ref([])
const expandedDescriptions = ref({})

onMounted(() => {
  onSnapshot(collection(db, "products"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    products.value = data
    categories.value = [...new Set(data.map(p => p.categoryName).filter(Boolean))]

    // Initialize expanded state
    data.forEach((_, index) => {
      expandedDescriptions.value[index] = false
    })
  })
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    if (searchName.value && !p.title?.toLowerCase().includes(searchName.value.toLowerCase())) {
      return false
    }

    const price = Number(p.price) || 0
    if (minPrice.value && price < Number(minPrice.value)) {
      return false
    }

    if (maxPrice.value && price > Number(maxPrice.value)) {
      return false
    }

    if (selectedCategory.value && p.categoryName !== selectedCategory.value) {
      return false
    }

    return true
  })
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EG').format(price || 0)
}

const clearFilters = () => {
  searchName.value = ""
  minPrice.value = ""
  maxPrice.value = ""
  selectedCategory.value = ""
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
}

const addToCart = (product) => {
  cartStore.addToCart({
    id: product.id,
    name: product.title,
    priceValue: product.price,
    image: product.img,
    quantity: 1
  })

  // Show notification
  showNotification(`${product.title} added to cart!`)
}

const showNotification = (message) => {
  // Create temporary notification
  const notification = document.createElement('div')
  notification.className = 'position-fixed top-0 end-0 m-4 p-3 bg-success text-white rounded shadow-lg z-3'
  notification.style.zIndex = '1050'
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="bi bi-check-circle-fill me-2"></i>
      <span>${message}</span>
    </div>
  `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

const shouldShowReadMore = (description) => {
  if (!description) return false
  // Check if description is longer than 100 characters
  return description.length > 100
}

const toggleDescription = (index) => {
  expandedDescriptions.value[index] = !expandedDescriptions.value[index]
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.quick-add-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  background: rgba(13, 110, 253, 0.95);
  border: none;
}

.product-card:hover .quick-add-btn {
  opacity: 1;
  transform: translateY(0);
}

.quick-add-btn:hover {
  background: #0b5ed7;
  transform: scale(1.05);
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3em;
  line-clamp: 2;
}

.description-wrapper {
  position: relative;
}

.description-text {
  line-height: 1.5;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.description-text:not(.expanded) {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 3em;
  line-clamp: 2;
}

.description-text.expanded {
  display: block;
  max-height: none;
}

.read-more-btn {
  color: #0d6efd;
  font-size: 0.85rem;
  font-weight: 500;
}

.read-more-btn:hover {
  color: #0a58ca;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-image-wrapper {
    height: 180px;
  }

  .quick-add-btn span {
    display: none;
  }

  .quick-add-btn {
    padding: 0.5rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .card-body {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .product-image-wrapper {
    height: 160px;
  }
}

/* Smooth loading for images */
.product-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Custom notification style */
.custom-notification {
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

<template>
  
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-lg-3 mb-5 mb-lg-0">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <img
                :src="user.avatar || 'https://via.placeholder.com/150'"
                alt="Profile"
                class="rounded-circle border border-4 border-primary"
                style="width: 80px; height: 80px; object-fit: cover;"
              />
              <h6 class="mt-3 mb-0">{{ user.name }}</h6>
              <p class="text-muted small">{{ user.email }}</p>
            </div>

            <div class="list-group list-group-flush">
              <RouterLink to="/profile" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-person me-2"></i>Profile
              </RouterLink>
              <RouterLink to="/orders" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-bag me-2"></i>My Orders
              </RouterLink>
              <RouterLink to="/wishlist" class="list-group-item list-group-item-action border-0 active">
                <i class="bi bi-heart me-2"></i>Wishlist
                <span class="badge bg-primary float-end">{{ wishlist.length }}</span>
              </RouterLink>
              <RouterLink to="/settings" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-gear me-2"></i>Settings
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-0">Wishlist</h4>
                <p class="text-muted mb-0">Your saved products</p>
              </div>
              <button class="btn btn-outline-primary" @click="refreshWishlist">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>

            <!-- Stats -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <div class="card border-0 bg-primary bg-opacity-10">
                  <div class="card-body py-3 text-center">
                    <h5 class="fw-bold text-primary">{{ wishlist.length }}</h5>
                    <small class="text-muted">Total Items</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wishlist Items -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-0">
            <!-- Loading -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-3 text-muted">Loading your wishlist...</p>
            </div>

            <!-- Empty -->
            <div v-else-if="wishlist.length === 0" class="text-center py-5">
              <i class="bi bi-heart display-1 text-muted opacity-50 mb-4"></i>
              <h5 class="fw-semibold text-muted mb-3">No items in wishlist</h5>
              <RouterLink to="/products" class="btn btn-primary">
                <i class="bi bi-bag me-2"></i>Browse Products
              </RouterLink>
            </div>

            <!-- Table -->
            <div v-else class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-4">Product</th>
                    <th>Price</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in wishlist" :key="item.id">
                    <td class="ps-4">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="rounded me-3"
                          width="50"
                          height="50"
                          style="object-fit: cover;"
                        />
                        <div>
                          <div class="fw-semibold">{{ item.name }}</div>
                          <small class="text-muted">SKU: {{ item.sku }}</small>
                        </div>
                      </div>
                    </td>
                    <td class="fw-bold">{{ formatCurrency(item.price) }}</td>
                    <td class="text-center">
                      <div class="btn-group btn-group-sm">
                        <RouterLink
                          :to="`/products/${item.id}`"
                          class="btn btn-outline-primary"
                          title="View Product"
                        >
                          <i class="bi bi-eye"></i>
                        </RouterLink>
                        <button
                          class="btn btn-outline-danger"
                          @click="removeFromWishlist(item)"
                          title="Remove"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                        <button
                          class="btn btn-outline-success"
                          @click="addToCart(item)"
                          title="Add to Cart"
                        >
                          <i class="bi bi-cart-plus"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"

const user = ref({
  name: "Ahmed",
  email: "ahmed@example.com",
  avatar: null
})

const wishlist = ref([
  // مثال بيانات
  { id: "p1", name: "Product One", sku: "SKU001", price: 99.99, image: "https://via.placeholder.com/100" },
  { id: "p2", name: "Product Two", sku: "SKU002", price: 149.99, image: "https://via.placeholder.com/100" }
])

const loading = ref(false)

const formatCurrency = (value) => `$${value.toFixed(2)}`
const refreshWishlist = () => { /* هنا ممكن تجيب البيانات من Firestore */ }
const removeFromWishlist = (item) => { wishlist.value = wishlist.value.filter(p => p.id !== item.id) }
const addToCart = (item) => { console.log("Added to cart:", item) }
</script>
<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
.btn-group .btn {
  min-width: 36px;
}
.card-body h4 {
  font-size: 1.25rem;
}
.badge {
  font-size: 0.75rem;
}
</style>

<template>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-lg-3">
        <ProfileSidebar :user="user" @logout="logout" />
      </div>

      <div class="col-lg-9">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-0">My Wishlist</h4>
                <p class="text-muted mb-0">{{ wishlist.length }} items saved for later</p>
              </div>
              <button class="btn btn-outline-primary rounded-pill px-3" @click="refreshWishlist">
                <i class="bi bi-arrow-clockwise me-1"></i> Refresh
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && wishlist.length === 0" class="text-center py-5 animate__animated animate__fadeIn">
              <div class="mb-4">
                <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
                  <i class="bi bi-heart text-muted opacity-50 display-4"></i>
                </div>
              </div>
              <h5 class="fw-bold text-dark mb-2">Your wishlist is empty</h5>
              <p class="text-muted mb-4">Explore our catalog and find something you love!</p>
              <RouterLink to="/products" class="btn btn-primary rounded-pill px-4">
                Start Shopping
              </RouterLink>
            </div>

            <!-- Loading State -->
            <div v-else-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-3 text-muted">Loading your wishlist...</p>
            </div>

            <!-- Wishlist Grid -->
            <div v-else class="row g-3">
               <div v-for="item in wishlist" :key="item.id" class="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
                 <div class="card h-100 border-0 shadow-sm product-card position-relative overflow-hidden">
                    <button
                      class="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2 shadow-sm text-danger"
                      @click="removeFromWishlist(item)"
                      title="Remove from Wishlist"
                    >
                      <i class="bi bi-trash"></i>
                    </button>

                    <div class="position-relative" style="padding-top: 100%;">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                      >
                    </div>

                    <div class="card-body p-3 d-flex flex-column">
                       <h6 class="fw-bold text-truncate mb-1">{{ item.name }}</h6>
                       <small class="text-muted mb-2">{{ item.sku }}</small>
                       <div class="mt-auto d-flex align-items-center justify-content-between">
                          <span class="fw-bold text-primary">{{ formatCurrency(item.price) }}</span>
                          <button
                            class="btn btn-outline-primary btn-sm rounded-pill"
                            @click="addToCart(item)"
                          >
                             <i class="bi bi-cart-plus me-1"></i> Add
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import ProfileSidebar from '../components/ProfileSidebar.vue'

const router = useRouter()

const user = ref({
  name: "",
  email: "",
  avatar: null,
  ordersCount: 0,
  wishlistCount: 0
})

const wishlist = ref([])

const loading = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const refreshWishlist = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 800)
}

const removeFromWishlist = (item) => {
  if (confirm('Remove this item from your wishlist?')) {
    wishlist.value = wishlist.value.filter(p => p.id !== item.id)
    user.value.wishlistCount = wishlist.value.length
  }
}

const addToCart = (item) => {
  // Ideally use a toast here
  alert(`Added ${item.name} to cart!`)
}

const logout = () => {
    if(confirm('Are you sure you want to logout?')) {
        router.push('/auth')
    }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
}

.product-card .btn-light {
    opacity: 0;
    transition: opacity 0.2s;
}

.product-card:hover .btn-light {
    opacity: 1;
}

.object-fit-cover {
  object-fit: cover;
}
</style>

<template>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-lg-3">
        <ProfileSidebar :user="user" @logout="logout" />
      </div>

      <div class="col-lg-9">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
              <div>
                <h4 class="fw-bold mb-0">My Orders</h4>
                <p class="text-muted mb-0">Track and manage your recent orders</p>
              </div>
              <div class="d-flex gap-3">
                <select v-model="filterStatus" class="form-select border-0 bg-light rounded-pill" style="width: auto;">
                  <option value="">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button class="btn btn-outline-primary rounded-pill px-3" @click="refreshOrders">
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>

            <!-- Stats -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <div class="p-3 rounded-3 bg-primary bg-opacity-10 text-center">
                   <h4 class="fw-bold text-primary mb-0">{{ stats.total }}</h4>
                   <small class="text-muted fw-medium">Total</small>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 rounded-3 bg-warning bg-opacity-10 text-center">
                   <h4 class="fw-bold text-warning mb-0">{{ stats.pending }}</h4>
                   <small class="text-muted fw-medium">Pending</small>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 rounded-3 bg-success bg-opacity-10 text-center">
                   <h4 class="fw-bold text-success mb-0">{{ stats.delivered }}</h4>
                   <small class="text-muted fw-medium">Delivered</small>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 rounded-3 bg-danger bg-opacity-10 text-center">
                   <h4 class="fw-bold text-danger mb-0">{{ stats.cancelled }}</h4>
                   <small class="text-muted fw-medium">Cancelled</small>
                </div>
              </div>
            </div>

            <!-- Orders List -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-3 text-muted">Loading your orders...</p>
            </div>

            <div v-else-if="filteredOrders.length === 0" class="text-center py-5 animate__animated animate__fadeIn">
              <div class="mb-4">
                <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
                   <i class="bi bi-bag-x text-muted opacity-50 display-4"></i>
                </div>
              </div>
              <h5 class="fw-bold text-dark mb-2">No orders found</h5>
              <p class="text-muted mb-4">We couldn't find any orders matching your criteria.</p>
              <RouterLink to="/products" class="btn btn-primary rounded-pill px-4">
                Start Shopping
              </RouterLink>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                  <tr>
                    <th class="ps-4 border-0 rounded-start py-3">Order ID</th>
                    <th class="border-0 py-3">Date</th>
                    <th class="border-0 py-3">Items</th>
                    <th class="border-0 py-3">Total</th>
                    <th class="border-0 py-3">Status</th>
                    <th class="pe-4 border-0 rounded-end py-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.id" class="order-row">
                    <td class="ps-4 fw-bold text-primary">#{{ order.id }}</td>
                    <td class="text-muted">{{ formatDate(order.date) }}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="avatar-group me-2">
                           <img
                             v-if="order.items[0]"
                             :src="order.items[0].image"
                             class="rounded-circle border border-2 border-white shadow-sm"
                             width="35"
                             height="35"
                             style="object-fit: cover;"
                           />
                        </div>
                        <span class="small text-muted" v-if="order.items.length > 1">
                          +{{ order.items.length - 1 }} more
                        </span>
                        <span class="small text-dark fw-medium ms-1" v-else>
                          {{ order.items[0]?.name }}
                        </span>
                      </div>
                    </td>
                    <td class="fw-bold">{{ formatCurrency(order.total) }}</td>
                    <td>
                      <span class="badge rounded-pill px-3 py-2" :class="getStatusClass(order.status)">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="pe-4 text-end">
                      <button class="btn btn-light btn-sm rounded-circle shadow-sm" @click="viewOrder(order)">
                        <i class="bi bi-chevron-right"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="modal-backdrop fade show"></div>
    <div v-if="selectedOrder" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg" style="max-height: 90vh;">
          <div class="modal-header border-0 pb-0">
            <div>
              <h5 class="modal-title fw-bold">Order #{{ selectedOrder.id }}</h5>
              <p class="text-muted small mb-0">Placed on {{ formatDate(selectedOrder.date) }}</p>
            </div>
            <button type="button" class="btn-close" @click="selectedOrder = null"></button>
          </div>
          <div class="modal-body p-4">
            <!-- Stepper/Status Visual (Optional Enhancement) -->
            <div class="card border-0 bg-light mb-4">
               <div class="card-body p-3 d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-uppercase small text-muted">Status</span>
                  <span class="badge rounded-pill px-3 py-2" :class="getStatusClass(selectedOrder.status)">
                    {{ selectedOrder.status }}
                  </span>
               </div>
            </div>

            <div class="row g-4 mb-4">
              <div class="col-md-6">
                 <h6 class="fw-bold mb-3">Shipping Address</h6>
                 <div class="bg-white border rounded p-3 h-100">
                    <p class="fw-bold mb-1">{{ selectedOrder.shipping.name }}</p>
                    <p class="text-muted mb-1">{{ selectedOrder.shipping.address }}</p>
                    <p class="text-muted mb-0">{{ selectedOrder.shipping.phone }}</p>
                 </div>
              </div>
               <div class="col-md-6">
                 <h6 class="fw-bold mb-3">Payment Info</h6>
                 <div class="bg-white border rounded p-3 h-100">
                    <p class="mb-1"><span class="text-muted">Method:</span> <span class="fw-medium">{{ selectedOrder.paymentMethod }}</span></p>
                     <p v-if="selectedOrder.trackingNumber" class="mb-0">
                       <span class="text-muted">Tracking:</span>
                       <a href="#" class="text-primary text-decoration-none fw-medium">{{ selectedOrder.trackingNumber }}</a>
                     </p>
                 </div>
              </div>
            </div>

            <h6 class="fw-bold mb-3">Items Ordered</h6>
            <div class="list-group mb-4">
               <div v-for="item in selectedOrder.items" :key="item.id" class="list-group-item border-0 border-bottom py-3 px-0">
                  <div class="d-flex align-items-center">
                     <img :src="item.image" class="rounded me-3" width="60" height="60" style="object-fit: cover;">
                     <div class="flex-grow-1">
                        <h6 class="fw-bold mb-1">{{ item.name }}</h6>
                        <small class="text-muted">SKU: {{ item.sku }}</small>
                     </div>
                     <div class="text-end">
                        <div class="fw-bold">{{ formatCurrency(item.price) }}</div>
                        <small class="text-muted">Qty: {{ item.quantity }}</small>
                     </div>
                  </div>
               </div>
            </div>

            <div class="d-flex justify-content-end">
               <div class="col-md-5">
                  <div class="d-flex justify-content-between mb-2">
                     <span class="text-muted">Subtotal</span>
                     <span class="fw-medium">{{ formatCurrency(selectedOrder.subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                     <span class="text-muted">Shipping</span>
                     <span class="fw-medium">{{ selectedOrder.shippingCost === 0 ? 'Free' : formatCurrency(selectedOrder.shippingCost) }}</span>
                  </div>
                   <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
                     <span class="text-muted">Tax</span>
                     <span class="fw-medium">{{ formatCurrency(selectedOrder.tax) }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                     <span class="fw-bold fs-5">Total</span>
                     <span class="fw-bold fs-5 text-primary">{{ formatCurrency(selectedOrder.total) }}</span>
                  </div>
               </div>
            </div>

          </div>
          <div class="modal-footer border-0 pb-4 pe-4">
             <button
                v-if="selectedOrder.status === 'pending'"
                type="button"
                class="btn btn-outline-danger rounded-pill px-4 me-2"
                @click="cancelOrder(selectedOrder)"
              >
                Cancel Order
              </button>
              <button
                v-if="selectedOrder.status === 'delivered'"
                type="button"
                class="btn btn-outline-primary rounded-pill px-4 me-2"
                @click="reorder(selectedOrder)"
              >
                Buy Again
              </button>
              <button type="button" class="btn btn-dark rounded-pill px-4" @click="selectedOrder = null">
                Close
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ProfileSidebar from '../components/ProfileSidebar.vue'

const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  avatar: '',
  ordersCount: 0,
  wishlistCount: 0
})

const orders = ref([])
const loading = ref(true)
const filterStatus = ref('')
const selectedOrder = ref(null)

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    orders.value = [] // Setup for real API data later
    loading.value = false
  }, 1000)
})

const filteredOrders = computed(() => {
  if (!filterStatus.value) return orders.value
  return orders.value.filter(order => order.status === filterStatus.value)
})

const stats = computed(() => {
  const total = orders.value.length
  const pending = orders.value.filter(o => o.status === 'pending').length
  const delivered = orders.value.filter(o => o.status === 'delivered').length
  const cancelled = orders.value.filter(o => o.status === 'cancelled').length
  return { total, pending, delivered, cancelled }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-warning bg-opacity-10 text-warning',
    processing: 'bg-info bg-opacity-10 text-info',
    shipped: 'bg-primary bg-opacity-10 text-primary',
    delivered: 'bg-success bg-opacity-10 text-success',
    cancelled: 'bg-danger bg-opacity-10 text-danger'
  }
  return classes[status] || 'bg-secondary bg-opacity-10 text-secondary'
}

const viewOrder = (order) => {
  selectedOrder.value = order
}

const cancelOrder = (order) => {
  if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
    order.status = 'cancelled'
    alert(`Order #${order.id} has been cancelled`)
  }
}

const reorder = (order) => {
  if (confirm(`Add items from order #${order.id} to cart?`)) {
    alert(`Items from order #${order.id} added to cart successfully!`)
  }
}

const refreshOrders = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Orders refreshed!')
  }, 1000)
}

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('user')
    router.push('/auth')
  }
}
</script>

<style scoped>
.order-row {
  transition: all 0.2s ease;
}

.order-row:hover {
  background-color: #fcfcfc;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.avatar-group {
    display: flex;
    align-items: center;
}

.modal-backdrop {
  z-index: 1040;
  background-color: rgba(0,0,0,0.5);
}

.modal {
  z-index: 1050;
}
</style>

<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar (Same as Profile) -->
      <div class="col-lg-3 mb-5 mb-lg-0">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <div class="position-relative d-inline-block">
                <img
                  :src="user.avatar || 'https://via.placeholder.com/150'"
                  alt="Profile"
                  class="rounded-circle border border-4 border-primary"
                  style="width: 80px; height: 80px; object-fit: cover;"
                />
              </div>
              <h6 class="mt-3 mb-0">{{ user.name }}</h6>
              <p class="text-muted small">{{ user.email }}</p>
            </div>

            <div class="list-group list-group-flush">
              <RouterLink
                to="/profile"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-person me-2"></i>Profile
              </RouterLink>
              <RouterLink
                to="/orders"
                class="list-group-item list-group-item-action border-0 active"
              >
                <i class="bi bi-bag me-2"></i>My Orders
                <span class="badge bg-primary float-end">{{ orders.length }}</span>
              </RouterLink>
              <RouterLink
                to="/addresses"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-geo-alt me-2"></i>Addresses
              </RouterLink>
              <RouterLink
                to="/wishlist"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-heart me-2"></i>Wishlist
              </RouterLink>
              <RouterLink
                to="/settings"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-gear me-2"></i>Settings
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9">
        <!-- Orders Header -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-0">My Orders</h4>
                <p class="text-muted mb-0">Track and manage your orders</p>
              </div>
              <div class="d-flex gap-3">
                <select v-model="filterStatus" class="form-select" style="width: auto;">
                  <option value="">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button class="btn btn-outline-primary" @click="refreshOrders">
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>

            <!-- Orders Stats -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <div class="card border-0 bg-primary bg-opacity-10">
                  <div class="card-body py-3 text-center">
                    <h5 class="fw-bold text-primary">{{ stats.total }}</h5>
                    <small class="text-muted">Total Orders</small>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="card border-0 bg-warning bg-opacity-10">
                  <div class="card-body py-3 text-center">
                    <h5 class="fw-bold text-warning">{{ stats.pending }}</h5>
                    <small class="text-muted">Pending</small>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="card border-0 bg-success bg-opacity-10">
                  <div class="card-body py-3 text-center">
                    <h5 class="fw-bold text-success">{{ stats.delivered }}</h5>
                    <small class="text-muted">Delivered</small>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="card border-0 bg-danger bg-opacity-10">
                  <div class="card-body py-3 text-center">
                    <h5 class="fw-bold text-danger">{{ stats.cancelled }}</h5>
                    <small class="text-muted">Cancelled</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Orders List -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-0">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3 text-muted">Loading your orders...</p>
            </div>

            <!-- No Orders -->
            <div v-else-if="filteredOrders.length === 0" class="text-center py-5">
              <div class="mb-4">
                <i class="bi bi-bag-x display-1 text-muted opacity-50"></i>
              </div>
              <h5 class="fw-semibold text-muted mb-3">No orders found</h5>
              <p class="text-muted mb-4" v-if="filterStatus">
                No {{ filterStatus }} orders available
              </p>
              <RouterLink to="/products" class="btn btn-primary">
                <i class="bi bi-bag me-2"></i>Start Shopping
              </RouterLink>
            </div>

            <!-- Orders Table -->
            <div v-else class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-4">Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.id">
                    <td class="ps-4 fw-semibold">
                      #{{ order.id }}
                    </td>
                    <td>
                      {{ formatDate(order.date) }}
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="me-2">
                          <img
                            :src="order.items[0]?.image"
                            :alt="order.items[0]?.name"
                            class="rounded"
                            width="40"
                            height="40"
                            style="object-fit: cover;"
                          />
                        </div>
                        <div>
                          <small class="d-block">{{ order.items[0]?.name }}</small>
                          <small class="text-muted">
                            +{{ order.items.length - 1 }} more item{{ order.items.length - 1 !== 1 ? 's' : '' }}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td class="fw-bold">
                      {{ formatCurrency(order.total) }}
                    </td>
                    <td>
                      <span class="badge" :class="getStatusClass(order.status)">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          class="btn btn-outline-primary"
                          @click="viewOrder(order)"
                          title="View Order Details"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <button
                          v-if="order.status === 'pending'"
                          class="btn btn-outline-danger"
                          @click="cancelOrder(order)"
                          title="Cancel Order"
                        >
                          <i class="bi bi-x-circle"></i>
                        </button>
                        <button
                          v-if="order.status === 'delivered'"
                          class="btn btn-outline-success"
                          @click="reorder(order)"
                          title="Reorder"
                        >
                          <i class="bi bi-arrow-repeat"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Order Details Modal -->
        <div v-if="selectedOrder" class="modal fade show d-block" style="background: rgba(0,0,0,0.5)">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Order #{{ selectedOrder.id }}</h5>
                <button type="button" class="btn-close" @click="selectedOrder = null"></button>
              </div>
              <div class="modal-body">
                <!-- Order Summary -->
                <div class="row mb-4">
                  <div class="col-md-6">
                    <h6 class="fw-semibold mb-3">Order Information</h6>
                    <table class="table table-sm">
                      <tbody>
                        <tr>
                          <td class="text-muted">Order ID:</td>
                          <td class="fw-semibold">#{{ selectedOrder.id }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Order Date:</td>
                          <td>{{ formatDate(selectedOrder.date) }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Status:</td>
                          <td>
                            <span class="badge" :class="getStatusClass(selectedOrder.status)">
                              {{ selectedOrder.status }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted">Payment Method:</td>
                          <td>{{ selectedOrder.paymentMethod }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <h6 class="fw-semibold mb-3">Shipping Information</h6>
                    <table class="table table-sm">
                      <tbody>
                        <tr>
                          <td class="text-muted">Name:</td>
                          <td>{{ selectedOrder.shipping.name }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Address:</td>
                          <td>{{ selectedOrder.shipping.address }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Phone:</td>
                          <td>{{ selectedOrder.shipping.phone }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Tracking:</td>
                          <td>
                            <a href="#" class="text-primary">#{{ selectedOrder.trackingNumber }}</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Order Items -->
                <h6 class="fw-semibold mb-3">Order Items</h6>
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selectedOrder.items" :key="item.id">
                        <td>
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
                        <td class="text-center">{{ formatCurrency(item.price) }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-end fw-semibold">{{ formatCurrency(item.price * item.quantity) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Order Total -->
                <div class="row justify-content-end mt-4">
                  <div class="col-md-6">
                    <table class="table table-sm">
                      <tbody>
                        <tr>
                          <td class="text-muted">Subtotal:</td>
                          <td class="text-end">{{ formatCurrency(selectedOrder.subtotal) }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Shipping:</td>
                          <td class="text-end">{{ formatCurrency(selectedOrder.shippingCost) }}</td>
                        </tr>
                        <tr>
                          <td class="text-muted">Tax:</td>
                          <td class="text-end">{{ formatCurrency(selectedOrder.tax) }}</td>
                        </tr>
                        <tr class="fw-bold fs-5">
                          <td>Total:</td>
                          <td class="text-end text-primary">{{ formatCurrency(selectedOrder.total) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="selectedOrder = null">
                  Close
                </button>
                <button
                  v-if="selectedOrder.status === 'pending'"
                  type="button"
                  class="btn btn-danger"
                  @click="cancelOrder(selectedOrder)"
                >
                  Cancel Order
                </button>
                <button
                  v-if="selectedOrder.status === 'delivered'"
                  type="button"
                  class="btn btn-primary"
                  @click="reorder(selectedOrder)"
                >
                  Reorder
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
import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const user = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/150'
})

const orders = ref([])
const loading = ref(true)
const filterStatus = ref('')
const selectedOrder = ref(null)

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD-78945',
    date: '2024-01-15T10:30:00',
    items: [
      { id: 1, name: 'Wireless Headphones', price: 129.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-001' },
      { id: 2, name: 'Phone Case', price: 24.99, quantity: 2, image: 'https://via.placeholder.com/100', sku: 'SKU-002' }
    ],
    total: 179.97,
    subtotal: 179.97,
    shippingCost: 0,
    tax: 14.40,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK-789456123',
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 234 567 8900'
    }
  },
  {
    id: 'ORD-78946',
    date: '2024-01-14T14:20:00',
    items: [
      { id: 3, name: 'Smart Watch', price: 299.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-003' }
    ],
    total: 299.99,
    subtotal: 299.99,
    shippingCost: 9.99,
    tax: 24.80,
    status: 'shipped',
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK-456123789',
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 234 567 8900'
    }
  },
  {
    id: 'ORD-78947',
    date: '2024-01-13T09:15:00',
    items: [
      { id: 4, name: 'Laptop', price: 899.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-004' },
      { id: 5, name: 'Laptop Bag', price: 49.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-005' }
    ],
    total: 949.98,
    subtotal: 949.98,
    shippingCost: 0,
    tax: 76.00,
    status: 'processing',
    paymentMethod: 'Credit Card',
    trackingNumber: null,
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 234 567 8900'
    }
  },
  {
    id: 'ORD-78948',
    date: '2024-01-12T16:45:00',
    items: [
      { id: 6, name: 'Coffee Maker', price: 89.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-006' }
    ],
    total: 89.99,
    subtotal: 89.99,
    shippingCost: 4.99,
    tax: 7.20,
    status: 'pending',
    paymentMethod: 'Credit Card',
    trackingNumber: null,
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 234 567 8900'
    }
  },
  {
    id: 'ORD-78949',
    date: '2024-01-10T11:20:00',
    items: [
      { id: 7, name: 'Gaming Mouse', price: 59.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-007' },
      { id: 8, name: 'Keyboard', price: 79.99, quantity: 1, image: 'https://via.placeholder.com/100', sku: 'SKU-008' }
    ],
    total: 139.98,
    subtotal: 139.98,
    shippingCost: 0,
    tax: 11.20,
    status: 'cancelled',
    paymentMethod: 'Credit Card',
    trackingNumber: null,
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 234 567 8900'
    }
  }
]

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    orders.value = sampleOrders
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
    pending: 'bg-warning',
    processing: 'bg-info',
    shipped: 'bg-primary',
    delivered: 'bg-success',
    cancelled: 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const viewOrder = (order) => {
  selectedOrder.value = order
}

const cancelOrder = (order) => {
  if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
    order.status = 'cancelled'
    showNotification(`Order #${order.id} has been cancelled`, 'warning')
  }
}

const reorder = () => {
  if (confirm('Add all items from this order to cart?')) {
    // Add to cart logic here
    showNotification('Items added to cart successfully!', 'success')
  }
}

const refreshOrders = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showNotification('Orders refreshed!', 'info')
  }, 1000)
}

const showNotification = (message) => {
  // You can implement a toast notification system here
  alert(message)
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.table th {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.875rem;
  padding: 1rem 0.75rem;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.badge {
  padding: 0.35em 0.65em;
  font-weight: 500;
}

.modal {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
}

.btn-group .btn {
  border-radius: 6px;
}

@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.875rem;
  }

  .btn-group .btn {
    padding: 0.25rem 0.5rem;
  }
}
</style>

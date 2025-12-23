<script setup>

import { useCartStore } from "../stores/cart"
import { RouterLink } from "vue-router"

const cartStore = useCartStore()

const formatCurrency = (value) => {
  const num = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)
}

const handleQuantityChange = (itemId, quantity) => {
  if (quantity < 1) {
    cartStore.updateQuantity(itemId, 1)
    return
  }
  cartStore.updateQuantity(itemId, quantity)
}
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold text-dark mb-0">Shopping Cart</h2>
          <span class="badge bg-primary fs-6">
            {{ cartStore.cart.length }} {{ cartStore.cart.length === 1 ? 'item' : 'items' }}
          </span>
        </div>

        <!-- Empty cart state -->
        <div v-if="cartStore.cart.length === 0" class="text-center py-5">
          <div class="mb-4">
            <i class="bi bi-cart-x display-1 text-muted"></i>
          </div>
          <h3 class="fw-semibold text-muted mb-3">Your cart is empty</h3>
          <p class="text-muted mb-4">Add some products to get started!</p>
          <RouterLink to="/" class="btn btn-primary btn-lg px-4">
            <i class="bi bi-arrow-left me-2"></i>Continue Shopping
          </RouterLink>
        </div>

        <!-- Cart with items -->
        <div v-else>
          <!-- Desktop table -->
          <div class="table-responsive d-none d-md-block">
            <table class="table align-middle">
              <thead class="table-light">
                <tr>
                  <th scope="col" class="ps-4">Product</th>
                  <th scope="col" class="text-center">Price</th>
                  <th scope="col" class="text-center">Quantity</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartStore.cart" :key="item.id" class="border-top">
                  <td class="ps-4">
                    <div class="d-flex align-items-center">
                      <div class="bg-light rounded-3 p-2 me-3">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="rounded"
                          width="80"
                          height="80"
                          style="object-fit: contain;"
                        />
                      </div>
                      <div>
                        <h6 class="fw-semibold mb-1">{{ item.name }}</h6>
                        <small class="text-muted">SKU: {{ item.id }}</small>
                      </div>
                    </div>
                  </td>

                  <td class="text-center">
                    <span class="fw-semibold">{{ formatCurrency(item.priceValue) }}</span>
                  </td>

                  <td class="text-center">
                    <div class="d-flex justify-content-center">
                      <div class="input-group input-group-sm" style="width: 120px;">
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="handleQuantityChange(item.id, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          class="form-control text-center"
                          min="1"
                          v-model.number="item.quantity"
                          @change="handleQuantityChange(item.id, item.quantity)"
                        />
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="handleQuantityChange(item.id, item.quantity + 1)"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  <td class="text-center">
                    <span class="fw-bold text-primary">
                      {{ formatCurrency(item.priceValue * item.quantity) }}
                    </span>
                  </td>

                  <td class="text-center">
                    <button
                      class="btn btn-outline-danger btn-sm"
                      @click="cartStore.removeFromCart(item.id)"
                      title="Remove item"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile cards -->
          <div class="d-md-none">
            <div v-for="item in cartStore.cart" :key="item.id" class="card mb-3 border">
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-4">
                    <div class="bg-light rounded-3 p-2">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="img-fluid rounded"
                        style="object-fit: contain; height: 100px;"
                      />
                    </div>
                  </div>
                  <div class="col-8">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 class="fw-semibold mb-1">{{ item.name }}</h6>
                        <p class="text-primary fw-bold mb-2">
                          {{ formatCurrency(item.priceValue) }}
                        </p>
                      </div>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        @click="cartStore.removeFromCart(item.id)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <div class="input-group input-group-sm" style="width: 120px;">
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="handleQuantityChange(item.id, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          class="form-control text-center"
                          min="1"
                          v-model.number="item.quantity"
                          @change="handleQuantityChange(item.id, item.quantity)"
                        />
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="handleQuantityChange(item.id, item.quantity + 1)"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                      <span class="fw-bold">
                        {{ formatCurrency(item.priceValue * item.quantity) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart summary -->
          <div class="card border-0 bg-light mt-4">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-lg-8"></div>
                <div class="col-lg-4">
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Subtotal</span>
                    <span class="fw-semibold">{{ formatCurrency(cartStore.cartTotal) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Shipping</span>
                    <span class="fw-semibold">—</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Tax</span>
                    <span class="fw-semibold">—</span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between mb-4">
                    <span class="h5 fw-bold">Total</span>
                    <span class="h4 fw-bold text-primary">
                      {{ formatCurrency(cartStore.cartTotal) }}
                    </span>
                  </div>

                  <div class="d-grid gap-3">
                    <RouterLink
                      to="/checkout"
                      class="btn btn-primary btn-lg"
                    >
                      <i class="bi bi-credit-card me-2"></i>Proceed to Checkout
                    </RouterLink>

                    <div class="d-flex gap-2">
                      <RouterLink to="/" class="btn btn-outline-secondary flex-fill">
                        <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                      </RouterLink>
                      <button
                        class="btn btn-outline-danger flex-fill"
                        @click="cartStore.clearCart"
                      >
                        <i class="bi bi-trash me-2"></i>Clear Cart
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

<style scoped>
.card {
  border-radius: 12px;
}

.table th {
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.5rem;
}

.input-group .btn {
  width: 40px;
}



.input-group input[type="number"]::-webkit-outer-spin-button,
.input-group input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem !important;
  }
}
</style>

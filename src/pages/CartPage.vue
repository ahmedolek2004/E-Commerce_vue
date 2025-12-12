<script setup>
import { useCartStore } from "../stores/cart"
const cartStore = useCartStore()

const formatCurrency = (v) => `$${v.toFixed(2)}`
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-4">Shopping Cart</h1>

    <div v-if="cartStore.cart.length === 0" class="alert alert-info">
      Your cart is empty.
    </div>

    <table v-else class="table align-middle">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in cartStore.cart" :key="item.id">
          <td>
            <div class="d-flex align-items-center">
              <img :src="item.image" width="60" class="me-3 rounded" />
              {{ item.name }}
            </div>
          </td>

          <td>{{ formatCurrency(item.priceValue) }}</td>

          <td>
            <input type="number" min="1" class="form-control"
                   v-model.number="item.quantity"
                   @change="cartStore.updateQuantity(item.id, item.quantity)"
                   style="width: 80px;" />
          </td>

          <td>{{ formatCurrency(item.priceValue * item.quantity) }}</td>

          <td>
            <button class="btn btn-danger btn-sm"
                    @click="cartStore.removeFromCart(item.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="cartStore.cart.length > 0"
         class="d-flex justify-content-between align-items-center mt-4">

      <h4>Total: {{ formatCurrency(cartStore.cartTotal) }}</h4>

      <button class="btn btn-outline-danger" @click="cartStore.clearCart">
        Clear Cart
      </button>

      <RouterLink to="/checkout" class="btn btn-primary btn-lg">
        Checkout
      </RouterLink>
    </div>
  </div>
</template>

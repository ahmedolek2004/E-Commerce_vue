<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <div class="container py-5">
    <h1 class="mb-4">Shopping Cart</h1>

    <!-- لو السلة فاضية -->
    <div v-if="cartItems.length === 0" class="alert alert-info">
      Your cart is empty.
    </div>

    <!-- جدول المنتجات -->
    <table v-else class="table align-middle">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>
            <div class="d-flex align-items-center">
              <img :src="item.image" alt="" class="me-3" style="width: 60px; height: 60px; object-fit: cover;" />
              <span>{{ item.name }}</span>
            </div>
          </td>
          <td>{{ item.price }}</td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model.number="item.quantity"
              min="1"
              style="width: 80px;"
              @change="updateCart(item)"
            />
          </td>
          <td>{{ formatCurrency(item.priceValue * item.quantity) }}</td>
          <td>
            <button @click="removeItem(item.id)" class="btn btn-sm btn-danger" title="Delete">
                  <i class="bi bi-trash"></i>
                </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- الإجمالي -->
    <div v-if="cartItems.length > 0" class="d-flex justify-content-between align-items-center mt-4">
      <h4>Total: {{ formatCurrency(cartTotal) }}</h4>
      <RouterLink to="/checkout" class="btn btn-primary btn-lg">
        Proceed to Checkout
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { RouterLink } from "vue-router"

// بيانات تجريبية للسلة
const cartItems = ref([
  { id: "p1", name: "Product 1", price: "$99.99", priceValue: 99.99, image: "/images/1.webp", quantity: 1 },
  { id: "p2", name: "Product 2", price: "$149.99", priceValue: 149.99, image: "/images/1.webp", quantity: 2 },
])

// حساب الإجمالي
const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.priceValue * item.quantity, 0)
)

// تحديث الكمية
const updateCart = (item) => {
  if (item.quantity < 1) item.quantity = 1
}

// حذف منتج
const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
}

// تنسيق السعر
const formatCurrency = (value) => `$${value.toFixed(2)}`
</script>

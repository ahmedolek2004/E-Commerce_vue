<template>
  <div class="container py-5">
    <h1 class="mb-4">Checkout</h1>
    <form @submit.prevent="handleCheckout" class="row g-3">
      <!-- Customer Info -->
      <div class="col-md-6">
        <label for="name" class="form-label">Full Name</label>
        <input v-model="name" type="text" class="form-control" id="name" required />
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" required />
      </div>

      <!-- Address -->
      <div class="col-12">
        <label for="address" class="form-label">Address</label>
        <input v-model="address" type="text" class="form-control" id="address" required />
      </div>
      <div class="col-md-6">
        <label for="city" class="form-label">City</label>
        <input v-model="city" type="text" class="form-control" id="city" required />
      </div>
      <div class="col-md-6">
        <label for="zip" class="form-label">Zip Code</label>
        <input v-model="zip" type="text" class="form-control" id="zip" required />
      </div>

      <!-- Payment -->
      <div class="col-md-6">
        <label for="cardNumber" class="form-label">Card Number</label>
        <input v-model="cardNumber" type="text" class="form-control" id="cardNumber" required />
      </div>
      <div class="col-md-3">
        <label for="expiry" class="form-label">Expiry</label>
        <input v-model="expiry" type="text" class="form-control" id="expiry" placeholder="MM/YY" required />
      </div>
      <div class="col-md-3">
        <label for="cvv" class="form-label">CVV</label>
        <input v-model="cvv" type="text" class="form-control" id="cvv" required />
      </div>

      <!-- Submit -->
      <div class="col-12">
        <button type="submit" class="btn btn-primary w-100">Place Order</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const name = ref("")
const email = ref("")
const address = ref("")
const city = ref("")
const zip = ref("")
const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")

const handleCheckout = () => {
  console.log("Checkout data:", {
    name: name.value,
    email: email.value,
    address: address.value,
    city: city.value,
    zip: zip.value,
    cardNumber: cardNumber.value,
    expiry: expiry.value,
    cvv: cvv.value
  })
  alert("Order placed successfully!")
}
</script>

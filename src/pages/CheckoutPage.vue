<template>
  <div class="container py-5">
    <h1 class="mb-4 fw-bold">Checkout</h1>
    <form @submit.prevent="handleCheckout" class="row g-5">
      <!-- Shipping Details -->
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm p-4 mb-4">
          <h4 class="mb-4 fw-bold">Shipping Details</h4>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Full Name</label>
              <input v-model="name" type="text" class="form-control" id="name" required />
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" required />
            </div>
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
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm p-4">
          <h4 class="mb-4 fw-bold">Payment Method</h4>

          <div class="d-flex flex-column gap-3 mb-4">
            <!-- Credit Card -->
            <label class="payment-option card p-3 border cursor-pointer" :class="{ 'selected': paymentMethod === 'card' }">
              <div class="d-flex align-items-center">
                <input type="radio" v-model="paymentMethod" value="card" class="form-check-input me-3" />
                <div class="flex-grow-1">
                  <span class="fw-bold d-block">Credit / Debit Card</span>
                  <small class="text-muted">Pay securely with your bank card</small>
                </div>
                <div class="fs-4 text-primary">
                  <i class="bi bi-credit-card"></i>
                </div>
              </div>

              <!-- Card Details Form (Only visible when Card is selected) -->
               <div v-if="paymentMethod === 'card'" class="row g-3 mt-2 animate__animated animate__fadeIn">
                 <div class="col-12">
                   <input v-model="cardNumber" type="text" class="form-control" placeholder="Card Number" required />
                 </div>
                 <div class="col-6">
                   <input v-model="expiry" type="text" class="form-control" placeholder="MM/YY" required />
                 </div>
                 <div class="col-6">
                   <input v-model="cvv" type="text" class="form-control" placeholder="CVV" required />
                 </div>
               </div>
            </label>

            <!-- PayPal -->
            <label class="payment-option card p-3 border cursor-pointer" :class="{ 'selected': paymentMethod === 'paypal' }">
              <div class="d-flex align-items-center">
                <input type="radio" v-model="paymentMethod" value="paypal" class="form-check-input me-3" />
                <div class="flex-grow-1">
                  <span class="fw-bold d-block">PayPal</span>
                  <small class="text-muted">Fast and secure payment</small>
                </div>
                <div class="fs-4 text-primary">
                  <i class="bi bi-paypal"></i>
                </div>
              </div>
            </label>

             <!-- Instapay / Mobile Wallet -->
            <label class="payment-option card p-3 border cursor-pointer" :class="{ 'selected': paymentMethod === 'wallet' }">
              <div class="d-flex align-items-center">
                <input type="radio" v-model="paymentMethod" value="wallet" class="form-check-input me-3" />
                <div class="flex-grow-1">
                   <span class="fw-bold d-block">InstaPay / Wallet</span>
                   <small class="text-muted">Vodafone Cash, Etisalat, etc.</small>
                </div>
                <div class="fs-4 text-primary">
                  <i class="bi bi-phone"></i>
                </div>
              </div>
              <div v-if="paymentMethod === 'wallet'" class="mt-2 text-muted small animate__animated animate__fadeIn">
                 You will receive a payment request or instructions on the next screen.
              </div>
            </label>

            <!-- Cash on Delivery -->
            <label class="payment-option card p-3 border cursor-pointer" :class="{ 'selected': paymentMethod === 'cod' }">
              <div class="d-flex align-items-center">
                <input type="radio" v-model="paymentMethod" value="cod" class="form-check-input me-3" />
                <div class="flex-grow-1">
                  <span class="fw-bold d-block">Cash on Delivery</span>
                  <small class="text-muted">Pay when you receive the order</small>
                </div>
                <div class="fs-4 text-success">
                  <i class="bi bi-cash-stack"></i>
                </div>
              </div>
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-3 fw-bold rounded-pill">
            Place Order
          </button>
        </div>
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
const paymentMethod = ref("card")
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
    paymentMethod: paymentMethod.value,
    cardNumber: paymentMethod.value === 'card' ? cardNumber.value : null,
    expiry: paymentMethod.value === 'card' ? expiry.value : null,
    cvv: paymentMethod.value === 'card' ? cvv.value : null
  })

  if(paymentMethod.value === 'paypal') {
    alert("Redirecting to PayPal...")
  } else {
    alert("Order placed successfully!")
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.payment-option {
  transition: all 0.2s ease;
}

.payment-option:hover {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.payment-option.selected {
  border-color: var(--bs-primary) !important;
  background-color: rgba(var(--bs-primary-rgb), 0.05);
  box-shadow: 0 0 0 1px var(--bs-primary);
}
</style>

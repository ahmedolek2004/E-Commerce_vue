<template>
  <div class="container py-5">
    <h1 class="mb-4">Contact Us</h1>
    <p class="text-muted mb-4">
      We'd love to hear from you! Please fill out the form below.
    </p>

    <form @submit.prevent="handleSubmit" class="card p-4 shadow-sm">
      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Message -->
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea
          v-model="message"
          class="form-control"
          id="message"
          rows="5"
          placeholder="Write your message here..."
          required
        ></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary w-100">Send Message</button>
    </form>

    <!-- Success Alert -->
    <div v-if="submitted" class="alert alert-success mt-4">
      Thank you, {{ name }}! Your message has been sent.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const name = ref("")
const email = ref("")
const message = ref("")
const submitted = ref(false)

const handleSubmit = () => {
  console.log("Contact form submitted:", {
    name: name.value,
    email: email.value,
    message: message.value,
  })
  submitted.value = true

  // Reset form
  name.value = ""
  email.value = ""
  message.value = ""
}
</script>

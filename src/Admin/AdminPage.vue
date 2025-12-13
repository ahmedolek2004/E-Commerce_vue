<template>
  <div class="container py-5 admin-wrapper">

    <h2 class="mb-4 fw-bold">Admin Dashboard</h2>

    <ul class="nav nav-tabs mb-4 admin-tabs">
      <li class="nav-item" v-for="tab in tabs" :key="tab.key">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <UsersTab v-if="activeTab === 'users'" />
    <ProductsTab v-if="activeTab === 'products'" />
    <CategoriesTab v-if="activeTab === 'categories'" />
    <DealsTab v-if="activeTab === 'deals'" />

  </div>
</template>

<script setup>
import { ref } from "vue"

import UsersTab from "./tabs/UsersTab.vue"
import ProductsTab from "./tabs/ProductsTab.vue"
import CategoriesTab from "./tabs/CategoriesTab.vue"
import DealsTab from "./tabs/DealsTab.vue"

const activeTab = ref("users")

const tabs = [
  { key: "users", label: "Users" },
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "deals", label: "Deals" },
]
</script>

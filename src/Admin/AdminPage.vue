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

import UsersTab from "./Tabs/AdminUsers.vue"
import ProductsTab from "./Tabs/AdminProducts.vue"
import CategoriesTab from "./Tabs/AdminCategories.vue"
import DealsTab from "./Tabs/AdminDeals.vue"

const activeTab = ref("users")

const tabs = [
  { key: "users", label: "Users" },
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "deals", label: "Deals" },
]
</script>

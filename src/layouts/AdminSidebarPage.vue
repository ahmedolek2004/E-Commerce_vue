<template>
  <aside class="admin-sidebar" :class="{ open: open }">

    <!-- ✅ زرار الإغلاق في الموبايل -->
    <button class="close-btn d-lg-none" @click="$emit('close')">✖</button>

    <h4 class="fw-bold text-center py-3">Admin Panel</h4>
<ul class="list-unstyled px-3">
  <li>
    <RouterLink to="/admin" class="side-link" @click="$emit('close')">
      <i class="bi bi-speedometer2 me-2"></i> Dashboard
    </RouterLink>
  </li>

  <li>
    <RouterLink to="/admin/users" class="side-link" @click="$emit('close')">
      <i class="bi bi-people me-2"></i> Users
    </RouterLink>
  </li>

  <li>
    <RouterLink to="/admin/products" class="side-link" @click="$emit('close')">
      <i class="bi bi-box-seam me-2"></i> Products
    </RouterLink>
  </li>

  <li>
    <RouterLink to="/admin/categories" class="side-link" @click="$emit('close')">
      <i class="bi bi-tags me-2"></i> Categories
    </RouterLink>
  </li>

  <li>
    <RouterLink to="/admin/deals" class="side-link" @click="$emit('close')">
      <i class="bi bi-percent me-2"></i> Deals
    </RouterLink>
  </li>
</ul>


  </aside>
</template>

<script setup>
defineProps({
  open: Boolean
})
</script>

<style scoped>
/* ✅ الشكل الأساسي */
.admin-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #ddd;
  padding-top: 20px;
}

/* ✅ على الشاشات الصغيرة: مخفي */
@media (max-width: 991px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: -260px;
    height: 100vh;
    z-index: 2000;
    transition: 0.3s;
  }

  /* ✅ لما تفتح */
  .admin-sidebar.open {
    left: 0;
  }

  /* ✅ زرار الإغلاق */
  .close-btn {
    background: none;
    border: none;
    font-size: 22px;
    margin: 10px;
    cursor: pointer;
  }
}

/* ✅ على الشاشات الكبيرة: ثابت */
@media (min-width: 992px) {
  .admin-sidebar {
    position: relative;
    height: auto;
  }
}

/* ✅ روابط السايدبار */
.side-link {
  display: block;
  padding: 12px 15px;
  border-radius: 6px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.side-link:hover {
  background: #e9ecef;
}

.router-link-exact-active {
  background: #0d6efd;
  color: white !important;
}

</style>

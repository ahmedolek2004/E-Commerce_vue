<template>
  <div class="container py-5">
    <h1 class="mb-4">Hot Deals</h1>

    <!-- لو مفيش عروض -->
    <div v-if="deals.length === 0" class="alert alert-info">
      No deals available at the moment.
    </div>

    <!-- شبكة العروض -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="deal in deals" :key="deal.id">
        <div class="card h-100 shadow-sm">
          <img :src="deal.image" class="card-img-top" :alt="deal.title" />
          <div class="card-body">
            <h5 class="card-title">{{ deal.title }}</h5>
            <p class="card-text text-muted">{{ deal.description }}</p>
            <p>
              <span class="text-danger fw-bold">
                {{ formatCurrency(deal.discountPrice) }}
              </span>
              <span class="text-muted text-decoration-line-through ms-2">
                {{ formatCurrency(deal.originalPrice) }}
              </span>
            </p>
            <RouterLink
              :to="`/products/${deal.productId}`"
              class="btn btn-primary btn-sm"
            >
              View Product
            </RouterLink>
          </div>
          <div class="card-footer text-muted">
            Offer valid until {{ deal.validUntil }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const deals = ref([])

onMounted(() => {
  onSnapshot(collection(db, "deals"), (snapshot) => {
    deals.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})

const formatCurrency = (value) => `$${value.toFixed(2)}`
</script>

<style scoped>
.card-img-top {
  height: 220px;
  object-fit: cover;
}
.card-text {
  display: -webkit-box;
  display: box; /* fallback قديم لبعض المتصفحات */
  -webkit-box-orient: vertical;
  box-orient: vertical;

  -webkit-line-clamp: 3; /* للمتصفحات المبنية على WebKit */
  line-clamp: 2;         /* الخاصية القياسية الجديدة */

  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 60px;
}

</style>

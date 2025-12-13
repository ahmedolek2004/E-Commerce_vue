<template>
  <div class="admin-deals">

    <!-- ✅ Add Deal -->
    <div class="card form-card">
      <h4 class="fw-semibold mb-3">Add New Deal</h4>

      <form @submit.prevent="addDeal">
        <div class="form-grid">

          <input v-model="dTitle" class="form-input" placeholder="Deal Title" />

          <input v-model="dDesc" class="form-input" placeholder="Description" />

          <select v-model="dProductId" class="form-input">
            <option disabled value="">Select Product</option>
            <option v-for="p in products" :key="p.id" :value="p.id">
              {{ p.title }}
            </option>
          </select>

          <input v-model="dImage" class="form-input" placeholder="Image URL" />

          <input v-model="dOriginalPrice" class="form-input" placeholder="Original Price" type="number" />

          <input v-model="dDiscountPrice" class="form-input" placeholder="Discount Price" type="number" />

          <input v-model="dValidUntil" class="form-input" placeholder="Valid Until (e.g. 31 Dec 2025)" />

          <div class="text-end">
            <button class="btn btn-primary px-4">Add Deal</button>
          </div>

        </div>
      </form>
    </div>

    <!-- ✅ Deals Table -->
    <div class="card table-card">
      <h4 class="fw-semibold mb-3">All Deals</h4>

      <div class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Product</th>
              <th>Prices</th>
              <th>Valid Until</th>
              <th style="min-width: 150px">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="d in deals" :key="d.id">
              <td><img :src="d.image" width="60" class="rounded" /></td>
              <td>{{ d.title }}</td>
              <td>{{ getProductTitle(d.productId) }}</td>
              <td>
                <span class="text-danger fw-bold">${{ d.discountPrice }}</span>
                <span class="text-muted text-decoration-line-through ms-2">${{ d.originalPrice }}</span>
              </td>
              <td>{{ d.validUntil }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="startDealEdit(d)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteDeal(d.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ✅ Edit Deal -->
    <div v-if="editingDeal" class="card form-card">
      <h5 class="fw-semibold mb-3">Edit Deal</h5>

      <div class="form-grid">

        <input v-model="editDTitle" class="form-input" placeholder="Title" />

        <input v-model="editDDesc" class="form-input" placeholder="Description" />

        <select v-model="editDProductId" class="form-input">
          <option v-for="p in products" :key="p.id" :value="p.id">
            {{ p.title }}
          </option>
        </select>

        <input v-model="editDImage" class="form-input" placeholder="Image URL" />

        <input v-model="editDOriginalPrice" class="form-input" placeholder="Original Price" type="number" />

        <input v-model="editDDiscountPrice" class="form-input" placeholder="Discount Price" type="number" />

        <input v-model="editDValidUntil" class="form-input" placeholder="Valid Until" />

        <div class="text-end">
          <button class="btn btn-success me-2 px-4" @click="saveDealEdit">Save</button>
          <button class="btn btn-secondary px-4" @click="cancelDealEdit">Cancel</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "../../firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

/* ✅ DEALS */
const deals = ref([])

const dTitle = ref("")
const dDesc = ref("")
const dProductId = ref("")
const dOriginalPrice = ref("")
const dDiscountPrice = ref("")
const dValidUntil = ref("")
const dImage = ref("")

const fetchDeals = () => {
  onSnapshot(collection(db, "deals"), (snap) => {
    deals.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

/* ✅ PRODUCTS (needed for dropdown + product names) */
const products = ref([])

const fetchProducts = () => {
  onSnapshot(collection(db, "products"), (snap) => {
    products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

const getProductTitle = (id) => {
  const p = products.value.find((x) => x.id === id)
  return p ? p.title : "Unknown"
}

const addDeal = async () => {
  await addDoc(collection(db, "deals"), {
    title: dTitle.value,
    description: dDesc.value,
    productId: dProductId.value,
    originalPrice: Number(dOriginalPrice.value),
    discountPrice: Number(dDiscountPrice.value),
    validUntil: dValidUntil.value,
    image: dImage.value,
    createdAt: serverTimestamp(),
  })

  dTitle.value = ""
  dDesc.value = ""
  dProductId.value = ""
  dOriginalPrice.value = ""
  dDiscountPrice.value = ""
  dValidUntil.value = ""
  dImage.value = ""
}

/* ✅ Edit Deal */
const editingDeal = ref(null)

const editDTitle = ref("")
const editDDesc = ref("")
const editDProductId = ref("")
const editDOriginalPrice = ref("")
const editDDiscountPrice = ref("")
const editDValidUntil = ref("")
const editDImage = ref("")

const startDealEdit = (deal) => {
  editingDeal.value = deal.id
  editDTitle.value = deal.title
  editDDesc.value = deal.description
  editDProductId.value = deal.productId
  editDOriginalPrice.value = deal.originalPrice
  editDDiscountPrice.value = deal.discountPrice
  editDValidUntil.value = deal.validUntil
  editDImage.value = deal.image
}

const saveDealEdit = async () => {
  await updateDoc(doc(db, "deals", editingDeal.value), {
    title: editDTitle.value,
    description: editDDesc.value,
    productId: editDProductId.value,
    originalPrice: Number(editDOriginalPrice.value),
    discountPrice: Number(editDDiscountPrice.value),
    validUntil: editDValidUntil.value,
    image: editDImage.value,
  })

  editingDeal.value = null
}

const cancelDealEdit = () => {
  editingDeal.value = null
}

const deleteDeal = async (id) => {
  await deleteDoc(doc(db, "deals", id))
}

onMounted(() => {
  fetchDeals()
  fetchProducts()
})
</script>
<style scoped>
.admin-deals {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* ✅ Card */
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

/* ✅ Form Layout */
.form-card h4,
.form-card h5 {
  margin-bottom: 15px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* ✅ Table */
.table-wrapper {
  overflow-x: auto;
  max-height: 70vh;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.styled-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
}

.styled-table thead {
  background: #343a40;
  color: white;
}

/* ✅ Buttons */
.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}
</style>

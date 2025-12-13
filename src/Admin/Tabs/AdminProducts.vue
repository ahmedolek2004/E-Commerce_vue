<template>
  <div class="admin-products">

    <!-- ✅ Add Product -->
    <div class="card form-card">
      <h4 class="fw-semibold mb-3">Add New Product</h4>

      <form @submit.prevent="addProduct">
        <div class="form-grid">

          <input v-model="pTitle" class="form-input" placeholder="Title" />

          <input v-model="pPrice" class="form-input" placeholder="Price" type="number" />

          <select v-model="pCategory" class="form-input">
            <option disabled value="">Select Category</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>

          <input v-model="pImg" class="form-input" placeholder="Image URL" />

          <textarea v-model="pDesc" class="form-textarea" placeholder="Description"></textarea>

          <div class="text-end">
            <button class="btn btn-primary px-4">Add Product</button>
          </div>

        </div>
      </form>
    </div>

    <!-- ✅ Products Table -->
    <div class="card table-card">
      <h4 class="fw-semibold mb-3">All Products</h4>

      <div class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th style="min-width: 150px">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td><img :src="p.img" width="60" class="rounded" /></td>
              <td>{{ p.title }}</td>
              <td>{{ p.price }}</td>
              <td>{{ p.categoryName }}</td>

              <td>
                <button class="btn btn-warning btn-sm me-2" @click="startEdit(p)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteProduct(p.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ✅ Edit Product -->
    <div v-if="editingProduct" class="card form-card">
      <h5 class="fw-semibold mb-3">Edit Product</h5>

      <div class="form-grid">

        <input v-model="editTitle" class="form-input" placeholder="Title" />

        <input v-model="editPrice" class="form-input" placeholder="Price" type="number" />

        <select v-model="editCategory" class="form-input">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>

        <input v-model="editImg" class="form-input" placeholder="Image URL" />

        <textarea v-model="editDesc" class="form-textarea" placeholder="Description"></textarea>

        <div class="text-end">
          <button class="btn btn-success me-2 px-4" @click="saveEdit">Save</button>
          <button class="btn btn-secondary px-4" @click="cancelEdit">Cancel</button>
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

/* ✅ PRODUCTS */
const products = ref([])

const pTitle = ref("")
const pPrice = ref("")
const pCategory = ref("")
const pImg = ref("")
const pDesc = ref("")

const fetchProducts = () => {
  onSnapshot(collection(db, "products"), (snap) => {
    products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

/* ✅ CATEGORIES */
const categories = ref([])

const fetchCategories = () => {
  onSnapshot(collection(db, "categories"), (snap) => {
    categories.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

const addProduct = async () => {
  const selectedCategory = categories.value.find((c) => c.id === pCategory.value)

  await addDoc(collection(db, "products"), {
    title: pTitle.value,
    price: Number(pPrice.value),
    categoryId: pCategory.value,
    categoryName: selectedCategory?.name || "",
    img: pImg.value,
    desc: pDesc.value,
    createdAt: serverTimestamp(),
  })

  pTitle.value = ""
  pPrice.value = ""
  pCategory.value = ""
  pImg.value = ""
  pDesc.value = ""
}

/* ✅ Edit Product */
const editingProduct = ref(null)

const editTitle = ref("")
const editPrice = ref("")
const editCategory = ref("")
const editImg = ref("")
const editDesc = ref("")

const startEdit = (product) => {
  editingProduct.value = product.id
  editTitle.value = product.title
  editPrice.value = product.price
  editCategory.value = product.categoryId
  editImg.value = product.img
  editDesc.value = product.desc
}

const saveEdit = async () => {
  const selectedCategory = categories.value.find((c) => c.id === editCategory.value)

  await updateDoc(doc(db, "products", editingProduct.value), {
    title: editTitle.value,
    price: Number(editPrice.value),
    categoryId: editCategory.value,
    categoryName: selectedCategory?.name || "",
    img: editImg.value,
    desc: editDesc.value,
  })

  editingProduct.value = null
}

const cancelEdit = () => {
  editingProduct.value = null
}

const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id))
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.admin-products {
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

.form-input,
.form-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-textarea {
  min-height: 100px;
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
  min-width: 700px;
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

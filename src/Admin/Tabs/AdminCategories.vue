<template>
  <div class="admin-categories">

    <!--  Add Category -->
    <div class="card form-card">
      <h4 class="fw-semibold mb-3">Add New Category</h4>

      <form @submit.prevent="addCategory">
        <div class="form-grid">

          <input v-model="cName" class="form-input" placeholder="Category Name" />

          <input v-model="cDesc" class="form-input" placeholder="Description" />

          <input v-model="cImg" class="form-input" placeholder="Image URL" />

          <div class="text-end">
            <button class="btn btn-primary px-4">Add Category</button>
          </div>

        </div>
      </form>
    </div>

    <!--  Categories Table -->
    <div class="card table-card">
      <h4 class="fw-semibold mb-3">All Categories</h4>

      <div class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th style="min-width: 150px">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="c in categories" :key="c.id">
              <td><img :src="c.image" width="60" class="rounded" /></td>
              <td>{{ c.name }}</td>
              <td>{{ c.description }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="startCategoryEdit(c)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteCategory(c.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--  Edit Category -->
    <div v-if="editingCategory" class="card form-card">
      <h5 class="fw-semibold mb-3">Edit Category</h5>

      <div class="form-grid">

        <input v-model="editCName" class="form-input" placeholder="Name" />

        <input v-model="editCDesc" class="form-input" placeholder="Description" />

        <input v-model="editCImg" class="form-input" placeholder="Image URL" />

        <div class="text-end">
          <button class="btn btn-success me-2 px-4" @click="saveCategoryEdit">Save</button>
          <button class="btn btn-secondary px-4" @click="cancelCategoryEdit">Cancel</button>
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

/*  CATEGORIES */
const categories = ref([])

const cName = ref("")
const cDesc = ref("")
const cImg = ref("")

const fetchCategories = () => {
  onSnapshot(collection(db, "categories"), (snap) => {
    categories.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

const addCategory = async () => {
  await addDoc(collection(db, "categories"), {
    name: cName.value,
    description: cDesc.value,
    image: cImg.value,
    createdAt: serverTimestamp(),
  })

  cName.value = ""
  cDesc.value = ""
  cImg.value = ""
}

/*  Edit Category */
const editingCategory = ref(null)

const editCName = ref("")
const editCDesc = ref("")
const editCImg = ref("")

const startCategoryEdit = (cat) => {
  editingCategory.value = cat.id
  editCName.value = cat.name
  editCDesc.value = cat.description
  editCImg.value = cat.image
}

const saveCategoryEdit = async () => {
  await updateDoc(doc(db, "categories", editingCategory.value), {
    name: editCName.value,
    description: editCDesc.value,
    image: editCImg.value,
  })

  editingCategory.value = null
}

const cancelCategoryEdit = () => {
  editingCategory.value = null
}

const deleteCategory = async (id) => {
  await deleteDoc(doc(db, "categories", id))
}

onMounted(fetchCategories)
</script>
<style scoped>
.admin-categories {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/*  Card */
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

/*  Form Layout */
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

/*  Table */
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

/*  Buttons */
.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}
</style>

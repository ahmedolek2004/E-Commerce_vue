<template>
  <div class="container py-5">

    <h2 class="mb-4">Admin Dashboard</h2>

    <!-- ✅ Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">
          Users
        </button>
      </li>

      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">
          Products
        </button>
      </li>

      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'categories' }" @click="activeTab = 'categories'">
          Categories
        </button>
      </li>
    </ul>

    <!-- ✅ USERS TAB -->
    <div v-if="activeTab === 'users'">
      <h4 class="mb-3">Add New User</h4>

      <div class="row g-2 mb-4">
        <div class="col-md-4">
          <input v-model="newName" type="text" placeholder="Name" class="form-control" />
        </div>
        <div class="col-md-4">
          <input v-model="newEmail" type="email" placeholder="Email" class="form-control" />
        </div>
        <div class="col-md-3">
          <select v-model="newRole" class="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="col-md-1 d-grid">
          <button @click="addUser" class="btn btn-primary">Add</button>
        </div>
      </div>

      <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-success">{{ successMsg }}</p>

      <div v-if="users.length > 0" class="table-responsive">
        <table class="table table-striped align-middle">
          <thead class="table-dark">
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style="min-width: 200px">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>
                <span class="badge" :class="u.role === 'admin' ? 'bg-success' : 'bg-secondary'">
                  {{ u.role }}
                </span>
              </td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="startUserEdit(u)">Edit</button>
                <button @click="removeUser(u.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <div v-if="editingUser" class="card p-3 mb-4 shadow-sm">
        <h5>Edit User</h5>

        <input v-model="editUserName" class="form-control mb-2" placeholder="Name" />
        <input v-model="editUserEmail" class="form-control mb-2" placeholder="Email" />
        <select v-model="editUserRole" class="form-select mb-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button class="btn btn-success me-2" @click="saveUserEdit">Save</button>
        <button class="btn btn-secondary" @click="cancelUserEdit">Cancel</button>
      </div>
    </div>

    <!-- ✅ PRODUCTS TAB -->
    <div v-if="activeTab === 'products'">

      <h4 class="mb-3">Add New Product</h4>

      <form @submit.prevent="addProduct" class="mb-4">
        <input v-model="pTitle" class="form-control mb-2" placeholder="Title" />
        <input v-model="pPrice" class="form-control mb-2" placeholder="Price" type="number" />

        <!-- ✅ Dropdown for categories -->
        <select v-model="pCategory" class="form-select mb-2">
          <option disabled value="">Select Category</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>

        <input v-model="pImg" class="form-control mb-2" placeholder="Image URL" />
        <textarea v-model="pDesc" class="form-control mb-2" placeholder="Description"></textarea>

        <button class="btn btn-primary">Add Product</button>
      </form>

      <h4 class="mb-3">All Products</h4>

      <table class="table table-striped">
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
            <td><img :src="p.img" width="60" /></td>
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

      <div v-if="editingProduct" class="card p-3 mb-4 shadow-sm">
        <h5>Edit Product</h5>

        <input v-model="editTitle" class="form-control mb-2" placeholder="Title" />
        <input v-model="editPrice" class="form-control mb-2" placeholder="Price" type="number" />

        <!-- ✅ Dropdown for editing -->
        <select v-model="editCategory" class="form-select mb-2">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>

        <input v-model="editImg" class="form-control mb-2" placeholder="Image URL" />
        <textarea v-model="editDesc" class="form-control mb-2" placeholder="Description"></textarea>

        <button class="btn btn-success me-2" @click="saveEdit">Save</button>
        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>

    </div>

    <!-- ✅ CATEGORIES TAB -->
    <div v-if="activeTab === 'categories'">

      <h4 class="mb-3">Add New Category</h4>

      <form @submit.prevent="addCategory" class="mb-4">
        <input v-model="cName" class="form-control mb-2" placeholder="Category Name" />
        <input v-model="cDesc" class="form-control mb-2" placeholder="Description" />
        <input v-model="cImg" class="form-control mb-2" placeholder="Image URL" />

        <button class="btn btn-primary">Add Category</button>
      </form>

      <h4 class="mb-3">All Categories</h4>

      <table class="table table-striped">
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
            <td><img :src="c.image" width="60" /></td>
            <td>{{ c.name }}</td>
            <td>{{ c.description }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="startCategoryEdit(c)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteCategory(c.id)">Delete</button>
            </td>
          </tr>
        </tbody>

      </table>

      <div v-if="editingCategory" class="card p-3 mb-4 shadow-sm">
        <h5>Edit Category</h5>

        <input v-model="editCName" class="form-control mb-2" placeholder="Name" />
        <input v-model="editCDesc" class="form-control mb-2" placeholder="Description" />
        <input v-model="editCImg" class="form-control mb-2" placeholder="Image URL" />

        <button class="btn btn-success me-2" @click="saveCategoryEdit">Save</button>
        <button class="btn btn-secondary" @click="cancelCategoryEdit">Cancel</button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "../firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore"

const activeTab = ref("users")

/* ✅ USERS */
const users = ref([])
const newName = ref("")
const newEmail = ref("")
const newRole = ref("user")
const errorMsg = ref("")
const successMsg = ref("")

const editingUser = ref(null)
const editUserName = ref("")
const editUserEmail = ref("")
const editUserRole = ref("user")

const startUserEdit = (user) => {
  editingUser.value = user.id
  editUserName.value = user.name || ""
  editUserEmail.value = user.email || ""
  editUserRole.value = user.role || "user"
}

const saveUserEdit = async () => {
  await updateDoc(doc(db, "users", editingUser.value), {
    name: editUserName.value,
    email: editUserEmail.value,
    role: editUserRole.value
  })

  editingUser.value = null
}

const cancelUserEdit = () => {
  editingUser.value = null
}

const fetchUsers = () => {
  onSnapshot(collection(db, "users"), snap => {
    users.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
}

const addUser = async () => {
  if (!newName.value || !newEmail.value) {
    errorMsg.value = "Please fill all fields"
    return
  }

  await addDoc(collection(db, "users"), {
    name: newName.value,
    email: newEmail.value,
    role: newRole.value,
    createdAt: serverTimestamp()
  })

  newName.value = ""
  newEmail.value = ""
  newRole.value = "user"
  successMsg.value = "User added"
}

const removeUser = async (id) => {
  await deleteDoc(doc(db, "users", id))
}

/* ✅ PRODUCTS */
const products = ref([])

const pTitle = ref("")
const pPrice = ref("")
const pCategory = ref("")   // ✅ Dropdown value = categoryId
const pImg = ref("")
const pDesc = ref("")

const fetchProducts = () => {
  onSnapshot(collection(db, "products"), snap => {
    products.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
}

const addProduct = async () => {
  const selectedCategory = categories.value.find(c => c.id === pCategory.value)

  await addDoc(collection(db, "products"), {
    title: pTitle.value,
    price: Number(pPrice.value),
    categoryId: pCategory.value,
    categoryName: selectedCategory?.name || "",
    img: pImg.value,
    desc: pDesc.value,
    createdAt: serverTimestamp()
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
const editCategory = ref("")   // ✅ Dropdown
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
  const selectedCategory = categories.value.find(c => c.id === editCategory.value)

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


/* ✅ CATEGORIES */
const categories = ref([])

const cName = ref("")
const cDesc = ref("")
const cImg = ref("")

const fetchCategories = () => {
  onSnapshot(collection(db, "categories"), snap => {
    categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
}

const addCategory = async () => {
  await addDoc(collection(db, "categories"), {
    name: cName.value,
    description: cDesc.value,
    image: cImg.value,
    createdAt: serverTimestamp()
  })

  cName.value = ""
  cDesc.value = ""
  cImg.value = ""
}

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
    image: editCImg.value
  })

  editingCategory.value = null
}

const cancelCategoryEdit = () => {
  editingCategory.value = null
}

const deleteCategory = async (id) => {
  await deleteDoc(doc(db, "categories", id))
}

/* ✅ Load Data */
onMounted(() => {
  fetchUsers()
  fetchProducts()
  fetchCategories()
})
</script>


<style scoped>
/* ✅ تحسين شكل الجداول */
.table td,
.table th {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}

.table img {
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

/* ✅ تحسين شكل الفورمات */
form input,
form textarea,
form select {
  font-size: 0.95rem;
  border-radius: 8px;
}

form button {
  font-size: 0.9rem;
  border-radius: 6px;
}

/* ✅ تحسين شكل الكروت */
.card {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  background-color: #f9f9f9;
}

/* ✅ تحسين شكل العناوين */
h2, h4, h5 {
  font-weight: 600;
  color: #333;
}

h5 {
  font-size: 1.2rem;
}

/* ✅ تحسين شكل الأزرار */
.btn-sm {
  font-size: 0.8rem;
  padding: 4px 10px;
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #000;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

/* ✅ تحسين شكل التبويبات */
.nav-tabs .nav-link {
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 6px 6px 0 0;
}

.nav-tabs .nav-link.active {
  background-color: #0d6efd;
  color: #fff;
}

/* ✅ تحسين على الموبايل */
@media (max-width: 768px) {
  .table th:first-child,
  .table td:first-child {
    display: none;
  }

  form input,
  form textarea,
  form select {
    font-size: 0.85rem;
  }

  .btn-sm {
    font-size: 0.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1rem;
  }
}


</style>

<template>
  <div class="container py-5 admin-wrapper">

    <h2 class="mb-4 fw-bold">Admin Dashboard</h2>

    <!-- ✅ Tabs -->
    <ul class="nav nav-tabs mb-4 admin-tabs">
      <li class="nav-item" v-for="tab in ['users','categories','products','deals']" :key="tab">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </li>
    </ul>

    <!-- ✅ USERS TAB -->
    <div v-if="activeTab === 'users'">
      <div class="card p-4 shadow-sm mb-4">
        <h4 class="mb-3 fw-semibold">Add New User</h4>

        <form @submit.prevent="addUser">
          <div class="row g-3">
            <div class="col-md-4">
              <input v-model="newName" class="form-control" placeholder="Name" />
            </div>

            <div class="col-md-4">
              <input v-model="newEmail" class="form-control" placeholder="Email" />
            </div>

            <div class="col-md-3">
              <select v-model="newRole" class="form-select">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="col-md-1 text-end">
              <button class="btn btn-primary w-100">Add</button>
            </div>
          </div>
        </form>
      </div>

      <!-- ✅ Users Table -->
      <div class="card p-3 shadow-sm table-card">
        <h4 class="mb-3 fw-semibold">All Users</h4>

        <div class="table-responsive custom-scroll">
          <table class="table table-striped table-hover align-middle">
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
                  <button class="btn btn-danger btn-sm" @click="removeUser(u.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ✅ Edit User -->
      <div v-if="editingUser" class="card p-4 shadow-sm mt-4">
        <h5 class="fw-semibold mb-3">Edit User</h5>

        <div class="row g-3">
          <div class="col-md-4">
            <input v-model="editUserName" class="form-control" placeholder="Name" />
          </div>

          <div class="col-md-4">
            <input v-model="editUserEmail" class="form-control" placeholder="Email" />
          </div>

          <div class="col-md-3">
            <select v-model="editUserRole" class="form-select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="col-md-12 text-end">
            <button class="btn btn-success me-2 px-4" @click="saveUserEdit">Save</button>
            <button class="btn btn-secondary px-4" @click="cancelUserEdit">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ PRODUCTS TAB -->
    <div v-if="activeTab === 'products'">
      <div class="card p-4 shadow-sm mb-4">
        <h4 class="fw-semibold mb-3">Add New Product</h4>

        <form @submit.prevent="addProduct">
          <div class="row g-3">

            <div class="col-md-6">
              <input v-model="pTitle" class="form-control" placeholder="Title" />
            </div>

            <div class="col-md-6">
              <input v-model="pPrice" class="form-control" placeholder="Price" type="number" />
            </div>

            <div class="col-md-6">
              <select v-model="pCategory" class="form-select">
                <option disabled value="">Select Category</option>
                <option v-for="c in categories" :key="c.id" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <input v-model="pImg" class="form-control" placeholder="Image URL" />
            </div>

            <div class="col-12">
              <textarea v-model="pDesc" class="form-control" placeholder="Description"></textarea>
            </div>

            <div class="col-12 text-end">
              <button class="btn btn-primary px-4">Add Product</button>
            </div>

          </div>
        </form>
      </div>

      <!-- ✅ Products Table -->
      <div class="card p-3 shadow-sm table-card">
        <h4 class="fw-semibold mb-3">All Products</h4>

        <div class="table-responsive custom-scroll">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
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
      <div v-if="editingProduct" class="card p-4 shadow-sm mt-4">
        <h5 class="fw-semibold mb-3">Edit Product</h5>

        <div class="row g-3">
          <div class="col-md-6">
            <input v-model="editTitle" class="form-control" placeholder="Title" />
          </div>

          <div class="col-md-6">
            <input v-model="editPrice" class="form-control" placeholder="Price" type="number" />
          </div>

          <div class="col-md-6">
            <select v-model="editCategory" class="form-select">
              <option v-for="c in categories" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <input v-model="editImg" class="form-control" placeholder="Image URL" />
          </div>

          <div class="col-12">
            <textarea v-model="editDesc" class="form-control" placeholder="Description"></textarea>
          </div>

          <div class="col-12 text-end">
            <button class="btn btn-success me-2 px-4" @click="saveEdit">Save</button>
            <button class="btn btn-secondary px-4" @click="cancelEdit">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ CATEGORIES TAB -->
    <div v-if="activeTab === 'categories'">
      <div class="card p-4 shadow-sm mb-4">
        <h4 class="fw-semibold mb-3">Add New Category</h4>

        <form @submit.prevent="addCategory">
          <div class="row g-3">

            <div class="col-md-6">
              <input v-model="cName" class="form-control" placeholder="Category Name" />
            </div>

            <div class="col-md-6">
              <input v-model="cDesc" class="form-control" placeholder="Description" />
            </div>

            <div class="col-12">
              <input v-model="cImg" class="form-control" placeholder="Image URL" />
            </div>

            <div class="col-12 text-end">
              <button class="btn btn-primary px-4">Add Category</button>
            </div>

          </div>
        </form>
      </div>

      <!-- ✅ Categories Table -->
      <div class="card p-3 shadow-sm table-card">
        <h4 class="fw-semibold mb-3">All Categories</h4>

        <div class="table-responsive custom-scroll">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
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

      <!-- ✅ Edit Category -->
      <div v-if="editingCategory" class="card p-4 shadow-sm mt-4">
        <h5 class="fw-semibold mb-3">Edit Category</h5>

        <div class="row g-3">
          <div class="col-md-6">
            <input v-model="editCName" class="form-control" placeholder="Name" />
          </div>

          <div class="col-md-6">
            <input v-model="editCDesc" class="form-control" placeholder="Description" />
          </div>

          <div class="col-12">
            <input v-model="editCImg" class="form-control" placeholder="Image URL" />
          </div>

          <div class="col-12 text-end">
            <button class="btn btn-success me-2 px-4" @click="saveCategoryEdit">Save</button>
            <button class="btn btn-secondary px-4" @click="cancelCategoryEdit">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ DEALS TAB -->
    <div v-if="activeTab === 'deals'">
      <div class="card p-4 shadow-sm mb-4">
        <h4 class="fw-semibold mb-3">Add New Deal</h4>

        <form @submit.prevent="addDeal">
          <div class="row g-3">

            <div class="col-md-6">
              <input v-model="dTitle" class="form-control" placeholder="Deal Title" />
            </div>

            <div class="col-md-6">
              <input v-model="dDesc" class="form-control" placeholder="Description" />
            </div>

            <div class="col-md-6">
              <select v-model="dProductId" class="form-select">
                <option disabled value="">Select Product</option>
                <option v-for="p in products" :key="p.id" :value="p.id">
                  {{ p.title }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <input v-model="dImage" class="form-control" placeholder="Image URL" />
            </div>

            <div class="col-md-6">
              <input v-model="dOriginalPrice" class="form-control" placeholder="Original Price" type="number" />
            </div>

            <div class="col-md-6">
              <input v-model="dDiscountPrice" class="form-control" placeholder="Discount Price" type="number" />
            </div>

            <div class="col-12">
              <input v-model="dValidUntil" class="form-control" placeholder="Valid Until (e.g. 31 Dec 2025)" />
            </div>

            <div class="col-12 text-end">
              <button class="btn btn-primary px-4">Add Deal</button>
            </div>

          </div>
        </form>
      </div>

      <!-- ✅ Deals Table -->
      <div class="card p-3 shadow-sm table-card">
        <h4 class="fw-semibold mb-3">All Deals</h4>

        <div class="table-responsive custom-scroll">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
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
      <div v-if="editingDeal" class="card p-4 shadow-sm mt-4">
        <h5 class="fw-semibold mb-3">Edit Deal</h5>

        <div class="row g-3">
          <div class="col-md-6">
            <input v-model="editDTitle" class="form-control" placeholder="Title" />
          </div>

          <div class="col-md-6">
            <input v-model="editDDesc" class="form-control" placeholder="Description" />
          </div>

          <div class="col-md-6">
            <select v-model="editDProductId" class="form-select">
              <option v-for="p in products" :key="p.id" :value="p.id">
                {{ p.title }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <input v-model="editDImage" class="form-control" placeholder="Image URL" />
          </div>

          <div class="col-md-6">
            <input v-model="editDOriginalPrice" class="form-control" placeholder="Original Price" type="number" />
          </div>

          <div class="col-md-6">
            <input v-model="editDDiscountPrice" class="form-control" placeholder="Discount Price" type="number" />
          </div>

          <div class="col-12">
            <input v-model="editDValidUntil" class="form-control" placeholder="Valid Until" />
          </div>

          <div class="col-12 text-end">
            <button class="btn btn-success me-2 px-4" @click="saveDealEdit">Save</button>
            <button class="btn btn-secondary px-4" @click="cancelDealEdit">Cancel</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const activeTab = ref("users");

/* ✅ USERS */
const users = ref([]);
const newName = ref("");
const newEmail = ref("");
const newRole = ref("user");
const errorMsg = ref("");
const successMsg = ref("");

const editingUser = ref(null);
const editUserName = ref("");
const editUserEmail = ref("");
const editUserRole = ref("user");

const startUserEdit = (user) => {
  editingUser.value = user.id;
  editUserName.value = user.name || "";
  editUserEmail.value = user.email || "";
  editUserRole.value = user.role || "user";
};

const saveUserEdit = async () => {
  await updateDoc(doc(db, "users", editingUser.value), {
    name: editUserName.value,
    email: editUserEmail.value,
    role: editUserRole.value,
  });

  editingUser.value = null;
};

const cancelUserEdit = () => {
  editingUser.value = null;
};

const fetchUsers = () => {
  onSnapshot(collection(db, "users"), (snap) => {
    users.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
};

const addUser = async () => {
  if (!newName.value || !newEmail.value) {
    errorMsg.value = "Please fill all fields";
    return;
  }

  await addDoc(collection(db, "users"), {
    name: newName.value,
    email: newEmail.value,
    role: newRole.value,
    createdAt: serverTimestamp(),
  });

  newName.value = "";
  newEmail.value = "";
  newRole.value = "user";
  successMsg.value = "User added";
};

const removeUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

/* ✅ PRODUCTS */
const products = ref([]);

const pTitle = ref("");
const pPrice = ref("");
const pCategory = ref(""); // ✅ Dropdown value = categoryId
const pImg = ref("");
const pDesc = ref("");

const fetchProducts = () => {
  onSnapshot(collection(db, "products"), (snap) => {
    products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
};

const addProduct = async () => {
  const selectedCategory = categories.value.find((c) => c.id === pCategory.value);

  await addDoc(collection(db, "products"), {
    title: pTitle.value,
    price: Number(pPrice.value),
    categoryId: pCategory.value,
    categoryName: selectedCategory?.name || "",
    img: pImg.value,
    desc: pDesc.value,
    createdAt: serverTimestamp(),
  });

  pTitle.value = "";
  pPrice.value = "";
  pCategory.value = "";
  pImg.value = "";
  pDesc.value = "";
};

/* ✅ Edit Product */
const editingProduct = ref(null);

const editTitle = ref("");
const editPrice = ref("");
const editCategory = ref(""); // ✅ Dropdown
const editImg = ref("");
const editDesc = ref("");

const startEdit = (product) => {
  editingProduct.value = product.id;
  editTitle.value = product.title;
  editPrice.value = product.price;
  editCategory.value = product.categoryId;
  editImg.value = product.img;
  editDesc.value = product.desc;
};

const saveEdit = async () => {
  const selectedCategory = categories.value.find((c) => c.id === editCategory.value);

  await updateDoc(doc(db, "products", editingProduct.value), {
    title: editTitle.value,
    price: Number(editPrice.value),
    categoryId: editCategory.value,
    categoryName: selectedCategory?.name || "",
    img: editImg.value,
    desc: editDesc.value,
  });

  editingProduct.value = null;
};

const cancelEdit = () => {
  editingProduct.value = null;
};

const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

/* ✅ CATEGORIES */
const categories = ref([]);

const cName = ref("");
const cDesc = ref("");
const cImg = ref("");

const fetchCategories = () => {
  onSnapshot(collection(db, "categories"), (snap) => {
    categories.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
};

const addCategory = async () => {
  await addDoc(collection(db, "categories"), {
    name: cName.value,
    description: cDesc.value,
    image: cImg.value,
    createdAt: serverTimestamp(),
  });

  cName.value = "";
  cDesc.value = "";
  cImg.value = "";
};

const editingCategory = ref(null);

const editCName = ref("");
const editCDesc = ref("");
const editCImg = ref("");

const startCategoryEdit = (cat) => {
  editingCategory.value = cat.id;
  editCName.value = cat.name;
  editCDesc.value = cat.description;
  editCImg.value = cat.image;
};

const saveCategoryEdit = async () => {
  await updateDoc(doc(db, "categories", editingCategory.value), {
    name: editCName.value,
    description: editCDesc.value,
    image: editCImg.value,
  });

  editingCategory.value = null;
};

const cancelCategoryEdit = () => {
  editingCategory.value = null;
};

const deleteCategory = async (id) => {
  await deleteDoc(doc(db, "categories", id));
};
/* ✅ DEALS */
const deals = ref([]);

const dTitle = ref("");
const dDesc = ref("");
const dProductId = ref("");
const dOriginalPrice = ref("");
const dDiscountPrice = ref("");
const dValidUntil = ref("");
const dImage = ref("");

const fetchDeals = () => {
  onSnapshot(collection(db, "deals"), (snap) => {
    deals.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  });
};

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
  });

  dTitle.value = "";
  dDesc.value = "";
  dProductId.value = "";
  dOriginalPrice.value = "";
  dDiscountPrice.value = "";
  dValidUntil.value = "";
  dImage.value = "";
};

const editingDeal = ref(null);

const editDTitle = ref("");
const editDDesc = ref("");
const editDProductId = ref("");
const editDOriginalPrice = ref("");
const editDDiscountPrice = ref("");
const editDValidUntil = ref("");
const editDImage = ref("");

const startDealEdit = (deal) => {
  editingDeal.value = deal.id;
  editDTitle.value = deal.title;
  editDDesc.value = deal.description;
  editDProductId.value = deal.productId;
  editDOriginalPrice.value = deal.originalPrice;
  editDDiscountPrice.value = deal.discountPrice;
  editDValidUntil.value = deal.validUntil;
  editDImage.value = deal.image;
};

const saveDealEdit = async () => {
  await updateDoc(doc(db, "deals", editingDeal.value), {
    title: editDTitle.value,
    description: editDDesc.value,
    productId: editDProductId.value,
    originalPrice: Number(editDOriginalPrice.value),
    discountPrice: Number(editDDiscountPrice.value),
    validUntil: editDValidUntil.value,
    image: editDImage.value,
  });

  editingDeal.value = null;
};

const cancelDealEdit = () => {
  editingDeal.value = null;
};

const deleteDeal = async (id) => {
  await deleteDoc(doc(db, "deals", id));
};

/* ✅ Helper: Get product title */
const getProductTitle = (id) => {
  const p = products.value.find((x) => x.id === id);
  return p ? p.title : "Unknown";
};

/* ✅ Load Data */
onMounted(() => {
  fetchUsers();
  fetchProducts();
  fetchCategories();
  fetchDeals();
});
</script>


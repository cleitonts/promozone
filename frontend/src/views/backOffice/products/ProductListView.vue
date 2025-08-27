<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Products"
      icon="fa6-solid:box"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            color="secondary"
            icon="fa6-solid:plus"
            class="position-absolute mt-n5 mb-3"
            :to="{ name: 'productsNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="products"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="6">
            <v-text-field v-model="searchName" label="Product Name" />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Category"
              clearable
            />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'productsEdit', params: { id: element.id } }"
            />
            <v-btn
              color="error"
              size="x-small"
              icon="fa6-solid:trash"
              @click="deleteProduct(element.id)"
              class="ml-1"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const searchName = ref('')
const selectedCategory = ref(null)
const products = ref<any[]>([])
const categories = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)

const headers = {
  action: '#',
  id: 'Id',
  name: 'Name',
  description: 'Description',
  category: 'Category',
  brand: 'Brand',
  price: 'Price',
  stock: 'Stock'
}

const getList = async function () {
  await productStore.fetchAllProducts()
  // Filter products based on search criteria
  let filteredProducts = productStore.products
  
  if (searchName.value) {
      filteredProducts = filteredProducts.filter((product: any) => 
        product.name.toLowerCase().includes(searchName.value.toLowerCase())
      )
    }
    
    if (selectedCategory.value) {
      filteredProducts = filteredProducts.filter((product: any) => 
        product.categoryId === selectedCategory.value
      )
    }
  
  if (filteredProducts) {
    products.value = filteredProducts.map((product: any) => ({
      id: product.id || '',
      name: product.name || '',
      description: product.description || '',
      category: product.category?.name || '',
      brand: product.brand?.name || '',
      price: product.price || 0,
      stock: product.stock || 0
    }))
    totalItems.value = products.value.length
  }
}

const getCategories = async function () {
  await categoryStore.fetchAllCategories()
  if (categoryStore.categories) {
    categories.value = categoryStore.categories
  }
}

const deleteProduct = async function (id: string) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productStore.removeProduct(parseInt(id))
      await getList()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
}

// Watch for search changes
watch([searchName, selectedCategory], () => {
  getList()
})

onMounted(() => {
  getList()
  getCategories()
})
</script>
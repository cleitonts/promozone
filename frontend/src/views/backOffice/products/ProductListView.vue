<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('menu.products')"
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
            <v-text-field v-model="searchName" :label="t('product.fields.name', { default: 'Product Name' })" />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="name"
              item-value="id"
              :label="t('category.fields.category')"
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
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/categories'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { fetchAllProducts, deleteOneProduct, products: productsSource } = useProducts()
const { fetchAllCategories, categories: categoriesSource } = useCategories()
const searchName = ref('')
const selectedCategory = ref(null)
const products = ref<any[]>([])
const categories = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)

const headers = {
  action: '#',
  id: t('common.id'),
  name: t('common.name'),
  description: t('common.description'),
  category: t('category.fields.category'),
  brand: t('brand.fields.brand'),
  price: t('product.fields.price'),
  stock: t('product.fields.stock')
}

const getList = async function () {
  await fetchAllProducts()
  let filteredProducts = productsSource.value
  
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
  await fetchAllCategories()
  if (categoriesSource.value) {
    categories.value = (categoriesSource.value as any)?.edges?.map((e: any) => e.node) || []
  }
}

const deleteProduct = async function (id: string) {
  if (confirm(t('product.confirmDelete'))) {
    try {
      await deleteOneProduct({ id })
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
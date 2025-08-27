<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Product"
      icon="fa6-solid:box"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="validate">
        <v-row>
          <v-col cols="6">
            <v-text-field 
              v-model="product.name" 
              :rules="nameRules" 
              label="Product Name" 
              required 
            />
          </v-col>
          <v-col cols="12">
            <v-textarea 
              v-model="product.description" 
              label="Description" 
              rows="3"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="product.categoryId"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Category"
              required
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="product.brandId"
              :items="brands"
              item-title="name"
              item-value="id"
              label="Brand"
              required
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-container fluid class="justify-end d-flex">
      <v-btn class="success" type="submit" @click="validate"> Save </v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useBrandStore } from '@/stores/brandStore'
import { router } from '@/router'

const route = useRoute()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()

const product = ref({
    name: '',
    description: '',
    categoryId: null as number | null,
    brandId: null as number | null
  })

const categories = ref<any[]>([])
const brands = ref<any[]>([])

const nameRules = [
  (v: string) => !!v || 'Product name is required',
  (v: string) => v.length >= 3 || 'Product name must be at least 3 characters'
]

const validate = async function () {
  if (route.name === 'productsNew') {
    try {
      await productStore.createProduct({
        price: 0,
        slug: '',
        name: product.value.name,
        description: product.value.description,
        categoryId: product.value.categoryId || undefined,
        brandId: product.value.brandId || undefined
      })
      router.push({ name: 'productsList' })
    } catch (error) {
      console.error('Error creating product:', error)
    }
  } else {
    try {
      await productStore.updateProduct(parseInt(route.params.id as string), {
        name: product.value.name,
        description: product.value.description,
        categoryId: product.value.categoryId || undefined,
        brandId: product.value.brandId || undefined
      })
      router.push({ name: 'productsList' })
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }
}

const loadCategories = async () => {
  await categoryStore.fetchAllCategories()
  if (categoryStore.categories) {
    categories.value = categoryStore.categories
  }
}

const loadBrands = async () => {
  await brandStore.fetchAllBrands()
  if (brandStore.brands) {
    brands.value = brandStore.brands
  }
}

// Load product data if editing
onMounted(async () => {
  await loadCategories()
  await loadBrands()
  
  if (route.name !== 'productsNew' && route.params.id) {
    const productId = parseInt(route.params.id as string)
    await productStore.fetchProduct(productId)
    if (productStore.currentProduct) {
      product.value = {
        name: productStore.currentProduct.name || '',
        description: productStore.currentProduct.description || '',
        categoryId: productStore.currentProduct.categoryId || null,
        brandId: productStore.currentProduct.brandId || null
      }
    }
  }
})
</script>
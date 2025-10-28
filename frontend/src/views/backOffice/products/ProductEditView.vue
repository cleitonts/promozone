<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('product.editTitle', { default: 'Product' })"
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
              :label="t('product.fields.name', { default: 'Product Name' })" 
              required 
            />
          </v-col>
          <v-col cols="12">
            <v-textarea 
              v-model="product.description" 
              :label="t('common.description')" 
              rows="3"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="product.categoryId"
              :items="categories"
              item-title="name"
              item-value="id"
              :label="t('category.fields.category')"
              required
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="product.brandId"
              :items="brands"
              item-title="name"
              item-value="id"
              :label="t('brand.fields.brand')"
              required
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-container fluid class="justify-end d-flex">
      <v-btn class="success" type="submit" @click="validate"> {{ t('common.update') }} </v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref, onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/categories'
// import { useBrandStore } from '@/stores/brandStore'
import { useBrands } from '@/composables/brands'
import { router } from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const { fetchProduct, createOneProduct, updateOneProduct, currentProduct } = useProducts()
const { fetchAllCategories, categories: categoriesSource } = useCategories()
// const brandStore = useBrandStore()
const { fetchAllBrands, brands: brandsSource } = useBrands()

const product = ref({
  name: '',
  description: '',
  categoryId: null as string | null,
  brandId: null as string | null
})

const categories = ref<any[]>([])
const brands = ref<any[]>([])

const nameRules = [
  (v: string) => !!v || t('product.fields.name', { default: 'Product Name' }) + ' ' + 'is required',
  (v: string) => v.length >= 3 || 'Product name must be at least 3 characters'
]

const validate = async function () {
  if (route.name === 'productsNew') {
    try {
      await createOneProduct({
        product: {
          price: 0,
          slug: '',
          name: product.value.name,
          description: product.value.description,
          categoryId: product.value.categoryId || undefined,
          brandId: product.value.brandId || undefined
        }
      })
      router.push({ name: 'productsList' })
    } catch (error) {
      console.error('Error creating product:', error)
    }
  } else {
    try {
      await updateOneProduct({
        id: route.params.id as string,
        update: {
          name: product.value.name,
          description: product.value.description,
          categoryId: product.value.categoryId || undefined,
          brandId: product.value.brandId || undefined
        }
      })
      router.push({ name: 'productsList' })
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }
}

const loadCategories = async () => {
  await fetchAllCategories()
  if (categoriesSource.value) {
    categories.value = (categoriesSource.value as any)?.edges?.map((e: any) => e.node) || []
  }
}

const loadBrands = async () => {
  await fetchAllBrands()
  if (brandsSource.value) {
    brands.value = (brandsSource.value as any)?.edges?.map((e: any) => e.node) || []
  }
}

// Load product data if editing
onMounted(async () => {
  await loadCategories()
  await loadBrands()
  
  if (route.name !== 'productsNew' && route.params.id) {
    const productId = String(route.params.id)
    await fetchProduct(productId)
    if (currentProduct.value) {
      product.value = {
        name: currentProduct.value.name || '',
        description: currentProduct.value.description || '',
        categoryId: currentProduct.value.categoryId || null,
        brandId: currentProduct.value.brandId || null
      }
    }
  }
})
</script>
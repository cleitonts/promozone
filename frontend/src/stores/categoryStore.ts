import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  useGetAllCategoriesQuery,
  type GetAllCategoriesQuery
} from '@/generated/graphql'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<GetAllCategoriesQuery['categories']>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all categories
  const fetchAllCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetAllCategoriesQuery()
      if (result.value?.categories) {
        categories.value = result.value.categories
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar categorias'
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchAllCategories
  }
})
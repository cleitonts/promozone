import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
  type GetAllCategoriesQuery,
  type GetCategoryQuery
} from '@/generated/graphql'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<GetAllCategoriesQuery['categories']>([])
  const currentCategory = ref<GetCategoryQuery['category'] | null>(null)
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

  // Fetch single category
  const fetchCategory = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetCategoryQuery({ id })
      if (result.value?.category) {
        currentCategory.value = result.value.category
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar categoria'
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    currentCategory,
    loading,
    error,
    fetchAllCategories,
    fetchCategory
  }
})
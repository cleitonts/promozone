import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  useGetAllBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useRemoveBrandMutation,
  type Brand,
  type CreateBrandDto,
  type UpdateBrandDto,
  type GetAllBrandsQuery,
  type GetBrandQuery
} from '@/generated/graphql'

export const useBrandStore = defineStore('brand', () => {
  const brands = ref<GetAllBrandsQuery['brands']>([])
  const currentBrand = ref<GetBrandQuery['brand'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all brands
  const fetchAllBrands = async () => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetAllBrandsQuery()
      if (result.value?.brands) {
        brands.value = result.value.brands
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar marcas'
    } finally {
      loading.value = false
    }
  }

  // Fetch single brand
  const fetchBrand = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetBrandQuery({ id })
      if (result.value?.brand) {
        currentBrand.value = result.value.brand
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar marca'
    } finally {
      loading.value = false
    }
  }

  // Create brand
  const createBrand = async (brandData: CreateBrandDto) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: createBrandMutation } = useCreateBrandMutation()
      const result = await createBrandMutation({
        createBrandInput: brandData
      })
      
      if (result?.data?.createBrand) {
        await fetchAllBrands() // Refresh the list
        return result.data.createBrand
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar marca'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update brand
  const updateBrand = async (id: number, brandData: UpdateBrandDto) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: updateBrandMutation } = useUpdateBrandMutation()
      const result = await updateBrandMutation({ id, updateBrandInput: brandData })
      if (result?.data?.updateBrand) {
        await fetchAllBrands() // Refresh the list
        return result.data.updateBrand
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar marca'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Remove brand
  const removeBrand = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: removeBrandMutation } = useRemoveBrandMutation()
      const result = await removeBrandMutation({ id })
      if (result?.data?.removeBrand) {
        await fetchAllBrands() // Refresh the list
        return true
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao remover marca'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    brands,
    currentBrand,
    loading,
    error,
    fetchAllBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    removeBrand
  }
})
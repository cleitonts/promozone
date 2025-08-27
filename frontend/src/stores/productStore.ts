import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  type GetAllProductsQuery,
  type GetProductQuery,
  type CreateProductDto,
  type UpdateProductDto
} from '@/generated/graphql'

export const useProductStore = defineStore('product', () => {
  const products = ref<GetAllProductsQuery['products']>([])
  const currentProduct = ref<GetProductQuery['product'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all products
  const fetchAllProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetAllProductsQuery()
      if (result.value?.products) {
        products.value = result.value.products
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar produtos'
    } finally {
      loading.value = false
    }
  }

  // Fetch single product
  const fetchProduct = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { result } = await useGetProductQuery({ id })
      if (result.value?.product) {
        currentProduct.value = result.value.product
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar produto'
    } finally {
      loading.value = false
    }
  }

  // Create product
  const createProduct = async (productData: CreateProductDto) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: createProductMutation } = useCreateProductMutation()
      const result = await createProductMutation({
        createProductInput: productData
      })
      
      if (result?.data?.createProduct) {
        await fetchAllProducts() // Refresh the list
        return result.data.createProduct
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar produto'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update product
  const updateProduct = async (id: number, productData: UpdateProductDto) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: updateProductMutation } = useUpdateProductMutation()
      const result = await updateProductMutation({
        id,
        updateProductInput: productData
      })
      
      if (result?.data?.updateProduct) {
        await fetchAllProducts() // Refresh the list
        return result.data.updateProduct
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar produto'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Remove product
  const removeProduct = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { mutate: removeProductMutation } = useRemoveProductMutation()
      const result = await removeProductMutation({ id })
      
      if (result?.data?.removeProduct) {
        await fetchAllProducts() // Refresh the list
        return true
      }
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao remover produto'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    currentProduct,
    loading,
    error,
    fetchAllProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    removeProduct
  }
})
import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import gql from 'graphql-tag'
import productsQueriesRaw from '@/graphql/queries/products.graphql?raw'
import productsMutationsRaw from '@/graphql/mutations/products.graphql?raw'
import type { DocumentNode } from 'graphql'
import {
  type GetAllProductsQuery,
  type GetProductQuery,
} from '@/generated/graphql'

function pickOperation(doc: DocumentNode, operationName: string): DocumentNode {
  return {
    kind: 'Document',
    definitions: doc.definitions.filter(
      (d: any) => d.kind === 'OperationDefinition' && d.name && d.name.value === operationName
    )
  } as DocumentNode
}

const productsQueriesDoc = gql(productsQueriesRaw)
const productsMutationsDoc = gql(productsMutationsRaw)

const GET_ALL_PRODUCTS = pickOperation(productsQueriesDoc, 'GetAllProducts')
const GET_PRODUCT = pickOperation(productsQueriesDoc, 'GetProduct')
const CREATE_ONE_PRODUCT = pickOperation(productsMutationsDoc, 'CreateOneProduct')
const DELETE_ONE_PRODUCT = pickOperation(productsMutationsDoc, 'DeleteOneProduct')
const UPDATE_ONE_PRODUCT = pickOperation(productsMutationsDoc, 'UpdateOneProduct')

export function useProducts() {
  const products = ref<Array<GetAllProductsQuery['products']['edges'][number]['node']>>([])
  const currentProduct = ref<GetProductQuery['product'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  type CreateProductInput = {
    product: {
      name?: string
      description?: string
      price?: number
      categoryId?: string | number
      brandId?: string | number
      slug?: string
      active?: boolean
    }
  }

  type DeleteProductInput = { id: string }

  type UpdateProductInput = {
    id: string
    update: {
      name?: string
      description?: string
      price?: number
      categoryId?: string | number
      brandId?: string | number
      slug?: string
      active?: boolean
    }
  }

  const fetchAllProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_ALL_PRODUCTS })
      if (result.data?.products?.edges) {
        products.value = result.data.products.edges.map((e: GetAllProductsQuery['products']['edges'][number]) => e.node) || []
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching products'
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_PRODUCT, variables: { id } })
      if (result.data?.product) {
        currentProduct.value = result.data.product
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching product'
    } finally {
      loading.value = false
    }
  }

  const createOneProduct = async (input: CreateProductInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: CREATE_ONE_PRODUCT, variables: { input } })
      if (result.data?.createOneProduct) {
        await fetchAllProducts()
        return result.data.createOneProduct
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error creating product'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOneProduct = async (input: DeleteProductInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: DELETE_ONE_PRODUCT, variables: { input } })
      if (result.data?.deleteOneProduct?.id) {
        await fetchAllProducts()
        return true
      }
      return false
    } catch (err: any) {
      error.value = err?.message || 'Error removing product'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOneProduct = async (input: UpdateProductInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: UPDATE_ONE_PRODUCT, variables: { input } })
      if (result.data?.updateOneProduct) {
        await fetchAllProducts()
        return result.data.updateOneProduct
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error updating product'
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
    createOneProduct,
    deleteOneProduct,
    updateOneProduct,
  }
}
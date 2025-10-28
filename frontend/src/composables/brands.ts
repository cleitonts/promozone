import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import gql from 'graphql-tag'
import brandsQueriesRaw from '@/graphql/queries/brands.graphql?raw'
import brandsMutationsRaw from '@/graphql/mutations/brands.graphql?raw'
import type { DocumentNode } from 'graphql'
import { type GetAllBrandsQuery, type GetBrandQuery } from '@/generated/graphql'

function pickOperation(doc: DocumentNode, operationName: string): DocumentNode {
  return {
    kind: 'Document',
    definitions: doc.definitions.filter(
      (d: any) => d.kind === 'OperationDefinition' && d.name && d.name.value === operationName
    )
  } as DocumentNode
}

const brandsQueriesDoc = gql(brandsQueriesRaw)
const brandsMutationsDoc = gql(brandsMutationsRaw)

const GET_ALL_BRANDS = pickOperation(brandsQueriesDoc, 'GetAllBrands')
const GET_BRAND = pickOperation(brandsQueriesDoc, 'GetBrand')
const CREATE_ONE_BRAND = pickOperation(brandsMutationsDoc, 'CreateOneBrand')
const DELETE_ONE_BRAND = pickOperation(brandsMutationsDoc, 'DeleteOneBrand')
const UPDATE_ONE_BRAND = pickOperation(brandsMutationsDoc, 'UpdateOneBrand')

// Module-scoped singletons to mimic a global store without Pinia
const brands = ref<Array<GetAllBrandsQuery['brands']['edges'][number]['node']>>([])
const currentBrand = ref<GetBrandQuery['brand'] | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Fetch all brands
const fetchAllBrands = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await apolloClient.query({ query: GET_ALL_BRANDS })
    if (result.data?.brands?.edges) {
      brands.value = result.data.brands.edges.map((e: any) => e.node)
    }
  } catch (err: any) {
    error.value = err?.message || 'Error fetching brands'
  } finally {
    loading.value = false
  }
}

// Fetch single brand
const fetchBrand = async (id: number) => {
  loading.value = true
  error.value = null
  try {
    const result = await apolloClient.query({ query: GET_BRAND, variables: { id: String(id) } })
    if (result.data?.brand) {
      currentBrand.value = result.data.brand
    }
  } catch (err: any) {
    error.value = err?.message || 'Error fetching brand'
  } finally {
    loading.value = false
  }
}

// Create brand
type CreateBrandInput = {
  brand: {
    name?: string
    slug?: string
    description?: string
    logoUrl?: string
    website?: string
    country?: string
    active?: boolean
  }
}

type UpdateBrandInput = {
  id: string
  update: {
    name?: string
    slug?: string
    description?: string
    logoUrl?: string
    website?: string
    country?: string
    active?: boolean
  }
}

type DeleteBrandInput = { id: string }

const createBrand = async (brandData: CreateBrandInput) => {
  loading.value = true
  error.value = null
  try {
    const result = await apolloClient.mutate({ mutation: CREATE_ONE_BRAND, variables: { input: brandData } })
    if (result.data?.createOneBrand) {
      await fetchAllBrands()
      return result.data.createOneBrand
    }
    return null
  } catch (err: any) {
    error.value = err?.message || 'Error creating brand'
    throw err
  } finally {
    loading.value = false
  }
}

// Update brand
const updateBrand = async (brandData: UpdateBrandInput) => {
  loading.value = true
  error.value = null
  try {
    const result = await apolloClient.mutate({ mutation: UPDATE_ONE_BRAND, variables: { input: brandData } })
    if (result.data?.updateOneBrand) {
      await fetchAllBrands()
      return result.data.updateOneBrand
    }
    return null
  } catch (err: any) {
    error.value = err?.message || 'Error updating brand'
    throw err
  } finally {
    loading.value = false
  }
}

// Remove brand
const removeBrand = async (id: number | string) => {
  loading.value = true
  error.value = null
  try {
    const result = await apolloClient.mutate({ mutation: DELETE_ONE_BRAND, variables: { input: { id: String(id) } } })
    if (result.data?.deleteOneBrand?.id) {
      await fetchAllBrands()
      return true
    }
    return false
  } catch (err: any) {
    error.value = err?.message || 'Error removing brand'
    throw err
  } finally {
    loading.value = false
  }
}

export function useBrands() {
  return {
    brands,
    currentBrand,
    loading,
    error,
    fetchAllBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    removeBrand,
  }
}
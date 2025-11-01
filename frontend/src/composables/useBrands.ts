import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import {
  type GetAllBrandsQuery,
  type GetBrandQuery,
  GetAllBrandsDocument,
  GetBrandDocument,
  CreateOneBrandDocument,
  UpdateOneBrandDocument,
  DeleteOneBrandDocument,
} from '@/generated/graphql'

const ui = useInterfaceStore()

// Module-scoped singletons to mimic a global store without Pinia
const brands = ref<Array<GetAllBrandsQuery['brands']['edges'][number]['node']>>([])
const currentBrand = ref<GetBrandQuery['brand'] | null>(null)
// Centralize loading via Apollo uiLink and interface store

// Fetch all brands
const fetchAllBrands = async () => {
  const result = await apolloClient.query({ query: GetAllBrandsDocument, context: { uiTarget: 'brands-list' } })
  if (result.data?.brands?.edges) {
    brands.value = result.data.brands.edges.map((e: any) => e.node)
  }
}

// Fetch single brand
const fetchBrand = async (id: number) => {
  const result = await apolloClient.query({ query: GetBrandDocument, variables: { id: String(id) }, context: { uiTarget: 'brand-detail' } })
  if (result.data?.brand) {
    currentBrand.value = result.data.brand
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
  const result = await apolloClient.mutate({ mutation: CreateOneBrandDocument, variables: { input: brandData }, context: { uiTarget: 'brand-save' } })
  if (result.data?.createOneBrand) {
    ui.addMessage('Brand created successfully', EMessageType.Success)
    await fetchAllBrands()
    return result.data.createOneBrand
  }
  return null
}

// Update brand
const updateBrand = async (brandData: UpdateBrandInput) => {
  const result = await apolloClient.mutate({ mutation: UpdateOneBrandDocument, variables: { input: brandData }, context: { uiTarget: 'brand-save' } })
  if (result.data?.updateOneBrand) {
    ui.addMessage('Brand updated successfully', EMessageType.Success)
    await fetchAllBrands()
    return result.data.updateOneBrand
  }
  return null
}

// Remove brand
const removeBrand = async (id: number | string) => {
  const result = await apolloClient.mutate({ mutation: DeleteOneBrandDocument, variables: { input: { id: String(id) } }, context: { uiTarget: 'brand-delete' } })
  if (result.data?.deleteOneBrand?.id) {
    ui.addMessage('Brand removed successfully', EMessageType.Success)
    await fetchAllBrands()
    return true
  }
  return false
}

export function useBrands() {
  return {
    brands,
    currentBrand,
    fetchAllBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    removeBrand,
  }
}
import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { i18n } from '@/plugins/i18n'
import {
  type GetAllProductsQuery,
  type GetProductQuery,
  GetAllProductsDocument,
  GetProductDocument,
  CreateOneProductDocument,
  DeleteOneProductDocument,
  UpdateOneProductDocument,
} from '@/generated/graphql'

const ui = useInterfaceStore()

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
    const result = await apolloClient.query({ query: GetAllProductsDocument, context: { uiTarget: 'products-list' } })
    if (result.data?.products?.edges) {
      products.value = result.data.products.edges.map((e: GetAllProductsQuery['products']['edges'][number]) => e.node) || []
    }
  }

  const fetchProduct = async (id: string) => {
    const result = await apolloClient.query({ query: GetProductDocument, variables: { id }, context: { uiTarget: 'product-detail' } })
    if (result.data?.product) {
      currentProduct.value = result.data.product
    }
  }

  const createOneProduct = async (input: CreateProductInput) => {
    loading.value = true
    error.value = null
    const result = await apolloClient
      .mutate({ mutation: CreateOneProductDocument, variables: { input } })
      .finally(() => {
        loading.value = false
      })
    if (result.data?.createOneProduct) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('product.createSuccess'), EMessageType.Success)
      await fetchAllProducts()
      return result.data.createOneProduct
    }
    return null
  }

  const deleteOneProduct = async (input: DeleteProductInput) => {
    const result = await apolloClient.mutate({ mutation: DeleteOneProductDocument, variables: { input }, context: { uiTarget: 'product-delete' } })
    if (result.data?.deleteOneProduct?.id) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('product.deleteSuccess'), EMessageType.Success)
      await fetchAllProducts()
      return true
    }
    return false
  }

  const updateOneProduct = async (input: UpdateProductInput) => {
    const result = await apolloClient.mutate({ mutation: UpdateOneProductDocument, variables: { input }, context: { uiTarget: 'product-save' } })
    if (result.data?.updateOneProduct) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('product.updateSuccess'), EMessageType.Success)
      await fetchAllProducts()
      return result.data.updateOneProduct
    }
    return null
  }

  return {
    products,
    currentProduct,
    fetchAllProducts,
    fetchProduct,
    createOneProduct,
    deleteOneProduct,
    updateOneProduct,
  }
}
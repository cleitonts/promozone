import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import {
  type GetAllCategoriesQuery,
  type GetCategoryQuery,
  GetAllCategoriesDocument,
  GetCategoryDocument,
  CreateOneCategoryDocument,
  UpdateOneCategoryDocument,
  DeleteOneCategoryDocument,
} from '@/generated/graphql'

const ui = useInterfaceStore()

export function useCategories() {
  const categories = ref<Array<GetAllCategoriesQuery['categories']['edges'][number]['node']>>([])
  const currentCategory = ref<GetCategoryQuery['category'] | null>(null)

  type CreateCategoryInput = {
    category: {
      name?: string
      description?: string
      slug?: string
      active?: boolean
    }
  }

  type UpdateCategoryInput = {
    id: string
    update: {
      name?: string
      description?: string
      slug?: string
      active?: boolean
    }
  }

  type DeleteCategoryInput = { id: string }

  const fetchAllCategories = async () => {
    const result = await apolloClient.query({ query: GetAllCategoriesDocument, context: { uiTarget: 'categories-list' } })
    if (result.data?.categories?.edges) {
      categories.value = result.data.categories.edges.map((e: any) => e.node)
    }
  }

  const fetchCategory = async (id: string) => {
    const result = await apolloClient.query({ query: GetCategoryDocument, variables: { id }, context: { uiTarget: 'category-detail' } })
    if (result.data?.category) {
      currentCategory.value = result.data.category
    }
  }

  const createOneCategory = async (input: CreateCategoryInput) => {
    const result = await apolloClient.mutate({ mutation: CreateOneCategoryDocument, variables: { input }, context: { uiTarget: 'category-save' } })
    if (result.data?.createOneCategory) {
      ui.addMessage('Category created successfully', EMessageType.Success)
      await fetchAllCategories()
      return result.data.createOneCategory
    }
    return null
  }

  const updateOneCategory = async (input: UpdateCategoryInput) => {
    const result = await apolloClient.mutate({ mutation: UpdateOneCategoryDocument, variables: { input }, context: { uiTarget: 'category-save' } })
    if (result.data?.updateOneCategory) {
      ui.addMessage('Category updated successfully', EMessageType.Success)
      await fetchAllCategories()
      return result.data.updateOneCategory
    }
    return null
  }

  const deleteOneCategory = async (input: DeleteCategoryInput) => {
    const result = await apolloClient.mutate({ mutation: DeleteOneCategoryDocument, variables: { input }, context: { uiTarget: 'category-delete' } })
    if (result.data?.deleteOneCategory?.id) {
      ui.addMessage('Category removed successfully', EMessageType.Success)
      await fetchAllCategories()
      return true
    }
    return false
  }

  return {
    categories,
    currentCategory,
    fetchAllCategories,
    fetchCategory,
    createOneCategory,
    updateOneCategory,
    deleteOneCategory,
  }
}
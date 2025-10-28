import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import gql from 'graphql-tag'
import categoriesQueriesRaw from '@/graphql/queries/categories.graphql?raw'
import categoriesMutationsRaw from '@/graphql/mutations/categories.graphql?raw'
import type { DocumentNode } from 'graphql'
import {
  type GetAllCategoriesQuery,
  type GetCategoryQuery,
} from '@/generated/graphql'

function pickOperation(doc: DocumentNode, operationName: string): DocumentNode {
  return {
    kind: 'Document',
    definitions: doc.definitions.filter(
      (d: any) => d.kind === 'OperationDefinition' && d.name && d.name.value === operationName
    )
  } as DocumentNode
}

const categoriesQueriesDoc = gql(categoriesQueriesRaw)
const categoriesMutationsDoc = gql(categoriesMutationsRaw)

const GET_ALL_CATEGORIES = pickOperation(categoriesQueriesDoc, 'GetAllCategories')
const GET_CATEGORY = pickOperation(categoriesQueriesDoc, 'GetCategory')
const CREATE_ONE_CATEGORY = pickOperation(categoriesMutationsDoc, 'CreateOneCategory')
const DELETE_ONE_CATEGORY = pickOperation(categoriesMutationsDoc, 'DeleteOneCategory')
const UPDATE_ONE_CATEGORY = pickOperation(categoriesMutationsDoc, 'UpdateOneCategory')

export function useCategories() {
  const categories = ref<Array<GetAllCategoriesQuery['categories']['edges'][number]['node']>>([])
  const currentCategory = ref<GetCategoryQuery['category'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

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
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_ALL_CATEGORIES })
      if (result.data?.categories?.edges) {
        categories.value = result.data.categories.edges.map((e: any) => e.node)
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching categories'
    } finally {
      loading.value = false
    }
  }

  const fetchCategory = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_CATEGORY, variables: { id } })
      if (result.data?.category) {
        currentCategory.value = result.data.category
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching category'
    } finally {
      loading.value = false
    }
  }

  const createOneCategory = async (input: CreateCategoryInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: CREATE_ONE_CATEGORY, variables: { input } })
      if (result.data?.createOneCategory) {
        await fetchAllCategories()
        return result.data.createOneCategory
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error creating category'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOneCategory = async (input: UpdateCategoryInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: UPDATE_ONE_CATEGORY, variables: { input } })
      if (result.data?.updateOneCategory) {
        await fetchAllCategories()
        return result.data.updateOneCategory
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error updating category'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOneCategory = async (input: DeleteCategoryInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: DELETE_ONE_CATEGORY, variables: { input } })
      if (result.data?.deleteOneCategory?.id) {
        await fetchAllCategories()
        return true
      }
      return false
    } catch (err: any) {
      error.value = err?.message || 'Error removing category'
      throw err
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
    fetchCategory,
    createOneCategory,
    updateOneCategory,
    deleteOneCategory,
  }
}
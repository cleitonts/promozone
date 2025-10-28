import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import gql from 'graphql-tag'
import usersQueriesRaw from '@/graphql/queries/users.graphql?raw'
import usersMutationsRaw from '@/graphql/mutations/users.graphql?raw'
import type { DocumentNode } from 'graphql'

function pickOperation(doc: DocumentNode, operationName: string): DocumentNode {
  return {
    kind: 'Document',
    definitions: doc.definitions.filter(
      (d: any) => d.kind === 'OperationDefinition' && d.name && d.name.value === operationName
    )
  } as DocumentNode
}

const usersQueriesDoc = gql(usersQueriesRaw)
const usersMutationsDoc = gql(usersMutationsRaw)

const GET_ALL_USERS = pickOperation(usersQueriesDoc, 'GetAllUsers')
const GET_USER = pickOperation(usersQueriesDoc, 'GetUser')
const CREATE_USER = pickOperation(usersMutationsDoc, 'CreateUser')

export function useUsers() {
  const users = ref<any[]>([])
  const currentUser = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_ALL_USERS })
      if (result.data?.users?.edges) {
        users.value = result.data.users.edges.map((e: any) => e.node)
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching users'
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_USER, variables: { id } })
      if (result.data?.user) {
        currentUser.value = result.data.user
        return result.data.user
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching user'
    } finally {
      loading.value = false
    }
    return null
  }

  const createUser = async (userData: { email: string; password: string; perfilId?: string; name?: string; tenantId?: string }) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { input: { user: userData } }
      })
      if (result?.data?.createOneUser) {
        await fetchAllUsers()
        return { success: true, user: result.data.createOneUser }
      }
      return { success: false, error: 'Failed to create user' }
    } catch (err: any) {
      error.value = err?.message || 'Error creating user'
      return { success: false, error: 'Failed to create user' }
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchAllUsers,
    fetchUser,
    createUser,
  }
}
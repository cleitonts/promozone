import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import {
  GetAllUsersDocument,
  GetUserDocument,
  CreateUserDocument,
  type GetAllUsersQuery,
  type GetUserQuery,
} from '@/generated/graphql'

const ui = useInterfaceStore()

export function useUsers() {
  const users = ref<any[]>([])
  const currentUser = ref<any | null>(null)

  const fetchAllUsers = async () => {
    const result = await apolloClient.query({ query: GetAllUsersDocument, context: { uiTarget: 'users-list' } })
    if (result.data?.users?.edges) {
      users.value = result.data.users.edges.map((e: GetAllUsersQuery['users']['edges'][number]) => e.node)
    }
  }

  const fetchUser = async (id: string) => {
    const result = await apolloClient.query({ query: GetUserDocument, variables: { id }, context: { uiTarget: 'user-detail' } })
    if (result.data?.user) {
      currentUser.value = result.data.user
      return result.data.user as GetUserQuery['user']
    }
    return null
  }

  const createUser = async (userData: { email: string; password: string; profileId?: string; name?: string; tenantId?: string }) => {
    const result = await apolloClient.mutate({ mutation: CreateUserDocument, variables: { input: { user: userData } }, context: { uiTarget: 'user-create' } })
    if (result?.data?.createOneUser) {
      ui.addMessage('User created successfully', EMessageType.Success)
      await fetchAllUsers()
      return { success: true, user: result.data.createOneUser }
    }
    return { success: false, error: 'Failed to create user' }
  }

  return {
    users,
    currentUser,
    fetchAllUsers,
    fetchUser,
    createUser,
  }
}
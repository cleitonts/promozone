import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGetAllUsersQuery, useGetUserQuery, useCreateUserMutation, type GetAllUsersQuery, type GetUserQuery } from '@/generated/graphql'

export const useUserStore = defineStore('user', () => {
  const users = ref<GetAllUsersQuery['users']>([])
  const currentUser = ref<GetUserQuery['user'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const { mutate: createUserMutation } = useCreateUserMutation()
  
  const fetchAllUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { result } = useGetAllUsersQuery()
      
      if (result.value?.users) {
        users.value = result.value.users
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }
  
  const fetchUser = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const { result } = useGetUserQuery({ id })
      
      if (result.value?.user) {
        currentUser.value = result.value.user
        return result.value.user
      }
    } catch (err) {
      console.error('Error fetching user:', err)
      error.value = 'Failed to fetch user'
    } finally {
      loading.value = false
    }
    
    return null
  }
  
  const createUser = async (userData: { email: string; password: string; perfilId: string }) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await createUserMutation({
        createUserInput: userData
      })
      
      if (result?.data?.createUser) {
        // Refresh users list
        await fetchAllUsers()
        return { success: true, user: result.data.createUser }
      }
      
      return { success: false, error: 'Failed to create user' }
    } catch (err) {
      console.error('Error creating user:', err)
      error.value = 'Failed to create user'
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
    createUser
  }
})
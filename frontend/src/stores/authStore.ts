import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApolloClient } from '@vue/apollo-composable'
import { useLoginMutation, useLogoutMutation, useRefreshTokensMutation } from '@/generated/graphql'

export const useAuthStore = defineStore('auth', () => {
  const { resolveClient } = useApolloClient()
  const apolloClient = resolveClient()
  
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const isAuthenticated = ref<boolean>(!!accessToken.value)
  
  const { mutate: loginMutation } = useLoginMutation()
  const { mutate: logoutMutation } = useLogoutMutation()
  const { mutate: refreshTokensMutation } = useRefreshTokensMutation()
  
  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({
        loginInput: {
          email,
          password
        }
      })
      
      if (result?.data?.login) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.login
        
        accessToken.value = newAccessToken
        refreshToken.value = newRefreshToken
        isAuthenticated.value = true
        
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        
        return { success: true }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }
  
  const logout = async () => {
    try {
      await logoutMutation()
      
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      
      // Clear Apollo cache
      await apolloClient.clearStore()
      
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails on server, clear local data
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      
      await apolloClient.clearStore()
      
      return { success: true }
    }
  }
  
  const refreshTokens = async () => {
    if (!refreshToken.value) {
      return { success: false, error: 'No refresh token available' }
    }
    
    try {
      const result = await refreshTokensMutation({
        refreshToken: refreshToken.value
      })
      
      if (result?.data?.refreshTokens) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.refreshTokens
        
        accessToken.value = newAccessToken
        refreshToken.value = newRefreshToken
        isAuthenticated.value = true
        
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        
        return { success: true }
      }
      
      return { success: false, error: 'Token refresh failed' }
    } catch (error) {
      console.error('Token refresh error:', error)
      // If refresh fails, logout user
      await logout()
      return { success: false, error: 'Token refresh failed' }
    }
  }
  
  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    refreshTokens
  }
})
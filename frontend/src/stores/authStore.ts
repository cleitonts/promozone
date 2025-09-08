import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useLoginMutation, useLogoutMutation, useRefreshTokensMutation, useRenewAccessTokenMutation, UserInfoDocument } from '@/generated/graphql'
import { AccessTokenServiceManager } from '@/services/accessTokenService'
import apolloClient from '@/plugins/apollo'

export const useAuthStore = defineStore('auth', () => {
  
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const isAuthenticated = ref<boolean>(!!accessToken.value)
  const userPermissions = ref<string[]>(JSON.parse(localStorage.getItem('userPermissions') || '[]'))
  const userId = ref<string | null>(localStorage.getItem('userId'))
  
  const { mutate: loginMutation } = useLoginMutation()
  const { mutate: logoutMutation } = useLogoutMutation()
  const { mutate: refreshTokensMutation } = useRefreshTokensMutation()
  const { mutate: renewAccessTokenMutation } = useRenewAccessTokenMutation()
  
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
        AccessTokenServiceManager.initialize()
        await loadUserPermissions()
        
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
      AccessTokenServiceManager.stop()
      
      await logoutMutation()
      
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userPermissions')
      localStorage.removeItem('userId')
      userPermissions.value = []
      userId.value = null
      await apolloClient.clearStore()
      
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userPermissions')
      localStorage.removeItem('userId')
      
      userPermissions.value = []
      userId.value = null
      
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
      await logout()
      return { success: false, error: 'Token refresh failed' }
    }
  }
  
  const renewAccessToken = async () => {
    try {
      if (!accessToken.value) {
        throw new Error('Access token not found')
      }

      const result = await renewAccessTokenMutation({
        accessToken: accessToken.value
      })

      if (result?.data?.renewAccessToken) {
        accessToken.value = result.data.renewAccessToken.accessToken
        refreshToken.value = result.data.renewAccessToken.refreshToken
        
        localStorage.setItem('accessToken', accessToken.value)
        localStorage.setItem('refreshToken', refreshToken.value)
        
        return result.data.renewAccessToken
      }
    } catch (error) {
      console.error('Error renewing access token:', error)
      await logout()
      throw error
    }
  }
  
  const loadUserPermissions = async () => {
    try {
      const result = await apolloClient.query({
        query: UserInfoDocument
      })
      
      if (result.data?.userInfo) {
        const { user, permissions } = result.data.userInfo
        userId.value = user.id
        userPermissions.value = permissions.map((p: any) => p.name)
        localStorage.setItem('userId', userId.value!)
        localStorage.setItem('userPermissions', JSON.stringify(userPermissions.value))
      }
    } catch (error) {
      console.error('Error loading user info:', error)
    }
  }
  
  const hasPermission = (permission: string): boolean => {
    return userPermissions.value.includes(permission)
  }
  
  const isAdmin = (): boolean => {
    return hasPermission('users.create') && 
           hasPermission('tenant.manage')
  }
  
  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    userPermissions,
    userId,
    login,
    logout,
    refreshTokens,
    renewAccessToken,
    loadUserPermissions,
    hasPermission,
    isAdmin
  }
})
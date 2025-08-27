import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApolloClient } from '@vue/apollo-composable'
import { useLoginMutation, useLogoutMutation, useRefreshTokensMutation, useRenewAccessTokenMutation } from '@/generated/graphql'
import { getTokenMonitorService } from '@/services'

export const useAuthStore = defineStore('auth', () => {
  const { resolveClient } = useApolloClient()
  const apolloClient = resolveClient()
  
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const isAuthenticated = ref<boolean>(!!accessToken.value)
  
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
        
        // Iniciar monitoramento de token após login bem-sucedido
        const tokenMonitor = getTokenMonitorService()
        tokenMonitor.startMonitoring()
        
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
      // Parar monitoramento de token antes do logout
      const tokenMonitor = getTokenMonitorService()
      tokenMonitor.stopMonitoring()
      
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
  
  const renewAccessToken = async () => {
    try {
      if (!accessToken.value) {
        throw new Error('Token de acesso não encontrado')
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
      console.error('Erro ao renovar token de acesso:', error)
      // Se falhar ao renovar, fazer logout
      await logout()
      throw error
    }
  }
  
  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    refreshTokens,
    renewAccessToken
  }
})
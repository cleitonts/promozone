import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoginMutation, MeDocument } from '@/generated/graphql'
import { router } from '@/router'
import apolloClient from '@/plugins/apollo'
 

export const useAuthStore = defineStore('auth', () => {
  
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const isAuthenticated = ref<boolean>(!!accessToken.value)
  const userPermissions = ref<string[]>(JSON.parse(localStorage.getItem('userPermissions') || '[]'))
  const userRoles = ref<string[]>(JSON.parse(localStorage.getItem('userRoles') || '[]'))
  const userId = ref<string | null>(localStorage.getItem('userId'))
  const monitorInterval = ref<number | null>(null)
  const renewalInProgress = ref<boolean>(false)
  const RENEWAL_THRESHOLD = 60000
  const EXPIRY_GRACE_MS = 5000

  type TokenPayload = {
    username: string
    perfil: any
    sub: string
    tenantId?: string
    jti?: string
    type: 'access' | 'refresh'
    iat: number
    exp: number
  }

  const decodeToken = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch {
      return null
    }
  }

  const getTimeUntilExpiration = (token: string): number => {
    const payload = decodeToken(token)
    if (!payload || !payload.exp) {
      return 0
    }
    const now = Math.floor(Date.now() / 1000)
    const timeUntilExp = (payload.exp - now) * 1000
    return Math.max(0, timeUntilExp)
  }

  const isTokenNearExpiration = (token: string): boolean => {
    const timeUntilExp = getTimeUntilExpiration(token)
    return timeUntilExp <= RENEWAL_THRESHOLD && timeUntilExp > 0
  }

  const isTokenExpired = (token: string): boolean => {
    const timeUntilExp = getTimeUntilExpiration(token)
    return timeUntilExp + EXPIRY_GRACE_MS <= 0
  }

  const handleTokenExpiration = async () => {
    await logout()
    await router.push('/login')
  }

  const monitorToken = async (): Promise<void> => {
    const currentToken = accessToken.value
    if (!currentToken) {
      stopMonitoring()
      return
    }
    if (isTokenExpired(currentToken)) {
      await handleTokenExpiration()
      return
    }
    if (isTokenNearExpiration(currentToken)) {
      await handleTokenExpiration()
    }
  }

  const startMonitoring = (): void => {
    if (monitorInterval.value) {
      return
    }
    monitorToken()
    monitorInterval.value = window.setInterval(() => {
      monitorToken()
    }, 30000)
  }

  const stopMonitoring = (): void => {
    if (monitorInterval.value) {
      clearInterval(monitorInterval.value)
      monitorInterval.value = null
    }
  }

  const checkTokenNow = (): void => {
    monitorToken()
  }

  const getTokenInfo = (): { isValid: boolean; timeUntilExpiration: number; isNearExpiration: boolean; isExpired: boolean } => {
    const currentToken = accessToken.value
    if (!currentToken) {
      return { isValid: false, timeUntilExpiration: 0, isNearExpiration: false, isExpired: true }
    }
    const timeUntilExpiration = getTimeUntilExpiration(currentToken)
    return {
      isValid: timeUntilExpiration > 0,
      timeUntilExpiration,
      isNearExpiration: timeUntilExpiration <= RENEWAL_THRESHOLD && timeUntilExpiration > 0,
      isExpired: timeUntilExpiration + EXPIRY_GRACE_MS <= 0,
    }
  }
  
  const { mutate: loginMutation } = useLoginMutation()
  
  
  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({
        loginInput: {
          email,
          password
        }
      })
      
      if (result?.data?.login) {
        const { accessToken: newAccessToken } = result.data.login
        
        accessToken.value = newAccessToken
        refreshToken.value = null
        isAuthenticated.value = true
        
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.removeItem('refreshToken')
        startMonitoring()
        await loadCurrentUser()
        
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
      stopMonitoring()
      
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userPermissions')
      localStorage.removeItem('userRoles')
      localStorage.removeItem('userId')
      userPermissions.value = []
      userRoles.value = []
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
      localStorage.removeItem('userRoles')
      localStorage.removeItem('userId')
      
      userPermissions.value = []
      userRoles.value = []
      userId.value = null
      
      await apolloClient.clearStore()
      
      return { success: true }
    }
  }
  
  const refreshTokens = async () => {
    await logout()
    return { success: false, error: 'Token refresh is not supported' }
  }
  
  const renewAccessToken = async () => {
    await logout()
    throw new Error('Access token renewal is not supported')
  }
  
  const loadUserPermissions = async () => {
    userPermissions.value = []
    localStorage.setItem('userPermissions', JSON.stringify(userPermissions.value))
  }
  
  const loadCurrentUser = async () => {
    try {
      const result = await apolloClient.query({
        query: MeDocument,
        fetchPolicy: 'network-only'
      })
      
      if (result.data?.me) {
        userId.value = result.data.me.id
        localStorage.setItem('userId', userId.value!)
        userRoles.value = Array.isArray(result.data.me.roles) ? result.data.me.roles : []
        localStorage.setItem('userRoles', JSON.stringify(userRoles.value))
      }
    } catch (error) {
      console.error('Error loading current user:', error)
    }
  }
  
  const hasPermission = (permission: string): boolean => {
    return userRoles.value.includes('admin') || userPermissions.value.includes(permission)
  }
  
  const isAdmin = (): boolean => {
    return userRoles.value.includes('admin')
  }
  
  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    userPermissions,
    userId,
    userRoles,
    renewalInProgress,
    login,
    logout,
    refreshTokens,
    renewAccessToken,
    loadUserPermissions,
    loadCurrentUser,
    hasPermission,
    isAdmin,
    startMonitoring,
    stopMonitoring,
    checkTokenNow,
    getTokenInfo
  }
})
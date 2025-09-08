import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { RenewAccessTokenDocument } from '@/generated/graphql'
import apolloClient from '@/plugins/apollo'

interface TokenPayload {
  username: string
  perfil: any
  sub: string
  tenantId?: string
  jti?: string
  type: 'access' | 'refresh'
  iat: number
  exp: number
}

export class AccessTokenService {
  private monitorInterval: NodeJS.Timeout | null = null
  private renewalInProgress = ref(false)
  private lastRenewalAttempt = ref(0)
  private readonly RENEWAL_THRESHOLD = 60 * 1000
  private readonly MIN_RENEWAL_INTERVAL = 30 * 1000
  private readonly MAX_RETRY_ATTEMPTS = 3
  private retryCount = 0

  private getAuthStore() {
    return useAuthStore()
  }

  private getRouter() {
    return useRouter()
  }

  private async renewTokenMutation(variables: { accessToken: string }) {
    return await apolloClient.mutate({
      mutation: RenewAccessTokenDocument,
      variables
    })
  }

  private decodeToken(token: string): TokenPayload | null {
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
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  private getTimeUntilExpiration(token: string): number {
    const payload = this.decodeToken(token)
    if (!payload || !payload.exp) {
      return 0
    }
    
    const now = Math.floor(Date.now() / 1000)
    const timeUntilExp = (payload.exp - now) * 1000
    return Math.max(0, timeUntilExp)
  }

  private isTokenNearExpiration(token: string): boolean {
    const timeUntilExp = this.getTimeUntilExpiration(token)
    return timeUntilExp <= this.RENEWAL_THRESHOLD && timeUntilExp > 0
  }

  private isTokenExpired(token: string): boolean {
    const timeUntilExp = this.getTimeUntilExpiration(token)
    return timeUntilExp <= 0
  }

  private async renewToken(): Promise<boolean> {
    if (this.renewalInProgress.value) {
      return false
    }

    const now = Date.now()
    if (now - this.lastRenewalAttempt.value < this.MIN_RENEWAL_INTERVAL) {
      return false
    }

    const currentToken = this.getAuthStore().accessToken
    if (!currentToken) {
      await this.handleTokenExpiration()
      return false
    }

    this.renewalInProgress.value = true
    this.lastRenewalAttempt.value = now

    try {
      console.log('🔄 Renewing access token...')
      
      const result = await this.renewTokenMutation({
        accessToken: currentToken
      })

      if (result?.data?.renewAccessToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.renewAccessToken
        
        const authStore = this.getAuthStore()
        authStore.accessToken = newAccessToken
        authStore.refreshToken = newRefreshToken
        authStore.isAuthenticated = true
        
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        
        this.updateAuthorizationHeaders(newAccessToken)
        
        console.log('✅ Access token renewed successfully')
        this.retryCount = 0
        return true
      } else {
        throw new Error('Invalid server response')
      }
    } catch (error: any) {
      console.error('❌ Error renewing token:', error)
      
      this.retryCount++
      
      if (error.message?.includes('expired') || 
          error.message?.includes('Invalid token') ||
          this.retryCount >= this.MAX_RETRY_ATTEMPTS) {
        await this.handleTokenExpiration()
        return false
      }
      
      return false
    } finally {
      this.renewalInProgress.value = false
    }
  }

  private updateAuthorizationHeaders(token: string): void {
    console.log('🔄 Authorization headers updated')
  }

  private async handleTokenExpiration(): Promise<void> {
    console.log('🚪 Token expired - performing automatic logout')
    
    try {
      await this.getAuthStore().logout()
      await this.getRouter().push('/login') 
      this.showExpirationMessage()
      
    } catch (error) {
      console.error('Error during automatic logout:', error)
      
      const authStore = this.getAuthStore()
      authStore.accessToken = null
      authStore.refreshToken = null
      authStore.isAuthenticated = false
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      
      await this.getRouter().push('/login')
      this.showExpirationMessage()
    }
  }

  private showExpirationMessage(): void {
    console.log('⚠️ Session expired. Please log in again.')
    setTimeout(() => {
      alert('Session expired. Please log in again.')
    }, 100)
  }

  private monitorToken(): void {
    const currentToken = this.getAuthStore().accessToken
    
    if (!currentToken) {
      this.stopMonitoring()
      return
    }

    if (this.isTokenExpired(currentToken)) {
      this.handleTokenExpiration()
      return
    }

    if (this.isTokenNearExpiration(currentToken)) {
      this.renewToken()
    }
  }

  public startMonitoring(): void {
    if (this.monitorInterval) {
      return
    }

    console.log('🔍 Initializing token monitoring')
    this.monitorToken()
    this.monitorInterval = setInterval(() => {
      this.monitorToken()
    }, 30000)
  }

  public stopMonitoring(): void {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval)
      this.monitorInterval = null
      console.log('⏹️ Token monitoring stopped')
    }
  }

  public checkTokenNow(): void {
    this.monitorToken()
  }

  public getTokenInfo(): {
    isValid: boolean
    timeUntilExpiration: number
    isNearExpiration: boolean
    isExpired: boolean
  } {
    const currentToken = this.getAuthStore().accessToken
    
    if (!currentToken) {
      return {
        isValid: false,
        timeUntilExpiration: 0,
        isNearExpiration: false,
        isExpired: true
      }
    }

    const timeUntilExpiration = this.getTimeUntilExpiration(currentToken)
    
    return {
      isValid: timeUntilExpiration > 0,
      timeUntilExpiration,
      isNearExpiration: this.isTokenNearExpiration(currentToken),
      isExpired: this.isTokenExpired(currentToken)
    }
  }

  public get isRenewing(): boolean {
    return this.renewalInProgress.value
  }
}

let accessTokenServiceInstance: AccessTokenService | null = null

export class AccessTokenServiceManager {
  static initialize(): void {
    if (!accessTokenServiceInstance) {
      accessTokenServiceInstance = new AccessTokenService()
    }
    accessTokenServiceInstance.startMonitoring()
    console.log('🚀 Access token service initialized')
  }

  static stop(): void {
    if (accessTokenServiceInstance) {
      accessTokenServiceInstance.stopMonitoring()
      console.log('🛑 Access token service stopped')
    }
  }

  static getInstance(): AccessTokenService | null {
    return accessTokenServiceInstance
  }
}

export function useTokenMonitor() {
  const instance = AccessTokenServiceManager.getInstance()
  if (!instance) {
    throw new Error('AccessTokenService not initialized. Call AccessTokenServiceManager.initialize() first.')
  }
  return {
    startMonitoring: () => instance.startMonitoring(),
    stopMonitoring: () => instance.stopMonitoring(),
    checkTokenNow: () => instance.checkTokenNow(),
    getTokenInfo: () => instance.getTokenInfo(),
    isRenewing: instance.isRenewing
  }
}
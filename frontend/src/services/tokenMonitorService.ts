import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useRenewAccessTokenMutation } from '@/generated/graphql'

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

export class TokenMonitorService {
  private monitorInterval: NodeJS.Timeout | null = null
  private renewalInProgress = ref(false)
  private lastRenewalAttempt = ref(0)
  private readonly RENEWAL_THRESHOLD = 60 * 1000 // 1 minuto em milliseconds
  private readonly MIN_RENEWAL_INTERVAL = 30 * 1000 // 30 segundos entre tentativas
  private readonly MAX_RETRY_ATTEMPTS = 3
  private retryCount = 0
  
  constructor() {
    // Não inicializar composables no construtor para evitar problemas de inicialização circular
  }

  /**
   * Obtém a instância do authStore
   */
  private getAuthStore() {
    return useAuthStore()
  }

  /**
   * Obtém a instância do router
   */
  private getRouter() {
    return useRouter()
  }

  /**
   * Obtém a função de mutação para renovar token
   */
  private getRenewTokenMutation() {
    const { mutate } = useRenewAccessTokenMutation()
    return mutate
  }

  /**
   * Decodifica um JWT token sem verificar a assinatura
   */
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
      console.error('Erro ao decodificar token:', error)
      return null
    }
  }

  /**
   * Calcula o tempo restante até a expiração do token em milliseconds
   */
  private getTimeUntilExpiration(token: string): number {
    const payload = this.decodeToken(token)
    if (!payload || !payload.exp) {
      return 0
    }
    
    const now = Math.floor(Date.now() / 1000)
    const timeUntilExp = (payload.exp - now) * 1000
    return Math.max(0, timeUntilExp)
  }

  /**
   * Verifica se o token está próximo da expiração (1 minuto)
   */
  private isTokenNearExpiration(token: string): boolean {
    const timeUntilExp = this.getTimeUntilExpiration(token)
    return timeUntilExp <= this.RENEWAL_THRESHOLD && timeUntilExp > 0
  }

  /**
   * Verifica se o token já expirou
   */
  private isTokenExpired(token: string): boolean {
    const timeUntilExp = this.getTimeUntilExpiration(token)
    return timeUntilExp <= 0
  }

  /**
   * Renova o token de acesso
   */
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
      console.log('🔄 Renovando token de acesso...')
      
      const renewMutation = this.getRenewTokenMutation()
      const result = await renewMutation({
        accessToken: currentToken
      })

      if (result?.data?.renewAccessToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.renewAccessToken
        
        // Atualizar tokens no store
        const authStore = this.getAuthStore()
        authStore.accessToken = newAccessToken
        authStore.refreshToken = newRefreshToken
        authStore.isAuthenticated = true
        
        // Atualizar localStorage
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        
        // Atualizar headers de autorização (será feito pelo interceptor)
        this.updateAuthorizationHeaders(newAccessToken)
        
        console.log('✅ Token renovado com sucesso')
        this.retryCount = 0
        return true
      } else {
        throw new Error('Resposta inválida do servidor')
      }
    } catch (error: any) {
      console.error('❌ Erro ao renovar token:', error)
      
      this.retryCount++
      
      // Se o token expirou ou atingiu o máximo de tentativas, fazer logout
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

  /**
   * Atualiza os headers de autorização para requisições futuras
   */
  private updateAuthorizationHeaders(token: string): void {
    // Os headers serão atualizados automaticamente pelos interceptors
    // quando o token for atualizado no localStorage
    console.log('🔄 Headers de autorização atualizados')
  }

  /**
   * Manipula a expiração do token fazendo logout automático
   */
  private async handleTokenExpiration(): Promise<void> {
    console.log('🚪 Token expirado - fazendo logout automático')
    
    try {
      // Limpar todos os dados de autenticação
      await this.getAuthStore().logout()
      
      // Redirecionar para login
      await this.getRouter().push('/login')
      
      // Exibir mensagem ao usuário
      this.showExpirationMessage()
      
    } catch (error) {
      console.error('Erro durante logout automático:', error)
      
      // Forçar limpeza manual se o logout falhar
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

  /**
   * Exibe mensagem de expiração para o usuário
   */
  private showExpirationMessage(): void {
    // Implementar notificação (pode usar Vuetify snackbar, toast, etc.)
    console.log('⚠️ Sua sessão expirou. Por favor, faça login novamente.')
    
    // Exemplo com alert (substituir por notificação mais elegante)
    setTimeout(() => {
      alert('Sua sessão expirou. Por favor, faça login novamente.')
    }, 100)
  }

  /**
   * Monitora o token periodicamente
   */
  private monitorToken(): void {
    const currentToken = this.getAuthStore().accessToken
    
    if (!currentToken) {
      this.stopMonitoring()
      return
    }

    // Verificar se o token já expirou
    if (this.isTokenExpired(currentToken)) {
      this.handleTokenExpiration()
      return
    }

    // Verificar se está próximo da expiração
    if (this.isTokenNearExpiration(currentToken)) {
      this.renewToken()
    }
  }

  /**
   * Inicia o monitoramento do token
   */
  public startMonitoring(): void {
    if (this.monitorInterval) {
      return
    }

    console.log('🔍 Iniciando monitoramento de token')
    
    // Verificar imediatamente
    this.monitorToken()
    
    // Configurar verificação periódica a cada 30 segundos
    this.monitorInterval = setInterval(() => {
      this.monitorToken()
    }, 30000)
  }

  /**
   * Para o monitoramento do token
   */
  public stopMonitoring(): void {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval)
      this.monitorInterval = null
      console.log('⏹️ Monitoramento de token parado')
    }
  }

  /**
   * Força uma verificação imediata do token
   */
  public checkTokenNow(): void {
    this.monitorToken()
  }

  /**
   * Retorna informações sobre o estado atual do token
   */
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

  /**
   * Propriedade reativa para verificar se a renovação está em progresso
   */
  public get isRenewing(): boolean {
    return this.renewalInProgress.value
  }
}

// Instância singleton do serviço
export const tokenMonitorService = new TokenMonitorService()

// Composable para usar o serviço em componentes Vue
export function useTokenMonitor() {
  return {
    startMonitoring: () => tokenMonitorService.startMonitoring(),
    stopMonitoring: () => tokenMonitorService.stopMonitoring(),
    checkTokenNow: () => tokenMonitorService.checkTokenNow(),
    getTokenInfo: () => tokenMonitorService.getTokenInfo(),
    isRenewing: computed(() => tokenMonitorService.isRenewing)
  }
}
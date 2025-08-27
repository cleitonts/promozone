import { TokenMonitorService } from './tokenMonitorService'

// Instância singleton do serviço de monitoramento de token
let tokenMonitorInstance: TokenMonitorService | null = null

/**
 * Obtém a instância singleton do serviço de monitoramento de token
 */
export function getTokenMonitorService(): TokenMonitorService {
  if (!tokenMonitorInstance) {
    tokenMonitorInstance = new TokenMonitorService()
  }
  return tokenMonitorInstance
}

/**
 * Inicializa o serviço de monitoramento de token
 * Deve ser chamado na inicialização da aplicação
 */
export function initializeTokenMonitoring(): void {
  const service = getTokenMonitorService()
  service.startMonitoring()
  console.log('🚀 Serviço de monitoramento de token inicializado')
}

/**
 * Para o serviço de monitoramento de token
 * Deve ser chamado ao fazer logout ou encerrar a aplicação
 */
export function stopTokenMonitoring(): void {
  if (tokenMonitorInstance) {
    tokenMonitorInstance.stopMonitoring()
    console.log('🛑 Serviço de monitoramento de token parado')
  }
}

export { TokenMonitorService }
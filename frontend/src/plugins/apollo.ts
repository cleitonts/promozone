import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/authStore'
import { getTokenMonitorService } from '@/services'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Auth link to add authorization header
const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Error link to handle token expiration
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Verificar se o erro é relacionado a token expirado
      if (err.extensions?.code === 'UNAUTHENTICATED' || 
          err.message.includes('jwt expired') ||
          err.message.includes('invalid token') ||
          err.message.includes('Token expired')) {
        console.warn('🔒 Token expirado detectado, fazendo logout automático')
        
        // Acionar logout automático através do authStore
         const authStore = useAuthStore()
         authStore.logout()
        
        return
      }
    }
  }
  
  if (networkError) {
    // Verificar erros de rede relacionados a autenticação
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      console.warn('🔒 Erro 401 detectado, fazendo logout automático')
       
       const authStore = useAuthStore()
       authStore.logout()
    }
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

export default apolloClient
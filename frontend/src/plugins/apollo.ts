import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/authStore'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

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

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED' || 
          err.message.includes('jwt expired') ||
          err.message.includes('invalid token') ||
          err.message.includes('Token expired')) {
        console.warn('🔒 Token expired detected, performing automatic logout')
        
         const authStore = useAuthStore()
         authStore.logout()
        
        return
      }
    }
  }
  
  if (networkError) {
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      console.warn('🔒 Network error 401 detected, performing automatic logout')
       
       const authStore = useAuthStore()
       authStore.logout()
    }
  }
})

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
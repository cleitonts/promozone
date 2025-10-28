import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  const store = useAuthStore()
  const { accessToken } = storeToRefs(store)
  const token = accessToken.value
  
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  const ctx = operation.getContext() as any

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      const isUnauth = err.extensions?.code === 'UNAUTHENTICATED' ||
        err.message?.includes('jwt expired') ||
        err.message?.includes('invalid token') ||
        err.message?.includes('Token expired')

      if (isUnauth) {
        const authStore = useAuthStore()
        authStore.checkTokenNow()

        if (!ctx.__retryOnce) {
          ctx.__retryOnce = true
          operation.setContext(ctx)
          return forward(operation)
        }

        authStore.logout()
        return
      }
    }
  }
  
  if (networkError && 'statusCode' in networkError && (networkError as any).statusCode === 401) {
    const authStore = useAuthStore()
    authStore.checkTokenNow()

    if (!ctx.__retryOnce) {
      ctx.__retryOnce = true
      operation.setContext(ctx)
      return forward(operation)
    }

    authStore.logout()
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
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client/core'
import { Observable } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/authStore'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { useTenantStore } from '@/stores/tenantStore'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  const store = useAuthStore()
  const token = localStorage.getItem('accessToken')
  const tenantStore = useTenantStore()
  const tenantId = tenantStore.currentTenantId || ''

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'x-tenant-id': tenantId,
    },
  }
})

const uiLink = new ApolloLink((operation, forward) => {
  const interfaceStore = useInterfaceStore()
  const ctx = operation.getContext() as any
  const target = ctx?.uiTarget || 'main-content'
  interfaceStore.beginRequest(target)
  const observable = forward(operation)
  return new Observable((observer) => {
    const sub = observable.subscribe({
      next: (value) => observer.next(value),
      error: (err) => {
        interfaceStore.endRequest(target)
        observer.error(err)
      },
      complete: () => {
        interfaceStore.endRequest(target)
        observer.complete()
      },
    })
    return () => {
      sub.unsubscribe()
    }
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const ui = useInterfaceStore()
  const auth = useAuthStore()

  const handleStatus = (status?: number) => {
    if (!status) return false
    if (status === 401) {
      ui.prepareLoginRecovery()
      ui.addMessage('Authentication required. Please login again.', EMessageType.Warning)
      ui.forceLogin()
      return true
    }
    if (status === 403) {
      ui.addMessage('Access denied. Redirecting to home.', EMessageType.Danger)
      ui.redirectHome()
      return true
    }
    return false
  }

  let handled = false
  if (graphQLErrors && graphQLErrors.length > 0) {
    const first = graphQLErrors[0] as any
    const status = first?.extensions?.code === 'UNAUTHENTICATED' ? 401 : first?.extensions?.status
    handled = handleStatus(status)
    if (!handled) {
      ui.addMessage(String(first?.message || 'GraphQL error'), EMessageType.Danger)
    }
  } else if (networkError) {
    const anyErr = networkError as any
    const status = anyErr?.statusCode || anyErr?.status
    handled = handleStatus(status)
    if (!handled) {
      ui.addMessage(String(networkError), EMessageType.Danger)
    }
  }
})

const link = ApolloLink.from([errorLink, authLink, uiLink, httpLink])

export const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'none',
    },
    mutate: {
      errorPolicy: 'none',
    },
  },
})

export default apolloClient
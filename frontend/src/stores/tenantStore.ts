import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@/plugins/localStorage'
import apolloClient from '@/plugins/apollo'
import { GetTenantsDocument } from '@/generated/graphql'
import { UpdateActiveTenantDocument } from '@/generated/graphql'
import { useAuthStore } from '@/stores/authStore'

type SimpleTenant = { id: string; name: string }

export const useTenantStore = defineStore('tenant', () => {
  const currentTenantId = useLocalStorage<string | null>('currentTenantId', null)
  const availableTenants = useLocalStorage<SimpleTenant[]>('availableTenants', [])
  const favoritesByUser = useLocalStorage<Record<string, string[]>>('tenantFavoritesByUser', {})

  const setAvailableTenants = (list: SimpleTenant[]) => {
    availableTenants.value = list
    if (!currentTenantId.value && list.length > 0) {
      currentTenantId.value = list[0].id
    }
  }

  const setCurrentTenant = async (id: string | null) => {
    currentTenantId.value = id

    if (!id) return

    try {
      await apolloClient.mutate({
        mutation: UpdateActiveTenantDocument,
        variables: { input: { tenantId: id } },
        context: { uiTarget: 'main-content' },
      })
    } catch (err) {
      console.error('Error updating active tenant:', err)
    }
  }

  const isFavorite = (tenantId: string): boolean => {
    const authStore = useAuthStore()
    const { userId } = storeToRefs(authStore)
    const favs = favoritesByUser.value[userId.value || ''] || []
    return favs.includes(tenantId)
  }

  const toggleFavorite = (tenantId: string) => {
    const authStore = useAuthStore()
    const { userId } = storeToRefs(authStore)
    const key = userId.value || ''
    const favs = favoritesByUser.value[key] || []
    const exists = favs.includes(tenantId)
    const next = exists ? favs.filter(id => id !== tenantId) : [...favs, tenantId]
    favoritesByUser.value = { ...favoritesByUser.value, [key]: next }

    if (authStore.isAdmin()) {
      const favored = availableTenants.value.filter(t => next.includes(t.id))
      setAvailableTenants(favored)
      if (!favored.find(t => t.id === currentTenantId.value)) {
        setCurrentTenant(favored[0]?.id || null)
      }
    }
  }

  const initAfterLogin = async () => {
    const authStore = useAuthStore()
    const { userId } = storeToRefs(authStore)
    const res = await apolloClient.query({ query: GetTenantsDocument })
    const nodes: Array<any> = (res.data?.tenants?.edges || []).map((e: any) => e.node)
    const allSimple: SimpleTenant[] = nodes.map((n: any) => ({ id: n.id, name: n.name }))

    if (authStore.isAdmin()) {
      const favs = favoritesByUser.value[userId.value || ''] || []
      const favored = allSimple.filter(t => favs.includes(t.id))
      setAvailableTenants(favored)
      if (favored.length === 0) {
        setCurrentTenant(null)
      }
      return
    }

    const uid = userId.value
    const visible = nodes.filter((n: any) => {
      if (n.ownerId === uid) return true
      const users = (n.profiles || []).flatMap((p: any) => p.users || [])
      return users.some((u: any) => u.id === uid)
    })
    const simpleVisible: SimpleTenant[] = visible.map((n: any) => ({ id: n.id, name: n.name }))
    setAvailableTenants(simpleVisible)
  }

  return {
    currentTenantId,
    availableTenants,
    setAvailableTenants,
    setCurrentTenant,
    initAfterLogin,
    isFavorite,
    toggleFavorite,
  }
})
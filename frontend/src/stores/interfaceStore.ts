import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@/plugins/localStorage'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { router } from '@/router'
import { useTenantStore } from '@/stores/tenantStore'

export enum EMessageType {
  Danger = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export interface IMessage {
  text: string
  type: EMessageType
  time: number
  id: number
}

export const useInterfaceStore = defineStore('interface', () => {
  const STATE = {
    menuOpen: useLocalStorage('menuOpen', false),
    pageTitle: ref(''),
    lastId: ref(0),
    loading: ref(0),
    requestLoaders: ref<Record<string, number>>({}),
    messages: ref<IMessage[]>([]),
    token: useLocalStorage<string | null>('token', null),
    refreshToken: useLocalStorage<string | null>('refreshToken', null),
    postLoginTarget: ref<string | null>(null),
    formSnapshot: ref<Record<string, string>>({}),
  }

  const ACTIONS = {
    switchMenu(): void {
      STATE.menuOpen.value = !STATE.menuOpen.value
    },

    addMessage(text: string, type: EMessageType, time: number = 5000): void {
      STATE.lastId.value++
      const message: IMessage = {
        text,
        type,
        time,
        id: STATE.lastId.value,
      }
      STATE.messages.value.unshift(message)
    },

    removeMessage(id: number): void {
      const indexToDelete = STATE.messages.value.findIndex((n) => n.id === id)
      if (indexToDelete !== -1) {
        STATE.messages.value.splice(indexToDelete, 1)
      }
    },

    processReturn(arr: { text: string; type: EMessageType }[]): void {
      arr.forEach(({ text, type }) => {
        ACTIONS.addMessage(text, type)
      })
    },

    dcrLoading(): void {
      STATE.loading.value--
    },

    addLoading(): void {
      STATE.loading.value++
    },

    beginRequest(target: string): void {
      const map = STATE.requestLoaders.value
      const count = map[target] || 0
      map[target] = count + 1
    },

    endRequest(target: string): void {
      const map = STATE.requestLoaders.value
      const count = map[target] || 0
      map[target] = Math.max(0, count - 1)
    },

    isLoading(target: string): boolean {
      const map = STATE.requestLoaders.value
      return (map[target] || 0) > 0
    },

    async login(email: string, password: string): Promise<void> {
      try {
        const authStore = useAuthStore()
        const result = await authStore.login(email, password)

        if (result.success) {
          const { accessToken, refreshToken } = storeToRefs(authStore)
          STATE.token.value = accessToken.value ?? null
          STATE.refreshToken.value = refreshToken.value ?? null
        const tenantStore = useTenantStore()
        await tenantStore.initAfterLogin()
        if (STATE.postLoginTarget.value) {
          await router.push(STATE.postLoginTarget.value)
          ACTIONS.restoreUnsavedInputs()
          STATE.postLoginTarget.value = null
        } else if (authStore.isAdmin()) {
          await router.push({ name: 'adminDashboard' })
        } else {
          await router.push('/bo/home')
        }
        return
        }

        throw new Error(result.error || 'Not possible to login')
      } catch (error) {
        console.log(error)
      }
    },

    /** this must continue the flow even with error */
    async logout(): Promise<boolean> {
      let error = false
      try {
        const authStore = useAuthStore()
        const result = await authStore.logout()
        error = !result.success
      } catch {
        console.log('backend seems to be down')
        error = true
      }

      STATE.token.value = null
      STATE.refreshToken.value = null
      document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      await router.push({ name: 'login' })
      const tenantStore = useTenantStore()
      tenantStore.setCurrentTenant(null)
      /** keep availableTenants persisted; do not clear on logout */
      return error
    },

    setTokens(accessToken: string, refreshToken: string) {
      STATE.token.value = accessToken
      STATE.refreshToken.value = refreshToken
    },

    captureUnsavedInputs(): void {
      const snapshot: Record<string, string> = {}
      const elements = Array.from(document.querySelectorAll('input, textarea, select')) as Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      elements.forEach((el) => {
        const key = el.getAttribute('name') || el.getAttribute('id') || ''
        if (!key) return
        if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
          snapshot[key] = el.checked ? '1' : '0'
        } else {
          snapshot[key] = String(el.value ?? '')
        }
      })
      STATE.formSnapshot.value = snapshot
    },

    restoreUnsavedInputs(): void {
      const snapshot = STATE.formSnapshot.value
      if (!snapshot || Object.keys(snapshot).length === 0) return
      const apply = () => {
        Object.keys(snapshot).forEach((key) => {
          const byName = document.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
          const el = byName || (document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)
          if (!el) return
          const val = snapshot[key]
          if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
            el.checked = val === '1'
          } else {
            el.value = val
            el.dispatchEvent(new Event('input', { bubbles: true }))
            el.dispatchEvent(new Event('change', { bubbles: true }))
          }
        })
        STATE.formSnapshot.value = {}
      }
      setTimeout(apply, 50)
    },

    clearUnsavedInputs(): void {
      STATE.formSnapshot.value = {}
    },

    prepareLoginRecovery(): void {
      ACTIONS.captureUnsavedInputs()
      const current = router.currentRoute.value
      STATE.postLoginTarget.value = current.fullPath
    },

    forceLogin(): void {
      router.push({ name: 'login' })
    },

    redirectHome(): void {
      router.push('/bo/home')
    },
  }

  return {
    ...STATE,
    ...ACTIONS,
  }
})

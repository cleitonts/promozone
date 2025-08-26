import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@/plugins/localStorage'
import { useAuthStore } from '@/stores/authStore'
import { router } from '@/router'

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
    messages: ref<IMessage[]>([]),
    token: useLocalStorage<string | null>('token', null),
    refreshToken: useLocalStorage<string | null>('refreshToken', null),
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

    async login(email: string, password: string): Promise<void> {
      try {
        const authStore = useAuthStore()
        const result = await authStore.login(email, password)
        
        if (result.success) {
          STATE.token.value = authStore.accessToken
          STATE.refreshToken.value = authStore.refreshToken
          await router.push('/dashboard')
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
      return error
    },

    setTokens(accessToken: string, refreshToken: string) {
      STATE.token.value = accessToken
      STATE.refreshToken.value = refreshToken
    },
  }

  return {
    ...STATE,
    ...ACTIONS,
  }
})

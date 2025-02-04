import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@/plugins/localStorage'
import { useAuthApi } from '@/api/auth.api'

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
        const response = await useAuthApi().login({ email, password })
        if (response.status === 201) {
          STATE.token.value = response.data.data.accessToken
          STATE.refreshToken.value = response.data.data.refreshToken
          return
        }

        throw new Error('Not possible to login')
      } catch (error) {
        console.log(error)
      }
    },

    async logout(): Promise<void> {
      await useAuthApi().logout()
      STATE.token.value = null
      document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      window.location.reload()
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

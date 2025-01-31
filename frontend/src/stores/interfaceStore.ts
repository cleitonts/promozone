import { defineStore } from 'pinia'
import { useLocalStorage } from '@/plugins/localStorage.js'
import { ref } from 'vue'

export enum EMessageType {
  Danger = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export const useInterfaceStore = defineStore('interface', () => {
  const STATE = {
    menuOpen: ref(useLocalStorage('menuOpen', 'false')),
    pageTitle: ref(''),
    lastId: ref(0),
    messages: ref([]),
  }

  const ACTIONS = {
    switchMenu: function () {
      STATE.menuOpen.value = !STATE.menuOpen.value
    },
    addMessage: function ({ text, type, time = 5000 }) {
      STATE.lastId.value++
      const message = {
        text,
        type,
        time,
        id: STATE.lastId.value,
      }
      STATE.messages.value.unshift(message)
    },
    removeMessage: function (id) {
      const indexToDelete = STATE.messages.value.findIndex((n) => n.id === id)
      if (indexToDelete !== -1) {
        STATE.messages.value.splice(indexToDelete, 1)
      }
    },
    processReturn: function (arr) {
      for (const r in arr) {
        this.addMessage({ text: arr[r].text, type: arr[r].type })
      }
    },
  }

  return { ...STATE, ...ACTIONS }
})

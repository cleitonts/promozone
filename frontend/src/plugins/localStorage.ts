import { customRef } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return customRef<T>((track, trigger) => ({
    get: () => {
      track()
      const value = localStorage.getItem(key)
      if (!value) return defaultValue
      try {
        const parsed = JSON.parse(value)
        return parsed
      } catch {
        // Se não for JSON, retorna como string
        return value as unknown as T
      }
    },
    set: (value: T) => {
      if (value === null || value === undefined) {
        localStorage.removeItem(key)
      } else {
        // Se for objeto, stringify; se for string, salva direto
        if (typeof value === 'object') {
          localStorage.setItem(key, JSON.stringify(value))
        } else {
          localStorage.setItem(key, value as unknown as string)
        }
      }
      trigger()
    },
  }))
}

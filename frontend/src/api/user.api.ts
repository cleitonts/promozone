import { ref } from 'vue'
import { useApiProvider } from './provider/api.provider'

const plural = 'users'
const singular = 'user'

export const page = ref(1)
export const limit = ref(25)
export const useUserApi = () => useApiProvider(singular, plural, page.value, limit.value)

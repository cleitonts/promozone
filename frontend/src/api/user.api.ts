import { useApiProvider } from './provider/api.provider'

const plural = 'users'
const singular = 'user'

export const useUserApi = () => useApiProvider(singular, plural)

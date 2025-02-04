import { axiosApiCreate } from './provider/api.provider'

export type TCredentials = {
  email: string
  password: string
}

export type TRegister = TCredentials & {
  passwordRepeat: string
}

export const useAuthApi = () => {
  const apiClient = axiosApiCreate().apiClient

  const login = async (credentials: TCredentials) => {
    return await apiClient.post('/auth/login', { ...credentials })
  }

  const register = (data: TRegister) => {
    return apiClient.post('/auth/register', data)
  }

  const logout = () => {
    return apiClient.post('/auth/logout')
  }

  const refresh = async (refreshToken: string) => {
    return await apiClient.post('/auth/refresh', { refreshToken })
  }

  return { login, register, logout, refresh }
}

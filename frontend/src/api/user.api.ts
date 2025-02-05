import { ref } from 'vue'
import {
  apiClient,
  useApiProvider,
  type IApiResponse,
  type TApiModels,
} from './provider/api.provider'
import type { AxiosResponse } from 'axios'

const plural = 'users'
const singular = 'users'

type UserApiModels = TApiModels<IUser, IUser[], null, null, null, null>

export interface IUser {
  email: string
  id: string
}

export const page = ref(1)
export const limit = ref(25)
export const useUserApi = () => {
  const getRoles = (): Promise<AxiosResponse<IApiResponse<Record<string, string>>>> => {
    return apiClient.get(`/users/roles`)
  }

  return { getRoles, ...useApiProvider<UserApiModels>(singular, plural, page.value, limit.value) }
}

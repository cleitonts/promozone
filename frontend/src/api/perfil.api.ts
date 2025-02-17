import { ref } from 'vue'
import { apiClient, useApiProvider, IApiResponse, TApiModels } from './provider/api.provider'
import type { AxiosResponse } from 'axios'

const plural = 'perfil'
const singular = 'perfil'

type PerfilApiModels = TApiModels<IPerfil, IPerfil[], null, null, null, null>

export interface IPerfil {
  name: string
  id: string
  permissions: string[]
}

export const page = ref(1)
export const limit = ref(25)
export const usePerfilApi = () => {
  const getPermissions = (): Promise<AxiosResponse<IApiResponse<Record<string, string[]>>>> => {
    return apiClient.get(`/${singular}/permissions`)
  }
  return {
    getPermissions,
    ...useApiProvider<PerfilApiModels>(singular, plural, page.value, limit.value),
  }
}

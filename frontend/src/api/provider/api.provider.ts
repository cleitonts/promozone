import { type AxiosResponse } from 'axios'
import { useInterfaceStore } from '@/stores/interfaceStore'
import { useAuthApi } from '../auth.api'
import { axiosApiCreate } from './api.create'

export interface IApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export type TApiModels<Single, List, PostModel, PutModel, PatchModel, SaveResponse> = {
  Single: Single
  List: List
  PostModel: PostModel
  PutModel: PutModel
  PatchModel: PatchModel
  SaveResponse: SaveResponse
}

const apiClient = axiosApiCreate().apiClient
apiClient.interceptors.request.use(async (config) => {
  const token = useInterfaceStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`

    const payload = JSON.parse(atob(token.split('.')[1]))
    const isExpired = payload.exp * 1000 < Date.now()

    if (isExpired && useInterfaceStore().refreshToken) {
      try {
        const response = await useAuthApi().refresh(useInterfaceStore().refreshToken as string)
        useInterfaceStore().setTokens(
          response.data.data.accessToken,
          response.data.data.refreshToken,
        )
        config.headers.Authorization = `Bearer ${useInterfaceStore().token}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        useInterfaceStore().logout()
      }
    }
  }
  useInterfaceStore().addLoading()
  return config
})

export { apiClient }

export const useApiProvider = <
  T extends TApiModels<
    object | null,
    object | null,
    object | null,
    object | null,
    object | null,
    object | null
  >,
>(
  resourceSingular: string,
  resourcePlural: string,
  page: number = 1,
  limit: number = 10,
) => {
  const getAll = (): Promise<AxiosResponse<IApiResponse<T['List']>>> => {
    return apiClient.get(`/${resourcePlural}`, {
      params: { page, limit },
    })
  }

  const getSingle = (id: string): Promise<AxiosResponse<IApiResponse<T['Single']>>> => {
    return apiClient.get(`/${resourceSingular}/${id}`)
  }

  const post = (model: T['PostModel']): Promise<AxiosResponse<IApiResponse<T['SaveResponse']>>> => {
    return apiClient.post(`/${resourceSingular}`, model)
  }

  const put = (model: T['PutModel']): Promise<AxiosResponse<IApiResponse<T['SaveResponse']>>> => {
    return apiClient.put(`/${resourceSingular}`, model)
  }

  const patch = (
    model: T['PatchModel'],
  ): Promise<AxiosResponse<IApiResponse<T['SaveResponse']>>> => {
    return apiClient.patch(`/${resourceSingular}`, model)
  }

  const remove = (id: string): Promise<AxiosResponse<IApiResponse<T['SaveResponse']>>> => {
    return apiClient.delete(`/${resourceSingular}/${id}`)
  }

  return { getAll, getSingle, post, put, patch, remove }
}

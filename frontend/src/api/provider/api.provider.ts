import axios, { type AxiosResponse } from 'axios'
import { EMessageType, useInterfaceStore } from '@/stores/interfaceStore'
import { useAuthApi } from '../auth.api'

export const useApiProvider = (
  resourceSingular: string,
  resourcePlural: string,
  page: number = 1,
  limit: number = 10,
) => {
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

  const getAll = (): Promise<AxiosResponse> => {
    return apiClient.get(`/${resourcePlural}`, {
      params: { page, limit },
    })
  }

  const getSingle = (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/${resourceSingular}/${id}`)
  }

  const post = <T>(model: T): Promise<AxiosResponse> => {
    return apiClient.post(`/${resourceSingular}`, model)
  }

  const put = <T>(model: T): Promise<AxiosResponse> => {
    return apiClient.put(`/${resourceSingular}`, model)
  }

  const patch = <T>(model: T): Promise<AxiosResponse> => {
    return apiClient.patch(`/${resourceSingular}`, model)
  }

  const remove = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/${resourceSingular}/${id}`)
  }

  return { getAll, getSingle, post, put, patch, remove }
}

export const axiosApiCreate = () => {
  const apiClient = axios.create({
    baseURL: (import.meta.env.VITE_APP_API_URL ?? window.location.origin) + '/api/v1',
    withCredentials: true,
    timeout: 60000,
  })

  apiClient.interceptors.request.use(
    (config) => {
      useInterfaceStore().addLoading()
      return config
    },
    (error) => {
      useInterfaceStore().dcrLoading()
      Promise.reject(error)
    },
  )

  apiClient.interceptors.response.use(
    (response) => {
      const { addMessage, dcrLoading } = useInterfaceStore()
      if (response.data.notify) {
        if (response.data.notify.length > 0) {
          const { processReturn } = useInterfaceStore()
          processReturn(response.data.notify)
        }

        response.data = response.data.data
      }

      addMessage('Success', EMessageType.Success, 2000)

      dcrLoading()
      return response
    },
    async (error) => {
      debugger
      const { addMessage, dcrLoading } = useInterfaceStore()
      dcrLoading()

      if (error.response?.status === 500) {
        addMessage(error.response.data.title, EMessageType.Danger)
        return Promise.reject(error)
      }
      if (error.response?.data?.notify?.length > 0) {
        const { processReturn } = useInterfaceStore()
        processReturn(error.response.data.notify)
      }
      if ([401, 403].includes(error.response?.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        await useInterfaceStore().logout()
      }

      return Promise.reject(error)
    },
  )

  return { apiClient }
}

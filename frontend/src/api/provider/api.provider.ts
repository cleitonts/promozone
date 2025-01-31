import axios from 'axios'
import { useInterfaceStore } from '@/stores/interfaceStore'

export const useApiProvider = (resourceSingular: string, resourcePlural: string) => {
  const apiClient = axiosApiCreate().apiClient

  const getAll = () => {
    return apiClient.get(`/${resourcePlural}`)
  }

  const getSingle = (id: string) => {
    return apiClient.get(`/${resourceSingular}/${id}`)
  }

  const post = <T>(model: T) => {
    return apiClient.post(`/${resourceSingular}`, model)
  }

  const put = <T>(model: T) => {
    return apiClient.put(`/${resourceSingular}`, model)
  }

  const patch = <T>(model: T) => {
    return apiClient.patch(`/${resourceSingular}`, model)
  }

  const remove = (id: string) => {
    return apiClient.delete(`/${resourceSingular}/${id}`)
  }

  return { getAll, getSingle, post, put, patch, remove }
}

export const axiosApiCreate = () => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL ?? window.location.origin + '/api/v1',
    withCredentials: true,
    timeout: 60000,
  })

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
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
      console.log(1)
      const { addMessage, dcrLoading } = useInterfaceStore()
      if (response.data.notify) {
        if (response.data.notify.length > 0) {
          const { processReturn } = useInterfaceStore()
          processReturn(response.data.notify)
        }

        response.data = response.data.data
      }

      addMessage({
        text: EMessageText.Success,
        type: EMessageType.Success,
        time: 2000,
      })

      dcrLoading()
      return response
    },
    async (error) => {
      console.log(2)
      const { addMessage, dcrLoading } = useInterfaceStore()
      dcrLoading()

      if (error.response.status === 500) {
        addMessage({ text: error.response.data.title, type: EMessageType.Error })
        return Promise.reject(error)
      }
      if (error.response?.data?.notify?.length > 0) {
        const { processReturn } = useInterfaceStore()
        processReturn(error.response.data.notify)
      }
      if ([401, 403].includes(error.response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // await useInterfaceStore().logout()
      }

      return Promise.reject(error)
    },
    () => {
      console.log(3)
    },
  )

  return { apiClient }
}

import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { i18n } from '@/plugins/i18n'
import {
  type GetTenantsQuery,
  type GetTenantQuery,
  type GetTenantUsersQuery,
  GetTenantsDocument,
  GetTenantDocument,
  GetTenantUsersDocument,
  CreateTenantDocument,
  UpdateTenantDocument,
  DeleteTenantDocument,
} from '@/generated/graphql'

const ui = useInterfaceStore()

export function useTenants() {
  const tenants = ref<Array<GetTenantsQuery['tenants']['edges'][number]['node']>>([])
  const currentTenant = ref<GetTenantQuery['tenant'] | null>(null)
  const tenantUsers = ref<Array<GetTenantUsersQuery['users']['edges'][number]['node']>>([])
  

  const fetchAllTenants = async () => {
    const result = await apolloClient.query({ query: GetTenantsDocument, context: { uiTarget: 'tenants-list' } })
    if (result.data?.tenants?.edges) {
      tenants.value = result.data.tenants.edges.map((e: any) => e.node)
    }
  }

  const fetchTenant = async (id: string) => {
    const result = await apolloClient.query({ query: GetTenantDocument, variables: { id }, context: { uiTarget: 'tenant-detail' } })
    if (result.data?.tenant) {
      currentTenant.value = result.data.tenant
    }
  }

  const fetchTenantUsers = async (tenantId: string) => {
    const result = await apolloClient.query({ query: GetTenantUsersDocument, variables: { tenantId }, context: { uiTarget: 'tenant-users' } })
    if (result.data?.users?.edges) {
      tenantUsers.value = result.data.users.edges.map((e: any) => e.node)
    } else {
      tenantUsers.value = []
    }
  }

  type CreateTenantInput = { tenant: { name?: string; domain?: string; active?: boolean } }
  type UpdateTenantInput = { id: string; update: { name?: string; domain?: string; active?: boolean } }
  type DeleteTenantInput = { id: string }

  const createOneTenant = async (input: CreateTenantInput) => {
    const result = await apolloClient.mutate({ mutation: CreateTenantDocument, variables: { input }, context: { uiTarget: 'tenant-save' } })
    if (result.data?.createOneTenant) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('tenant.createSuccess'), EMessageType.Success)
      await fetchAllTenants()
      return result.data.createOneTenant
    }
    return null
  }

  const updateOneTenant = async (input: UpdateTenantInput) => {
    const result = await apolloClient.mutate({ mutation: UpdateTenantDocument, variables: { input }, context: { uiTarget: 'tenant-save' } })
    if (result.data?.updateOneTenant) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('tenant.updateSuccess'), EMessageType.Success)
      await fetchAllTenants()
      return result.data.updateOneTenant
    }
    return null
  }

  const deleteOneTenant = async (input: DeleteTenantInput) => {
    const result = await apolloClient.mutate({ mutation: DeleteTenantDocument, variables: { input }, context: { uiTarget: 'tenant-delete' } })
    if (result.data?.deleteOneTenant?.id) {
      const tt = (key: string): string => ((i18n as any).global.t(key) as string)
      ui.addMessage(tt('tenant.deleteSuccess'), EMessageType.Success)
      await fetchAllTenants()
      return true
    }
    return false
  }

  return {
    tenants,
    currentTenant,
    tenantUsers,
    fetchAllTenants,
    fetchTenant,
    fetchTenantUsers,
    createOneTenant,
    updateOneTenant,
    deleteOneTenant,
  }
}
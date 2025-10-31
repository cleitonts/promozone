import { ref } from 'vue'
import apolloClient from '@/plugins/apollo'
import gql from 'graphql-tag'
import tenantsQueriesRaw from '@/graphql/queries/tenants.graphql?raw'
import tenantsMutationsRaw from '@/graphql/mutations/tenants.graphql?raw'
import type { DocumentNode } from 'graphql'
import { type GetTenantsQuery, type GetTenantQuery, type GetTenantUsersQuery } from '@/generated/graphql'

function pickOperation(doc: DocumentNode, operationName: string): DocumentNode {
  return {
    kind: 'Document',
    definitions: doc.definitions.filter(
      (d: any) => d.kind === 'OperationDefinition' && d.name && d.name.value === operationName
    )
  } as DocumentNode
}

const tenantsQueriesDoc = gql(tenantsQueriesRaw)
const tenantsMutationsDoc = gql(tenantsMutationsRaw)

const GET_TENANTS = pickOperation(tenantsQueriesDoc, 'GetTenants')
const GET_TENANT = pickOperation(tenantsQueriesDoc, 'GetTenant')
const GET_TENANT_USERS = pickOperation(tenantsQueriesDoc, 'GetTenantUsers')
const CREATE_TENANT = pickOperation(tenantsMutationsDoc, 'CreateTenant')
const UPDATE_TENANT = pickOperation(tenantsMutationsDoc, 'UpdateTenant')
const DELETE_TENANT = pickOperation(tenantsMutationsDoc, 'DeleteTenant')

export function useTenants() {
  const tenants = ref<Array<GetTenantsQuery['tenants']['edges'][number]['node']>>([])
  const currentTenant = ref<GetTenantQuery['tenant'] | null>(null)
  const tenantUsers = ref<Array<GetTenantUsersQuery['users']['edges'][number]['node']>>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllTenants = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_TENANTS })
      if (result.data?.tenants?.edges) {
        tenants.value = result.data.tenants.edges.map((e: any) => e.node)
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching tenants'
    } finally {
      loading.value = false
    }
  }

  const fetchTenant = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_TENANT, variables: { id } })
      if (result.data?.tenant) {
        currentTenant.value = result.data.tenant
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching tenant'
    } finally {
      loading.value = false
    }
  }

  const fetchTenantUsers = async (tenantId: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query({ query: GET_TENANT_USERS, variables: { tenantId } })
      if (result.data?.users?.edges) {
        tenantUsers.value = result.data.users.edges.map((e: any) => e.node)
      } else {
        tenantUsers.value = []
      }
    } catch (err: any) {
      error.value = err?.message || 'Error fetching tenant users'
    } finally {
      loading.value = false
    }
  }

  type CreateTenantInput = { tenant: { name?: string; domain?: string; active?: boolean } }
  type UpdateTenantInput = { id: string; update: { name?: string; domain?: string; active?: boolean } }
  type DeleteTenantInput = { id: string }

  const createOneTenant = async (input: CreateTenantInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: CREATE_TENANT, variables: { input } })
      if (result.data?.createOneTenant) {
        await fetchAllTenants()
        return result.data.createOneTenant
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error creating tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOneTenant = async (input: UpdateTenantInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: UPDATE_TENANT, variables: { input } })
      if (result.data?.updateOneTenant) {
        await fetchAllTenants()
        return result.data.updateOneTenant
      }
      return null
    } catch (err: any) {
      error.value = err?.message || 'Error updating tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOneTenant = async (input: DeleteTenantInput) => {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.mutate({ mutation: DELETE_TENANT, variables: { input } })
      if (result.data?.deleteOneTenant?.id) {
        await fetchAllTenants()
        return true
      }
      return false
    } catch (err: any) {
      error.value = err?.message || 'Error removing tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tenants,
    currentTenant,
    tenantUsers,
    loading,
    error,
    fetchAllTenants,
    fetchTenant,
    fetchTenantUsers,
    createOneTenant,
    updateOneTenant,
    deleteOneTenant,
  }
}
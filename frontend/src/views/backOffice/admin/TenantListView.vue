<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Tenants"
      icon="fa6-solid:building"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            color="secondary"
            icon="fa6-solid:plus"
            class="position-absolute mt-n5 mb-3"
            :to="{ name: 'tenantsNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="tenants"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="6">
            <v-text-field v-model="searchName" label="Tenant Name" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="searchDomain" label="Domain" />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'tenantsEdit', params: { id: element.id } }"
            />
            <v-btn
              color="error"
              size="x-small"
              icon="fa6-solid:trash"
              @click="deleteTenant(element.id)"
              class="ml-1"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref, watch } from 'vue'
import { useGetTenantsQuery, useDeleteTenantMutation } from '@/generated/graphql'

const searchName = ref('')
const searchDomain = ref('')
const tenants = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)

const { result: tenantsResult, refetch: refetchTenants } = useGetTenantsQuery()
const { mutate: deleteTenantMutation } = useDeleteTenantMutation()

const headers = {
  action: '#',
  id: 'Id',
  name: 'Name',
  description: 'Description',
  domain: 'Domain',
  createdAt: 'Created At'
}

const getList = async function () {
  try {
    await refetchTenants()
    
    if (tenantsResult.value?.tenants) {
      let filteredTenants = tenantsResult.value.tenants
      
      if (searchName.value) {
        filteredTenants = filteredTenants.filter((tenant: any) => 
          tenant.name.toLowerCase().includes(searchName.value.toLowerCase())
        )
      }
      
      if (searchDomain.value) {
        filteredTenants = filteredTenants.filter((tenant: any) => 
          tenant.domain?.toLowerCase().includes(searchDomain.value.toLowerCase())
        )
      }
      
      tenants.value = filteredTenants.map((tenant: any) => ({
        id: tenant.id || '',
        name: tenant.name || '',
        description: tenant.description || '',
        domain: tenant.domain || '',
        createdAt: tenant.createdAt ? new Date(tenant.createdAt).toLocaleDateString() : ''
      }))
      totalItems.value = tenants.value.length
    }
  } catch (error) {
    console.error('Error fetching tenants:', error)
  }
}

const deleteTenant = async function (id: string) {
  if (confirm('Are you sure you want to delete this tenant?')) {
    try {
      await deleteTenantMutation({ id })
      await getList()
    } catch (error) {
      console.error('Error deleting tenant:', error)
    }
  }
}

// Watch for search changes
watch([searchName, searchDomain], () => {
  getList()
})

onMounted(() => {
  getList()
})
</script>
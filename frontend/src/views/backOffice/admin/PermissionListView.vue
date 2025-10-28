<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Gestão de Permissões"
      icon="fa6-solid:shield-halved"
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
            :to="{ name: 'permissionsNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="permissions"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="4">
            <v-text-field 
              v-model="searchName" 
              label="Buscar por nome" 
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="4">
            <v-text-field 
              v-model="searchResource" 
              label="Buscar por recurso" 
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="actionFilter"
              :items="actionOptions"
              label="Filtrar por ação"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
        </template>
        
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'permissionsEdit', params: { id: element.id } }"
            />
            <v-btn
              color="error"
              size="x-small"
              icon="fa6-solid:trash"
              @click="deletePermission(element.id)"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useListResolversQuery } from '@/generated/graphql'

type PermissionItem = {
  id: string
  name: string
  resource: string
  action: string
  description?: string
}

const searchName = ref('')
const searchResource = ref('')
const actionFilter = ref('')
const page = ref(1)
const limit = ref(10)

const { result: resolversResult, refetch: refetchResolvers } = useListResolversQuery()

const headers: Record<string, string> = {
  action: '#',
  name: 'Nome',
  resource: 'Recurso',
  action_name: 'Ação',
  description: 'Descrição'
}

const actionOptions: Array<{ title: string; value: string }> = [
  { title: 'Consulta', value: 'query' },
  { title: 'Mutação', value: 'mutation' }
]

const filteredPermissions = computed<PermissionItem[]>(() => {
  const baseRaw = resolversResult.value?.listResolvers ?? []
  const base: PermissionItem[] = baseRaw.map(r => ({
    id: `${r.resolverClass}.${r.methodName}`,
    name: r.resolverName ?? `${r.resolverClass}.${r.methodName}`,
    resource: r.schemaName ?? r.moduleName ?? '-',
    action: r.type ?? 'query',
    description: r.requiresAuth ? 'Requires auth' : 'Public'
  }))
  let filtered = base
  
  if (searchName.value) {
    filtered = filtered.filter((permission) =>
      permission.name.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }
  
  if (searchResource.value) {
    filtered = filtered.filter((permission) =>
      permission.resource.toLowerCase().includes(searchResource.value.toLowerCase())
    )
  }
  
  if (actionFilter.value) {
    filtered = filtered.filter((permission) =>
      permission.action === actionFilter.value
    )
  }
  
  return filtered
})

const permissions = computed(() =>
  filteredPermissions.value.map((permission) => ({
    id: permission.id,
    name: permission.name,
    resource: permission.resource,
    action_name: getActionLabel(permission.action),
    description: permission.description ?? '-'
  }))
)

const totalItems = computed(() => permissions.value.length)

const getActionLabel = (action: string) => {
  const actionMap: Record<string, string> = {
    query: 'Consulta',
    mutation: 'Mutação'
  }
  return actionMap[action] || action
}

const getList = async () => {
  try {
    await refetchResolvers()
  } catch (error) {
    console.error('Erro ao carregar permissões:', error)
  }
}

const deletePermission = async (_id: string) => {
  alert('Operação de deleção de permissão não disponível.')
}

// Watch for filter changes
watch([searchName, searchResource, actionFilter], () => {
  // Filters are reactive through computed properties
})

onMounted(() => {
  getList()
})
</script>

<style scoped>
.actions {
  white-space: nowrap;
}
</style>
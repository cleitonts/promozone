<template>
  <v-card>
    <the-card-title 
      icon="mdi-account-group" 
      text="Gestão de Roles"
      bg-color="primary"
      text-color="white"
    />
    
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchName"
            label="Buscar por nome"
            prepend-inner-icon="mdi-magnify"
            clearable
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="filterGlobal"
            label="Filtrar por tipo"
            :items="[
              { title: 'Todos', value: null },
              { title: 'Globais', value: true },
              { title: 'Específicos do Tenant', value: false }
            ]"
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
      </v-row>
      
      <base-grid
        :headers="headers"
        :items="filteredRoles"
        :loading="loading"
        :page="page"
        :limit="limit"
        @update:page="page = $event"
        @update:limit="limit = $event"
      >
        <template #item.isGlobal="{ item }">
          <v-chip
            :color="item.isGlobal ? 'primary' : 'secondary'"
            size="small"
          >
            {{ item.isGlobal ? 'Global' : 'Tenant' }}
          </v-chip>
        </template>
        
        <template #item.tenant="{ item }">
          <span v-if="item.tenant && typeof item.tenant === 'object'">{{ (item.tenant as any).name }}</span>
          <span v-else class="text-grey">-</span>
        </template>
        
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click="editRole(item.id)"
          />
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="deleteRole(item.id)"
          />
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { computed, onMounted, ref, watch } from 'vue'
import { useGetRolesQuery, useDeleteRoleMutation, type Role } from '@/generated/graphql'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchName = ref('')
const filterGlobal = ref<boolean | null>(null)
const page = ref(1)
const limit = ref(10)

const { result: rolesResult, loading, refetch: refetchRoles } = useGetRolesQuery()
const { mutate: deleteRoleMutation } = useDeleteRoleMutation()

const roles = computed(() => rolesResult.value?.roles || [])

const filteredRoles = computed(() => {
  let filtered = roles.value
  
  if (searchName.value) {
    filtered = filtered.filter((role) => 
      role.name.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }
  
  if (filterGlobal.value !== null) {
    filtered = filtered.filter((role) => role.isGlobal === filterGlobal.value)
  }
  
  return filtered
})

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Descrição', key: 'description', sortable: false },
  { title: 'Tipo', key: 'isGlobal', sortable: true },
  { title: 'Tenant', key: 'tenant', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false, width: '120px' }
]

const editRole = (id: string) => {
  router.push({ name: 'rolesEdit', params: { id } })
}

const deleteRole = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta role?')) {
    try {
      await deleteRoleMutation({ id })
      await refetchRoles()
    } catch (error) {
      console.error('Erro ao excluir role:', error)
    }
  }
}

watch([searchName, filterGlobal], () => {
  page.value = 1
})

onMounted(() => {
  refetchRoles()
})
</script>
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
        <template #item.resolvers="{ item }">
          <v-chip
            color="primary"
            size="small"
          >
            {{ Array.isArray(item.resolvers) ? item.resolvers.length + ' resolvers' : '0' }}
          </v-chip>
        </template>
        
        <template #item.tenantId="{ item }">
          <span>{{ item.tenantId || '-' }}</span>
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
import { useGetProfilesQuery, useDeleteOneProfileMutation } from '@/generated/graphql'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchName = ref('')
const page = ref(1)
const limit = ref(10)

const { result: profilesResult, loading, refetch: refetchProfiles } = useGetProfilesQuery()
const { mutate: deleteProfile } = useDeleteOneProfileMutation()

const roles = computed(() => (profilesResult.value?.profiles?.edges || []).map((e: any) => e.node))

const filteredRoles = computed(() => {
  let filtered = roles.value
  
  if (searchName.value) {
    filtered = filtered.filter((role: any) =>
      role.name.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }
  
  return filtered
})

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Resolvers', key: 'resolvers', sortable: false },
  { title: 'Tenant', key: 'tenantId', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false, width: '120px' }
]

const editRole = (id: string) => {
  router.push({ name: 'rolesEdit', params: { id } })
}

const deleteRole = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta role?')) {
    try {
      await deleteProfile({ input: { id } })
      await refetchProfiles()
    } catch (error) {
      console.error('Erro ao excluir role:', error)
    }
  }
}

watch([searchName], () => {
  page.value = 1
})

onMounted(() => {
  refetchProfiles()
})
</script>
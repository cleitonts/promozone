<template>
  <v-card>
    <the-card-title 
      icon="mdi-account-group" 
      :text="isEditing ? 'Editar Role' : 'Criar Role'"
      bg-color="primary"
      text-color="white"
    />
    
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="role.name"
              label="Nome da Role"
              :rules="nameRules"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="role.isGlobal"
              label="Role Global"
              color="primary"
              inset
            />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="role.description"
              label="Descrição"
              variant="outlined"
              density="compact"
              rows="3"
            />
          </v-col>
        </v-row>
        
        <v-row v-if="!role.isGlobal">
          <v-col cols="12">
            <v-select
              v-model="role.tenantId"
              :items="tenantOptions"
              label="Tenant"
              variant="outlined"
              density="compact"
              :rules="tenantRules"
            />
          </v-col>
        </v-row>
        
        <!-- Permissões serão implementadas em uma versão futura -->
        <!-- <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h6">Permissões</v-card-title>
              <v-card-text>
                <p class="text-grey">Gestão de permissões será implementada em breve.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row> -->
        
        <v-row>
          <v-col cols="12" class="d-flex gap-2">
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="!valid"
            >
              {{ isEditing ? 'Atualizar' : 'Criar' }}
            </v-btn>
            <v-btn
              variant="outlined"
              @click="cancel"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  useGetRoleQuery, 
  useCreateRoleMutation, 
  useUpdateRoleMutation,
  useGetTenantsQuery
} from '@/generated/graphql'
import { TheCardTitle } from '@/components'

const route = useRoute()
const router = useRouter()

const form = ref()
const valid = ref(false)
const loading = ref(false)

const role = ref({
  name: '',
  description: '',
  isGlobal: false,
  tenantId: ''
})

// const selectedPermissions = ref<string[]>([])

const isEditing = computed(() => route.name === 'rolesEdit')
const roleId = computed(() => route.params.id as string)

// GraphQL queries and mutations
const { result: tenantsResult } = useGetTenantsQuery()
const { result: roleResult, loading: roleLoading } = useGetRoleQuery(
  () => ({ id: roleId.value }),
  { enabled: isEditing }
)

const { mutate: createRole } = useCreateRoleMutation()
const { mutate: updateRole } = useUpdateRoleMutation()

// Computed properties
// const permissions = ref([])
const tenantOptions = computed(() => 
  (tenantsResult.value?.tenants || []).map(tenant => ({
    title: tenant.name,
    value: tenant.id
  }))
)

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const tenantRules = computed(() => [
  (v: string) => role.value.isGlobal || !!v || 'Tenant é obrigatório para roles não globais'
])

// Methods
const submit = async () => {
  if (!valid.value) return
  
  loading.value = true
  
  try {
    const input = {
      name: role.value.name,
      description: role.value.description,
      isGlobal: role.value.isGlobal,
      tenantId: role.value.isGlobal ? undefined : role.value.tenantId,
      // permissionIds: selectedPermissions.value
    }
    
    if (isEditing.value) {
      await updateRole({
        input: {
          id: roleId.value,
          ...input
        }
      })
    } else {
      await createRole({ input })
    }
    
    router.push({ name: 'rolesList' })
  } catch (error) {
    console.error('Erro ao salvar role:', error)
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  router.push({ name: 'rolesList' })
}

// Load role data if editing
onMounted(() => {
  if (isEditing.value && roleResult.value?.role) {
    const roleData = roleResult.value.role
    role.value = {
      name: roleData.name,
      description: roleData.description || '',
      isGlobal: roleData.isGlobal,
      tenantId: roleData.tenant?.id || ''
    }
    
    // Load role permissions if available
    // selectedPermissions.value = roleData.permissions?.map(p => p.id) || []
  }
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
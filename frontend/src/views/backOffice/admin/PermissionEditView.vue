<template>
  <v-card>
    <the-card-title 
      icon="fa6-solid:shield-halved" 
      :text="isEditing ? 'Editar Permissão' : 'Criar Permissão'"
      bg-color="primary"
      text-color="white"
    />
    
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="permission.resource"
              label="Recurso"
              :rules="resourceRules"
              variant="outlined"
              density="compact"
              required
              hint="Ex: users, products, roles"
            />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="permission.action"
              :items="actionOptions"
              label="Ação"
              :rules="actionRules"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="permission.isGlobal"
              label="Permissão Global"
              color="primary"
              inset
              hint="Permissões globais se aplicam a todos os tenants"
            />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="permission.description"
              label="Descrição"
              variant="outlined"
              density="compact"
              rows="3"
              hint="Descreva o que esta permissão permite fazer"
            />
          </v-col>
        </v-row>
        

        
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
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  useGetPermissionQuery, 
  useCreatePermissionMutation, 
  useUpdatePermissionMutation
} from '@/generated/graphql'
import { TheCardTitle } from '@/components'

const route = useRoute()
const router = useRouter()

const form = ref()
const valid = ref(false)
const loading = ref(false)

const permission = ref({
  resource: '',
  action: '',
  description: '',
  isGlobal: false
})

const isEditing = computed(() => route.name === 'permissionsEdit')
const permissionId = computed(() => route.params.id as string)

// GraphQL queries and mutations
const { result: permissionResult } = useGetPermissionQuery(
  () => ({ id: permissionId.value }),
  { enabled: isEditing }
)

const { mutate: createPermission } = useCreatePermissionMutation()
const { mutate: updatePermission } = useUpdatePermissionMutation()

// Options
const actionOptions = [
  { title: 'Criar', value: 'create' },
  { title: 'Ler', value: 'read' },
  { title: 'Atualizar', value: 'update' },
  { title: 'Deletar', value: 'delete' },
  { title: 'Gerenciar', value: 'manage' },
  { title: 'Listar', value: 'list' },
  { title: 'Visualizar', value: 'view' }
]

// Validation rules

const resourceRules = [
  (v: string) => !!v || 'Recurso é obrigatório',
  (v: string) => /^[a-zA-Z0-9_-]+$/.test(v) || 'Recurso deve conter apenas letras, números, underscore e hífen'
]

const actionRules = [
  (v: string) => !!v || 'Ação é obrigatória'
]

// Methods
const submit = async () => {
  if (!valid.value) return
  
  loading.value = true
  
  try {
    const input = {
      resource: permission.value.resource,
      action: permission.value.action,
      description: permission.value.description || undefined,
      isGlobal: permission.value.isGlobal
    }
    
    if (isEditing.value) {
      await updatePermission({
        input: {
          id: permissionId.value,
          ...input
        }
      })
    } else {
      await createPermission({ input })
    }
    
    router.push({ name: 'permissionsList' })
  } catch (error) {
    console.error('Erro ao salvar permissão:', error)
    alert('Erro ao salvar permissão. Verifique os dados e tente novamente.')
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  router.push({ name: 'permissionsList' })
}

// Load permission data if editing
watch(permissionResult, (result) => {
  if (result?.permission) {
    const permissionData = result.permission
    permission.value = {
      resource: permissionData.resource,
      action: permissionData.action,
      description: permissionData.description || '',
      isGlobal: false // Este campo não existe no backend, sempre false
    }
  }
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
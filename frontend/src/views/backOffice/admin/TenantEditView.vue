<template>
  <v-card>
    <the-card-title 
      icon="mdi-domain" 
      :text="isEditing ? 'Editar Tenant' : 'Criar Tenant'"
      bg-color="primary"
      text-color="white"
    />
    
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="tenant.name"
              label="Nome do Tenant"
              :rules="nameRules"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="tenant.domain"
              label="Domínio"
              variant="outlined"
              density="compact"
              hint="Domínio personalizado (opcional)"
            />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="tenant.description"
              label="Descrição"
              variant="outlined"
              density="compact"
              rows="3"
            />
          </v-col>
        </v-row>
        

        
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h6">Configurações</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.theme"
                      label="Tema"
                      variant="outlined"
                      density="compact"
                      hint="Configurações de tema"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.features"
                      label="Funcionalidades"
                      variant="outlined"
                      density="compact"
                      hint="Funcionalidades habilitadas"
                    />
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.customization"
                      label="Personalização"
                      variant="outlined"
                      density="compact"
                      hint="Configurações de personalização"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.integrations"
                      label="Integrações"
                      variant="outlined"
                      density="compact"
                      hint="Configurações de integrações"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  useGetTenantQuery, 
  useCreateTenantMutation, 
  useUpdateTenantMutation
} from '@/generated/graphql'
import { TheCardTitle } from '@/components'

const route = useRoute()
const router = useRouter()

const form = ref()
const valid = ref(false)
const loading = ref(false)

const tenant = ref({
  name: '',
  description: '',
  domain: ''
})

const settings = ref({
  theme: '',
  features: '',
  customization: '',
  integrations: ''
})

const isEditing = computed(() => route.name === 'tenantsEdit')
const tenantId = computed(() => route.params.id as string)

// GraphQL queries and mutations
const { result: tenantResult } = useGetTenantQuery(
  () => ({ id: tenantId.value }),
  { enabled: isEditing }
)

const { mutate: createTenant } = useCreateTenantMutation()
const { mutate: updateTenant } = useUpdateTenantMutation()

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]



// Methods
const submit = async () => {
  if (!valid.value) return
  
  loading.value = true
  
  try {
    const tenantSettings = {
      theme: settings.value.theme,
      features: settings.value.features,
      customization: settings.value.customization,
      integrations: settings.value.integrations
    }
    
    const input = {
      name: tenant.value.name,
      description: tenant.value.description || undefined,
      domain: tenant.value.domain || undefined,
      settings: tenantSettings
    }
    
    if (isEditing.value) {
      await updateTenant({
        input: {
          id: tenantId.value,
          ...input
        }
      })
    } else {
      // Para criar tenant, precisamos do slug obrigatório
      const createInput = {
        ...input,
        slug: tenant.value.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }
      await createTenant({ input: createInput })
    }
    
    router.push({ name: 'tenantsList' })
  } catch (error) {
    console.error('Erro ao salvar tenant:', error)
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  router.push({ name: 'tenantsList' })
}

// Load tenant data if editing
onMounted(() => {
  if (isEditing.value && tenantResult.value?.tenant) {
    const tenantData = tenantResult.value.tenant
    tenant.value = {
      name: tenantData.name,
      description: tenantData.description || '',
      domain: tenantData.domain || ''
    }
    
    // Load settings if available
    if (tenantData.settings) {
      try {
        const parsedSettings = typeof tenantData.settings === 'string' 
          ? JSON.parse(tenantData.settings) 
          : tenantData.settings
        
        settings.value = {
          theme: parsedSettings.theme || '',
          features: parsedSettings.features || '',
          customization: parsedSettings.customization || '',
          integrations: parsedSettings.integrations || ''
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }
  }
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
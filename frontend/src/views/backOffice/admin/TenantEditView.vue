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
              :loading="saving"
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
import { useTenants } from '@/composables/tenants'
import { TheCardTitle } from '@/components'

const route = useRoute()
const router = useRouter()

const form = ref()
const valid = ref(false)
const saving = ref(false)

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

const { fetchTenant, currentTenant, createOneTenant, updateOneTenant, loading: tenantsLoading } = useTenants()

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]



// Methods
const submit = async () => {
  if (!valid.value) return
  
  saving.value = true
  
  try {
    const inputBase = {
      name: tenant.value.name,
      domain: tenant.value.domain || undefined,
    }
    if (isEditing.value) {
      await updateOneTenant({
        id: tenantId.value,
        update: {
          ...inputBase
        }
      })
    } else {
      const createInput = {
        ...inputBase,
        slug: tenant.value.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }
      await createOneTenant({ tenant: createInput })
    }
    
    router.push({ name: 'tenantsList' })
  } catch (error) {
    console.error('Erro ao salvar tenant:', error)
  } finally {
    saving.value = false
  }
}

const cancel = () => {
  router.push({ name: 'tenantsList' })
}

// Load tenant data if editing
onMounted(async () => {
  if (isEditing.value && tenantId.value) {
    await fetchTenant(tenantId.value)
    if (currentTenant.value) {
      tenant.value = {
        name: currentTenant.value.name,
        description: '',
        domain: currentTenant.value.domain || ''
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
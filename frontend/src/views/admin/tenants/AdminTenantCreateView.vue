<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-btn
              icon
              variant="text"
              :to="{ name: 'adminDashboard' }"
              class="mr-2"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-icon left color="secondary">mdi-domain</v-icon>
            Criar Novo Tenant
          </v-card-title>
          <v-card-subtitle class="px-6">
            Criar uma nova organização no sistema
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="tenant.name"
                    label="Nome do Tenant"
                    :rules="nameRules"
                    required
                    prepend-inner-icon="mdi-domain"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="tenant.slug"
                    label="Slug (Identificador único)"
                    :rules="slugRules"
                    required
                    prepend-inner-icon="mdi-link"
                    hint="Usado para URLs e identificação"
                    persistent-hint
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="tenant.description"
                    label="Descrição"
                    rows="3"
                    prepend-inner-icon="mdi-text"
                    hint="Descrição opcional do tenant"
                    persistent-hint
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="tenant.domain"
                    label="Domínio (Opcional)"
                    prepend-inner-icon="mdi-web"
                    hint="Domínio personalizado para o tenant"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="tenant.ownerId"
                    :items="userOptions"
                    item-title="email"
                    item-value="id"
                    label="Proprietário"
                    prepend-inner-icon="mdi-account-crown"
                    :rules="ownerRules"
                    required
                    hint="Usuário que será o proprietário do tenant"
                    persistent-hint
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-card variant="outlined">
                    <v-card-title class="text-subtitle-1">
                      <v-icon left>mdi-cog</v-icon>
                      Configurações Avançadas
                    </v-card-title>
                    <v-card-text>
                      <v-textarea
                        v-model="tenant.settings"
                        label="Configurações JSON (Opcional)"
                        rows="4"
                        prepend-inner-icon="mdi-code-json"
                        hint="Configurações específicas do tenant em formato JSON"
                        persistent-hint
                        placeholder='{"theme": "default", "features": ["feature1", "feature2"]}'
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-alert v-if="error" type="error" class="mb-4">
                {{ error }}
              </v-alert>

              <v-alert type="info" variant="tonal" class="mb-4">
                <strong>Informação:</strong> O tenant será criado com configurações padrão.
                O proprietário terá acesso total ao tenant.
              </v-alert>
            </v-form>
          </v-card-text>

          <v-card-actions class="px-6 pb-6">
            <v-btn
              color="secondary"
              :loading="loading"
              :disabled="!valid"
              @click="submit"
              prepend-icon="mdi-content-save"
            >
              Criar Tenant
            </v-btn>
            <v-btn
              variant="outlined"
              :to="{ name: 'adminDashboard' }"
              prepend-icon="mdi-cancel"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { useGetAllUsersQuery, useCreateTenantMutation } from '@/generated/graphql'

const router = useRouter()
const interfaceStore = useInterfaceStore()

const form = ref()
const valid = ref(false)
const loading = ref(false)
const error = ref('')

const tenant = ref({
  name: '',
  slug: '',
  description: '',
  domain: '',
  ownerId: '',
  settings: ''
})

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const slugRules = [
  (v: string) => !!v || 'Slug é obrigatório',
  (v: string) => /^[a-z0-9-]+$/.test(v) || 'Slug deve conter apenas letras minúsculas, números e hífens',
  (v: string) => v.length >= 2 || 'Slug deve ter pelo menos 2 caracteres'
]

const ownerRules = [
  (v: string) => !!v || 'Proprietário é obrigatório'
]

// GraphQL queries and mutations
const { result: usersResult } = useGetAllUsersQuery()
const { mutate: createTenant } = useCreateTenantMutation()

const userOptions = computed(() => {
  return usersResult.value?.users || []
})

const submit = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  error.value = ''

  try {
    // Validar JSON se fornecido
    if (tenant.value.settings) {
      try {
        JSON.parse(tenant.value.settings)
      } catch {
        error.value = 'Configurações devem estar em formato JSON válido'
        loading.value = false
        return
      }
    }

    const result = await createTenant({
      input: {
        name: tenant.value.name,
        slug: tenant.value.slug,
        description: tenant.value.description || undefined,
        domain: tenant.value.domain || undefined,
        ownerId: tenant.value.ownerId,
        settings: tenant.value.settings ? JSON.parse(tenant.value.settings) : undefined
      }
    })

    if (result?.data?.createTenant) {
      interfaceStore.addMessage('Tenant criado com sucesso!', EMessageType.Success)
      router.push({ name: 'adminDashboard' })
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao criar tenant'
  } finally {
    loading.value = false
  }
}
</script>
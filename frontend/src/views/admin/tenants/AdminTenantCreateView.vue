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
                    v-model="tenant.domain"
                    label="Domínio"
                    :rules="domainRules"
                    required
                    prepend-inner-icon="mdi-web"
                  />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import createTenantRaw from '@/graphql/mutations/tenants.graphql?raw'

const router = useRouter()
const interfaceStore = useInterfaceStore()

const form = ref()
const valid = ref(false)
const loading = ref(false)
const error = ref('')

const tenant = ref({
  name: '',
  domain: ''
})

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const domainRules = [
  (v: string) => !!v || 'Domínio é obrigatório',
  (v: string) => /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(v) || 'Domínio deve ser válido'
]

const { mutate: createTenant } = useMutation(gql(createTenantRaw))

const submit = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  error.value = ''

  try {
    const result = await createTenant({
      input: {
        tenant: {
          name: tenant.value.name,
          domain: tenant.value.domain
        }
      }
    })

    if (result?.data?.createOneTenant) {
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
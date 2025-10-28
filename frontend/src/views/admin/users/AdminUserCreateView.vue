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
            <v-icon left color="primary">mdi-account-plus</v-icon>
            Criar Novo Usuário
          </v-card-title>
          <v-card-subtitle class="px-6">
            Criar usuário com acesso administrativo ao sistema
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    required
                    prepend-inner-icon="mdi-email"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.password"
                    label="Senha"
                    type="password"
                    :rules="passwordRules"
                    required
                    prepend-inner-icon="mdi-lock"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.firstName"
                    label="Nome"
                    :rules="nameRules"
                    required
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.lastName"
                    label="Sobrenome"
                    :rules="nameRules"
                    required
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="user.tenantId"
                    :items="tenantOptions"
                    item-title="name"
                    item-value="id"
                    label="Tenant (Opcional)"
                    prepend-inner-icon="mdi-domain"
                    clearable
                    hint="Deixe vazio para criar um usuário global"
                    persistent-hint
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="user.roleIds"
                    :items="roleOptions"
                    item-title="name"
                    item-value="id"
                    label="Roles"
                    multiple
                    chips
                    prepend-inner-icon="mdi-shield-account"
                    :rules="roleRules"
                    required
                  />
                </v-col>
              </v-row>

              <v-alert v-if="error" type="error" class="mb-4">
                {{ error }}
              </v-alert>

              <v-alert type="info" variant="tonal" class="mb-4">
                <strong>Informação:</strong> Este usuário será criado com privilégios administrativos.
                Certifique-se de atribuir as roles apropriadas.
              </v-alert>
            </v-form>
          </v-card-text>

          <v-card-actions class="px-6 pb-6">
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              @click="submit"
              prepend-icon="mdi-content-save"
            >
              Criar Usuário
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
import { useGetTenantsQuery } from '@/generated/graphql'

const router = useRouter()
const interfaceStore = useInterfaceStore()

const form = ref()
const valid = ref(false)
const loading = ref(false)
const error = ref('')

const user = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  tenantId: null as string | null,
  roleIds: [] as string[]
})

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
]

const nameRules = [
  (v: string) => !!v || 'Campo obrigatório',
  (v: string) => v.length >= 2 || 'Deve ter pelo menos 2 caracteres'
]

const roleRules = [
  (v: string[]) => v.length > 0 || 'Pelo menos uma role deve ser selecionada'
]

const { result: tenantsResult } = useGetTenantsQuery()

const tenantOptions = computed(() => {
  const edges = tenantsResult.value?.tenants?.edges ?? []
  return edges.map(e => e.node)
})

const availableRoles = [
  { id: 'admin', name: 'Admin' }
]

const roleOptions = computed(() => availableRoles)

const submit = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  error.value = ''

  try {
    // TODO: Implementar mutation para criar usuário administrativo
    // const result = await createAdminUser({
    //   input: {
    //     email: user.value.email,
    //     password: user.value.password,
    //     firstName: user.value.firstName,
    //     lastName: user.value.lastName,
    //     tenantId: user.value.tenantId,
    //     roleIds: user.value.roleIds
    //   }
    // })

    interfaceStore.addMessage('Usuário criado com sucesso!', EMessageType.Success)
    router.push({ name: 'adminDashboard' })
  } catch (err: any) {
    error.value = err.message || 'Erro ao criar usuário'
  } finally {
    loading.value = false
  }
}
</script>
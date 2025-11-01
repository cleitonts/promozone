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
            {{ t('user.admin.createTitle') }}
          </v-card-title>
          <v-card-subtitle class="px-6">
            {{ t('user.admin.createSubtitle') }}
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.email"
                    :label="t('user.fields.email')"
                    type="email"
                    :rules="emailRules"
                    required
                    prepend-inner-icon="mdi-email"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.password"
                    :label="t('user.fields.password')"
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
                    :label="t('user.fields.firstName')"
                    :rules="nameRules"
                    required
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.lastName"
                    :label="t('user.fields.lastName')"
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
                    :label="t('user.admin.tenantOptional')"
                    prepend-inner-icon="mdi-domain"
                    clearable
                    :hint="t('user.admin.globalUserHint')"
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
                    :label="t('user.fields.roles')"
                    multiple
                    chips
                    prepend-inner-icon="mdi-shield-account"
                    :rules="roleRules"
                    required
                  />
                </v-col>
              </v-row>

              <v-alert type="info" variant="tonal" class="mb-4">
                <strong>{{ t('user.admin.infoTitle') }}</strong> {{ t('user.admin.infoBody') }}
              </v-alert>
            </v-form>
          </v-card-text>

          <v-card-actions class="px-6 pb-6">
            <v-btn
              color="primary"
              :loading="saving"
              :disabled="!valid"
              @click="submit"
              prepend-icon="mdi-content-save"
            >
              {{ t('user.admin.createButton') }}
            </v-btn>
            <v-btn
              variant="outlined"
              :to="{ name: 'adminDashboard' }"
              prepend-icon="mdi-cancel"
            >
              {{ t('common.cancel') }}
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
import { useInterfaceStore } from '@/stores/interfaceStore'
import { useUsers } from '@/composables/useUsers'
import { useGetTenantsQuery } from '@/generated/graphql'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const interfaceStore = useInterfaceStore()
const { t } = useI18n()

const form = ref()
const valid = ref(false)
const { createUser } = useUsers()
const saving = computed(() => interfaceStore.isLoading('user-create'))

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
  (v: string) => !!v || t('user.validation.emailRequired'),
  (v: string) => /.+@.+\..+/.test(v) || t('user.validation.emailInvalid')
]

const passwordRules = [
  (v: string) => !!v || t('user.validation.passwordRequired'),
  (v: string) => v.length >= 6 || t('user.validation.passwordMin')
]

const nameRules = [
  (v: string) => !!v || t('user.validation.nameRequired'),
  (v: string) => v.length >= 2 || t('user.validation.nameMin')
]

const roleRules = [
  (v: string[]) => v.length > 0 || t('user.validation.roleRequired')
]

const { result: tenantsResult } = useGetTenantsQuery({ context: { uiTarget: 'admin-user-create-tenants' } })

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

  const name = `${user.value.firstName} ${user.value.lastName}`.trim()
  const result = await createUser({
    email: user.value.email,
    password: user.value.password,
    tenantId: user.value.tenantId || undefined,
    name: name || undefined,
  })
  if (result.success) {
    router.push({ name: 'adminDashboard' })
  }
}
</script>
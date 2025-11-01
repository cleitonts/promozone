<template>
  <div>
    <v-card class="overflow-visible">
      <TheCardTitle :text="t('profile.editTitle')" icon="fa6-solid:user-gear" bg-color="bg-secondary-gradient" text-color="white" />

      <v-card-text>
        <v-form @submit.prevent="submit($event)" v-slot="{ isDisabled: isDisabledRef }">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.name"
                :label="t('profile.fields.displayName')"
                :placeholder="t('profile.fields.displayNamePlaceholder')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div v-if="loading">{{ t('profile.loadingResolvers') }}</div>
              <div v-else>
                <div v-for="(group, moduleName) in groupedResolvers" :key="moduleName" class="mb-2">
                  <h4 class="text-subtitle-2 mb-1">{{ moduleName }}</h4>
                  <v-row class="resolver-grid" no-gutters>
                    <v-col cols="12" md="6" lg="4" v-for="op in group" :key="op.schemaName">
                      <v-checkbox
                        :label="op.schemaName"
                        :value="op.schemaName"
                        v-model="selectedPermissions"
                        density="compact"
                        hide-details="auto"
                        class="resolver-checkbox"
                      />
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="primary" type="submit" :disabled="isDisabledRef.value || submitting">
                {{ t('common.create') }}
              </v-btn>
              <v-btn class="ml-2" variant="text" :to="{ name: 'profileList' }">{{ t('common.cancel') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { TheCardTitle } from '@/components'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '@/router'
import { useI18n } from 'vue-i18n'
import { useListResolversQuery } from '@/generated/graphql'
import { useTenantStore } from '@/stores/tenantStore'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const route = useRoute()
const profile = ref({ name: '' })
const submitting = ref(false)

// Query listResolvers (co-located in src/graphql/queries/resolvers.graphql, but keep as fallback)
const { result: resolversResult, loading } = useListResolversQuery()

const resolvers = ref<any[]>([])

watchEffect(() => {
  const data = resolversResult.value
  if (data?.listResolvers) {
    resolvers.value = data.listResolvers
  }
})

// Group by moduleName
const groupedResolvers = computed<Record<string, any[]>>(() => {
  const groups: Record<string, any[]> = {}
  for (const r of resolvers.value) {
    const key = r.moduleName ?? 'root'
    if (!groups[key]) groups[key] = []
    groups[key].push(r)
  }
  return groups
})

const selectedPermissions = ref<string[]>([])

// Load current tenantId from tenant store
const tenantStore = useTenantStore()
const { currentTenantId } = storeToRefs(tenantStore)

// If editing existing profile, load data (placeholder)
if (route.name !== 'profileNew' && route.params.id) {
  profile.value = { name: '' }
  selectedPermissions.value = []
}

import { useCreateOneProfileMutation } from '@/generated/graphql'
const { mutate: createOneProfile } = useCreateOneProfileMutation()

async function submit(submitEventPromise: any) {
  const { valid } = await submitEventPromise
  if (!valid) return

  try {
    submitting.value = true

    if (route.name === 'profileNew') {
      if (!currentTenantId.value) {
        throw new Error(t('profile.errors.noTenant'))
      }

      const res = await createOneProfile({
        input: {
          profile: {
            tenantId: currentTenantId.value,
            resolvers: selectedPermissions.value,
          },
        },
      })

      if (res?.data?.createOneProfile?.id) {
        router.push({ name: 'profileList' })
        return
      }

      throw new Error(t('profile.errors.createFailed'))
    } else {
      router.push({ name: 'profileList' })
    }
  } catch (err: any) {
    console.error('Erro ao salvar perfil:', err)
    alert(err?.message || t('profile.errors.generic'))
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.resolver-grid {
  margin-left: -8px;
  margin-right: -8px;
}
.resolver-checkbox {
  margin: 2px 0;
  padding: 0;
  --v-input-control-height: 24px;
}
</style>

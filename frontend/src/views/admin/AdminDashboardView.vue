<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4 pa-6">
            <v-icon left color="primary" size="large">mdi-shield-crown</v-icon>
            {{ t('adminDashboard.title') }}
          </v-card-title>
          <v-card-subtitle class="px-6 pb-4">
            {{ t('adminDashboard.subtitle') }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon left color="primary">mdi-account-plus</v-icon>
            {{ t('adminDashboard.users.title') }}
          </v-card-title>
          <v-card-text>
            {{ t('adminDashboard.users.description') }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="outlined"
              :to="{ name: 'adminUserCreate' }"
              prepend-icon="mdi-plus"
            >
              {{ t('adminDashboard.users.createButton') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon left color="secondary">mdi-domain</v-icon>
            {{ t('adminDashboard.tenants.title') }}
          </v-card-title>
          <v-card-text>
            {{ t('adminDashboard.tenants.description') }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              variant="outlined"
              :to="{ name: 'adminTenantCreate' }"
              prepend-icon="mdi-plus"
            >
              {{ t('adminDashboard.tenants.createButton') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon left color="secondary">mdi-domain</v-icon>
            {{ t('adminDashboard.tenants.listTitle') }}
          </v-card-title>
          <v-card-text>
            <v-table density="comfortable">
              <thead>
                <tr>
                  <th class="text-left">{{ t('adminDashboard.tenants.headers.name') }}</th>
                  <th class="text-left">{{ t('adminDashboard.tenants.headers.owner') }}</th>
                  <th class="text-left">{{ t('adminDashboard.tenants.headers.created') }}</th>
                  <th class="text-left">{{ t('adminDashboard.tenants.headers.actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in tenants" :key="t.id">
                  <td>{{ t.name }}</td>
                  <td>{{ t.owner?.email || '-' }}</td>
                  <td>{{ formatDate(t.created) }}</td>
                  <td>
                    <v-btn
                      v-if="isAdmin"
                      size="small"
                      variant="text"
                      :color="isFavorite(t.id) ? 'warning' : 'primary'"
                      :prepend-icon="isFavorite(t.id) ? 'mdi-star' : 'mdi-star-outline'"
                      @click="toggleFavorite(t.id)"
                    >
                      {{ isFavorite(t.id) ? tKey('adminDashboard.tenants.unfavorite') : tKey('adminDashboard.tenants.favorite') }}
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGetTenantsQuery } from '@/generated/graphql'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useTenantStore } from '../../stores/tenantStore'

const { result } = useGetTenantsQuery()
const { t } = useI18n()
const authStore = useAuthStore()
const tenantStore = useTenantStore()

const tenants = computed(() => (result.value?.tenants?.edges || []).map(e => e.node))
const isAdmin = computed(() => authStore.isAdmin())

const tKey = (key: string) => t(key)

const isFavorite = (id: string) => tenantStore.isFavorite(id)
const toggleFavorite = (id: string) => tenantStore.toggleFavorite(id)

function formatDate(date?: string | Date) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString()
}
</script>
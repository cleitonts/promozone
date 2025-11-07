<template>
  <v-card class="overflow-visible">
    <the-card-title :text="t('settings.title')" icon="fa6-solid:gear" bg-color="bg-secondary-gradient" text-color="white" />
    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="items"
        :header="headers"
        @update="getList"
      >
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, computed } from 'vue'
import { useTenants } from '@/composables/useTenants'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useGetTenantUsersQuery, type GetTenantUsersQuery } from '@/generated/graphql'

const { t } = useI18n()
const { fetchAllTenants, tenants } = useTenants()
const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)
const items = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)
const headers = computed(() => ({
  id: t('common.id'),
  name: t('common.name'),
  registeredUsers: t('settings.registeredUsers'),
}))

const userCounts = ref<Record<string, number>>({})
type UserNode = GetTenantUsersQuery['users']['edges'][number]['node']
const { refetch: refetchTenantUsers } = useGetTenantUsersQuery({ tenantId: '' }, { fetchPolicy: 'network-only' })

const getRegisteredUsersCount = async (tenantId: string): Promise<number> => {
  const cached = userCounts.value[tenantId]
  if (typeof cached === 'number') return cached
  const result = await refetchTenantUsers({ tenantId })
  const nodes: UserNode[] = (result?.data?.users?.edges || []).map((e: any) => e.node)
  const count = nodes.length
  userCounts.value[tenantId] = count
  return count
}

const getList = async () => {
  await fetchAllTenants()
  const uid = userId.value
  const nodes = (tenants.value as any[]) || []
  const owned = nodes.filter((n: any) => String(n.ownerId) === String(uid))
  const base = owned.map((n: any) => ({ id: n.id || '', name: n.name || '' }))
  items.value = await Promise.all(
    base.map(async (b: any) => ({
      id: b.id,
      name: b.name,
      registeredUsers: await getRegisteredUsersCount(b.id),
    }))
  )
  totalItems.value = items.value.length
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
</style>
<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('user.admin.listTitle')"
      icon="fa6-solid:users"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            color="secondary"
            icon="fa6-solid:plus"
            class="position-absolute mt-n5 mb-3"
            :to="{ name: 'adminUserCreate' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="items"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="email" :label="t('user.fields.email')" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="nameFilter" :label="t('user.admin.fields.name')" />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'adminUserCreate' }"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref, computed } from 'vue'
import { useUsers } from '@/composables/useUsers'
import { useTenants } from '@/composables/tenants'
import { useI18n } from 'vue-i18n'

const { fetchAllUsers, users: usersSource } = useUsers()
const { fetchAllTenants, tenants } = useTenants()

const items = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)
const email = ref('')
const nameFilter = ref('')
const { t } = useI18n()

const headers = computed(() => ({
  action: '#',
  id: t('common.id'),
  name: t('user.admin.fields.name'),
  email: t('user.fields.email'),
  ownerTenantsCount: t('user.admin.fields.ownerTenantsCount'),
  visibleTenantsCount: t('user.admin.fields.visibleTenantsCount'),
}))

const resolveName = (u: any): string => {
  const first = u?.name?.first || ''
  const last = u?.name?.last || ''
  const combined = `${first} ${last}`.trim()
  return combined || (u?.name || '')
}

const getList = async function () {
  await Promise.all([fetchAllUsers(), fetchAllTenants()])
  const tenantList = tenants.value || []
  const data = (usersSource.value || []).map((user: any) => {
    const ownerCount = tenantList.filter((t: any) => String(t.ownerId) === String(user.id)).length
    return {
      id: user.id || '',
      name: resolveName(user),
      email: user.email || '',
      ownerTenantsCount: ownerCount,
      visibleTenantsCount: 0,
    }
  })
  const filtered = data.filter((u: any) => {
    const matchEmail = email.value ? String(u.email).toLowerCase().includes(String(email.value).toLowerCase()) : true
    const matchName = nameFilter.value ? String(u.name).toLowerCase().includes(String(nameFilter.value).toLowerCase()) : true
    return matchEmail && matchName
  })
  items.value = filtered
  totalItems.value = filtered.length
}

onMounted(() => {
  getList()
})
</script>
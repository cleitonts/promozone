<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('user.listTitle')"
      icon="fa6-solid:person"
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
            :to="{ name: 'usersNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="users"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="12" sm="6">
            <v-text-field v-model="email" :rules="emailRules" :label="t('user.fields.email')" required />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'usersEdit', params: { id: element.id } }"
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
import { useI18n } from 'vue-i18n'

const { fetchAllUsers, users: usersSource } = useUsers()
const email = ref('')
const users = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)
const { t } = useI18n()

const headers = computed(() => ({
  action: '#',
  id: t('common.id'),
  email: t('user.fields.email'),
}))

const emailRules = [
  (v: string) => !!v || t('user.validation.emailRequired'),
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || t('user.validation.emailInvalid'),
]

const getList = async function () {
  await fetchAllUsers()
  if (usersSource.value) {
    users.value = usersSource.value.map((user: any) => ({
      id: user.id || '',
      email: user.email || '',
    }))
    totalItems.value = users.value.length
  }
}

onMounted(() => {
  getList()
})
</script>

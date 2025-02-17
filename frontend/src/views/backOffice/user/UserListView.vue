<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Users"
      icon="fa6-solid:person"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            icon="fa6-solid:plus"
            color="success"
            class="bg-success-gradient position-absolute mt-n5 mb-3 text-white icon-fix"
            :to="{ name: 'perfilNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <v-form @submit.prevent="getList()">
        <v-row>
          <v-btn type="submit" class="d-none"></v-btn>
          <v-col cols="6">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required />
          </v-col>
        </v-row>
      </v-form>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="users"
        :header="headers"
        @update:limit="getList()"
        @update:page="getList()"
      >
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
import { type IUser, useUserApi } from '@/api/user.api'
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref } from 'vue'
import { page, limit } from '@/api/user.api'
import type { VForm } from 'vuetify/lib/components/index.mjs'

const email = ref('')
const users = ref<IUser[]>([])
const totalItems = ref(0)
const headers = {
  action: '#',
  id: 'Id',
  email: 'Email',
}

const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ) || 'E-mail must be valid',
]

const getList = async function () {
  const response = await useUserApi().getAll()
  totalItems.value = response.data.totalItems
  users.value = response.data.data
}

onMounted(() => {
  getList()
})
</script>

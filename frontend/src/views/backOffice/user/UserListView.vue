<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Users"
      icon="fa fa-person"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            icon="fas fa-plus"
            class="bg-success-gradient position-absolute mt-n5 mb-3 text-white icon-fix"
            :to="{ name: 'usersNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <v-form ref="searchForm" @submit.prevent="getList()">
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
        class="collaborators-table"
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
              icon="fa fa-pencil"
              :to="{ name: 'usersEdit', params: { id: element.id } }"
            />
          </td>
        </template>

        <template
          v-for="slotName in ['123', 'asd', 'dfasd']"
          #[slotName]="{ text }"
          :key="slotName"
        >
          <td>
            <span class="font-weight-bold">{{ text ? text : '-' }}</span>
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { IUser, useUserApi } from '@/api/user.api'
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref } from 'vue'
import { page, limit } from '@/api/user.api'

const searchForm = ref(null)
const email = ref('')
const users = ref<IUser[]>([])
const headers = {
  action: '#',
  id: 'Id',
  email: 'Email',
}

const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ) || 'E-mail must be valid',
]

const getList = async function () {
  const response = await useUserApi().getAll()
  users.value = response.data.data
}

onMounted(() => {
  getList()
})
</script>

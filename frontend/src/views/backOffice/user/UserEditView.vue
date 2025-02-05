<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="User"
      icon="fas fa-person"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form ref="usersForm">
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required />
          </v-col>
          <v-col cols="6">
            <v-select v-model="user.profile" label="Profile" required :items="profileList">
            </v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-container fluid class="justify-end d-flex">
      <v-btn class="success" @click="validate"> Send </v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref } from 'vue'
import { IUser, useUserApi } from '@/api/user.api'

const route = useRoute()
const user = ref<IUser | null>(null)
if (route.name !== 'usersNew') {
  const response = await useUserApi().getSingle(route.params.id as string)
  user.value = response.data.data
  const rolesResponse = await useUserApi().getRoles()
  console.log(rolesResponse)
}

const usersForm = ref(null)
const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ) || 'E-mail must be valid',
]

const validate = async function () {
  const response = await this.usersSend(this.user.email)
  user.value = response.data.data
  this.$router.push({ name: 'usersEdit', params: { id: user.value.id } })
}
</script>

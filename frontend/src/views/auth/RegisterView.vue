<template>
  <v-container fluid>
    <v-card class="mx-auto mt-16" elevation="15" max-width="400">
      <v-card-title class="text-center">
        <h3 class="pa-3">User Registration</h3>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="first" label="First name" variant="underlined" color="primary" />

        <v-text-field v-model="last" label="Last name" variant="underlined" color="primary" />

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          variant="underlined"
          color="primary"
        />

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          variant="underlined"
          color="primary"
        />

        <v-checkbox v-model="terms" label="I agree to site terms and conditions" color="primary" />
      </v-card-text>

      <v-divider />

      <router-link
        class="text-decoration-none d-block pa-3 text-center text-secondary"
        :to="{ name: 'login' }"
      >
        Sign in
      </router-link>

      <v-card-actions>
        <v-spacer />

        <v-btn block color="success" variant="elevated"> Complete Registration </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { ref } from 'vue'

if (router.currentRoute.value.name === 'resetPassword') {
  console.log('getbytoken')
}

const first = ref('')
const last = ref('')
const email = ref('')

const password = ref('')
const terms = ref(false)
const passwordRules = [(v: string) => !!v || 'Password is required']
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
]
</script>

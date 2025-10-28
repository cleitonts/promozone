<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="User"
      icon="fas fa-person"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="validate">
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required />
          </v-col>
          <v-col cols="6" v-if="route.name === 'usersNew'">
            <v-text-field v-model="user.password" label="Password" type="password" required />
          </v-col>
          <v-col cols="6" v-if="route.name === 'usersNew'">
            <v-text-field v-model="user.perfilId" label="Perfil ID" required />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-container fluid class="justify-end d-flex">
      <v-btn class="success" type="submit" @click="validate"> Send </v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'
import { router } from '@/router'

const route = useRoute()
const { fetchUser, createUser, currentUser } = useUsers()
const user = ref({ email: '', password: '', perfilId: '' })

const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid',
]

const validate = async function () {
  if (route.name === 'usersNew') {
    try {
      await createUser({
        email: user.value.email,
        password: user.value.password,
        perfilId: user.value.perfilId,
      })
      router.push({ name: 'usersList' })
    } catch (error) {
      console.error('Error creating user:', error)
    }
  } else {
    // For editing existing users, we would need an update mutation
    console.log('Update user functionality not implemented yet')
  }
}

// Load user data if editing
onMounted(async () => {
  if (route.name !== 'usersNew' && route.params.id) {
    await fetchUser(route.params.id as string)
    if (currentUser.value) {
      user.value.email = currentUser.value.email || ''
    }
  }
})
</script>

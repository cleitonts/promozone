<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('user.editTitle')"
      icon="fas fa-person"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="validate">
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="user.email" :rules="emailRules" :label="t('user.fields.email')" required />
          </v-col>
          <v-col cols="6" v-if="route.name === 'usersNew'">
            <v-text-field v-model="user.password" :label="t('user.fields.password')" type="password" required />
          </v-col>
          <v-col cols="6" v-if="route.name === 'usersNew'">
            <v-text-field v-model="user.perfilId" :label="t('user.fields.perfilId')" required />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-container fluid class="justify-end d-flex">
      <v-btn class="success" type="submit" @click="validate"> {{ t('user.actions.send') }} </v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'
import { router } from '@/router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { fetchUser, createUser, currentUser } = useUsers()
const user = ref({ email: '', password: '', perfilId: '' })
const { t } = useI18n()

const emailRules = [
  (v: string) => !!v || t('user.validation.emailRequired'),
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || t('user.validation.emailInvalid'),
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
      console.error('Error creating user', error)
    }
  } else {
    console.log('Update user functionality not implemented yet')
  }
}

onMounted(async () => {
  if (route.name !== 'usersNew' && route.params.id) {
    await fetchUser(route.params.id as string)
    if (currentUser.value) {
      user.value.email = currentUser.value.email || ''
    }
  }
})
</script>

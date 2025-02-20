<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Perfil"
      icon="fluent-mdl2:permissions"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="perfil.name"
              label="Name"
              required
              :rules="[(v: string) => !!v || 'Name is required']"
            />
          </v-col>
          <v-col cols="12">
            <label>Permissions</label>
          </v-col>
          <v-col cols="12" sm="6" v-for="(permission, index) in permissions" :key="index">
            <label>{{ index }}</label>
            <v-checkbox
              hide-details="auto"
              density="compact"
              v-for="(p, i) in permission"
              :key="i"
              v-model="selectedPermissions"
              :label="p"
              :value="`${index}:${p}`"
            />
          </v-col>
        </v-row>
        <div class="justify-end d-flex">
          <v-btn class="success" type="submit"> Send </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheCardTitle } from '@/components'
import { ref } from 'vue'
import { type IPerfil, usePerfilApi } from '@/api/perfil.api'
import type { SubmitEventPromise } from 'vuetify/lib/framework.mjs'
import { router } from '@/router'

const route = useRoute()
const perfil = ref<IPerfil>({} as IPerfil)

const permissionsResponse = await usePerfilApi().getPermissions()
const permissions = permissionsResponse.data.data
const selectedPermissions = ref<string[]>([])

if (route.name !== 'perfilNew') {
  const response = await usePerfilApi().getSingle(route.params.id as string)
  perfil.value = response.data.data
  selectedPermissions.value = response.data.data.permissions || []
}

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) {
    if (route.name !== 'perfilNew') {
      await usePerfilApi().put(route.params.id as string, {
        name: perfil.value.name,
        permissions: selectedPermissions.value,
      })
    } else {
      const response = await usePerfilApi().post({
        name: perfil.value.name,
        permissions: selectedPermissions.value,
      })

      router.push({ name: 'perfilEdit', params: { id: response.data.data.id } })
    }
  }
}
</script>

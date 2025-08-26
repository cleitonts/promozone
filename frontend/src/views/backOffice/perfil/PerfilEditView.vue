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
              :label="String(p)"
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
import { useGetPerfilPermissionsQuery } from '@/generated/graphql'
import { type SubmitEventPromise } from 'vuetify'
import { router } from '@/router'

const route = useRoute()
const perfil = ref({ name: '' })

// Get permissions using GraphQL query
const { result: permissionsResult } = useGetPerfilPermissionsQuery()
const permissions = ref({})
const selectedPermissions = ref<string[]>([])

// Watch for permissions result
if (permissionsResult.value) {
  permissions.value = permissionsResult.value.getPerfilPermissions || {}
}

// If editing existing perfil, load data
if (route.name !== 'perfilNew' && route.params.id) {
  // Note: Since we don't have a getSingle query for perfil in the schema,
  // we'll just initialize with empty data for now
  perfil.value = { name: '' }
  selectedPermissions.value = []
}

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) {
    // Note: Since createPerfil and updatePerfil mutations were not available
    // in the schema introspection, we'll just show a placeholder
    console.log('Perfil data:', {
      name: perfil.value.name,
      permissions: selectedPermissions.value,
    })
    
    // Navigate back or to edit page
    if (route.name === 'perfilNew') {
      router.push({ name: 'perfilList' })
    }
  }
}
</script>

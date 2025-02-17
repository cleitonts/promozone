<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Perfil"
      icon="fluent-mdl2:permissions"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form ref="perfilForm">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="perfil.name" label="Name" required />
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
              @update:model-value="console.log(selectedPermissions)"
            />
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
import { IPerfil, usePerfilApi } from '@/api/perfil.api'

const route = useRoute()
const perfil = ref<IPerfil | null>(null)

const permissionsResponse = await usePerfilApi().getPermissions()
const permissions = permissionsResponse.data.data
const selectedPermissions = ref<string[]>([])

if (route.name !== 'perfilNew') {
  const response = await usePerfilApi().getSingle(route.params.id as string)
  perfil.value = response.data.data
  selectedPermissions.value = response.data.data.permissions
}

const perfilForm = ref(null)

const validate = async function () {
  // const response = await usePerfilApi().post(this.user.email)
  // user.value = response.data.data
  // this.$router.push({ name: 'usersEdit', params: { id: user.value.id } })
}
</script>

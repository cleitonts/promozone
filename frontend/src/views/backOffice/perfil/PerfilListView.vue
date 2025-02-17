<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Perfil"
      icon="fluent-mdl2:permissions"
      bg-color="bg-success-gradient"
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
            <v-text-field v-model="email" label="E-mail" required />
          </v-col>
        </v-row>
      </v-form>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        class="collaborators-table"
        :matrix="perfils"
        :header="{
          action: '#',
          id: 'Id',
          name: 'Name',
          permissions: 'Permissions',
        }"
        @update="getList()"
      >
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'perfilEdit', params: { id: element.id } }"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref } from 'vue'
import { type IPerfil, usePerfilApi, page, limit } from '@/api/perfil.api'

type perfilList = Overwrite<IPerfil, { permissions: number }>[]

const email = ref('')
const perfils = ref<perfilList>([] as perfilList)

const getList = async function () {
  const response = await usePerfilApi().getAll()
  perfils.value = response.data.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      permissions: item.permissions?.length,
    }
  })
}

onMounted(() => {
  getList()
})
</script>

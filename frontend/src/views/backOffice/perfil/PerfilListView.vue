<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Perfil"
      icon="fluent-mdl2:permissions"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            color="secondary"
            icon="fa6-solid:plus"
            class="position-absolute mt-n5 mb-3"
            :to="{ name: 'perfilNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        class="collaborators-table"
        :matrix="perfils"
        :total-items="totalItems"
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
            <v-btn
              class="ml-2 icon-fix"
              color="error"
              size="x-small"
              icon="fa6-solid:xmark"
              @click="
                () => {
                  deletePerfilItem = element
                  showConfirmDialog = true
                }
              "
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
    <TheConfirmationDialog
      v-model="showConfirmDialog"
      :title="'Delete perfil: ' + deletePerfilItem.name"
      description="do you want to delete this perfil?"
      @accept="deletePerfil"
      @reject="showConfirmDialog = false"
    />
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle, TheConfirmationDialog } from '@/components'
import { onMounted, ref } from 'vue'
import { type IPerfil, usePerfilApi, page, limit } from '@/api/perfil.api'

type perfilList = Overwrite<IPerfil, { permissions: number }>[]

const perfils = ref<perfilList>([] as perfilList)
const totalItems = ref(0)
const showConfirmDialog = ref(false)
const deletePerfilItem = ref({} as Record<string, string>)

const getList = async function () {
  const response = await usePerfilApi().getAll()
  perfils.value = response.data.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      permissions: item.permissions?.length,
    }
  })
  totalItems.value = response.data.totalItems
}

const deletePerfil = async function () {
  const response = await usePerfilApi().remove(deletePerfilItem.value.id)
  showConfirmDialog.value = false
  if (response.status === 200) {
    getList()
  }
}

onMounted(() => {
  getList()
})
</script>

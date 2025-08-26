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
                  deletePerfilItem = element as unknown as PerfilListItem
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
import { useRemovePerfilMutation } from '@/generated/graphql'

type PerfilListItem = {
  id: string
  name: string
  permissions: number
}

const perfils = ref<PerfilListItem[]>([])
const totalItems = ref(0)
const showConfirmDialog = ref(false)
const deletePerfilItem = ref({} as PerfilListItem)
const page = ref(1)
const limit = ref(10)

// GraphQL mutation for removing perfil
const { mutate: removePerfil } = useRemovePerfilMutation()

const getList = async function () {
  // Note: Since we don't have a getAllPerfils query in the schema,
  // we'll use placeholder data for now
  perfils.value = [
    { id: '1', name: 'Admin', permissions: 5 },
    { id: '2', name: 'User', permissions: 2 },
  ]
  totalItems.value = perfils.value.length
}

const deletePerfil = async function () {
  try {
    await removePerfil({ id: deletePerfilItem.value.id })
    showConfirmDialog.value = false
    getList() // Refresh the list
  } catch (error) {
    console.error('Error deleting perfil:', error)
    showConfirmDialog.value = false
  }
}

onMounted(() => {
  getList()
})
</script>

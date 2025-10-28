<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('perfil.listTitle')"
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
        :header="headers"
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
              @click="() => { deletePerfilItem = element as unknown as PerfilListItem; showConfirmDialog = true }"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
    <TheConfirmationDialog
      v-model="showConfirmDialog"
      :title="t('perfil.confirmDeleteTitle', { name: deletePerfilItem.name || deletePerfilItem.id })"
      :description="t('perfil.confirmDeleteDescription')"
      @accept="deletePerfil"
      @reject="showConfirmDialog = false"
    />
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle, TheConfirmationDialog } from '@/components'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGetProfilesQuery, useDeleteOneProfileMutation } from '@/generated/graphql'

const { t } = useI18n()

type PerfilListItem = {
  id: string
  name?: string
  permissions: number
}

const perfils = ref<PerfilListItem[]>([])
const totalItems = ref(0)
const showConfirmDialog = ref(false)
const deletePerfilItem = ref({} as PerfilListItem)
const page = ref(1)
const limit = ref(10)

const headers = {
  action: '#',
  id: t('common.id'),
  name: t('common.name'),
  permissions: t('menu.permissions'),
}

const { result: profilesResult, refetch: refetchProfiles } = useGetProfilesQuery()
const { mutate: deleteOneProfile } = useDeleteOneProfileMutation()

const getList = async function () {
  const data = profilesResult.value
  const edges = data?.profiles?.edges ?? []
  const list = edges.map((e: any) => e.node)
  perfils.value = list.map((p: any) => ({
    id: p.id,
    name: p.displayName ?? p.id ?? '-',
    permissions: Array.isArray(p.resolvers) ? p.resolvers.length : 0,
  }))
  totalItems.value = perfils.value.length
}

const deletePerfil = async function () {
  try {
    await deleteOneProfile({ input: { id: deletePerfilItem.value.id } })
    showConfirmDialog.value = false
    await refetchProfiles()
    await getList()
  } catch (error) {
    console.error('Error deleting perfil:', error)
    showConfirmDialog.value = false
  }
}

onMounted(() => {
  getList()
})
</script>

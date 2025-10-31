<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('perfil.listTitle')"
      icon="fluent-mdl2:permissions"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
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
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGetProfilesQuery } from '@/generated/graphql'

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
  id: t('common.id'),
  name: t('common.name'),
  permissions: t('menu.permissions'),
}

const { result: profilesResult, refetch: refetchProfiles } = useGetProfilesQuery()

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

// Delete operation removed

onMounted(() => {
  getList()
})
</script>

<template>
  <v-app-bar class="bg-secondary-gradient">
    <img :width="150" :src="imgUrl" />
    <v-btn icon="fa6-solid:bars" :title="t('app.switchMenu')" @click.stop="switchMenu()" />
    <v-spacer />
    <v-select
      class="mr-3"
      :label="t('app.tenantsDropdownLabel')"
      variant="underlined"
      density="comfortable"
      hide-details
      :items="tenantOptions"
      item-title="name"
      item-value="id"
      v-model="selectedTenantId"
      :placeholder="t('app.tenantsSelect')"
    />
    <v-btn
      icon="fa6-solid:arrow-right-from-bracket"
      :title="t('app.logout')"
      @click="logout"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useInterfaceStore } from '@/stores/interfaceStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useTenantStore } from '@/stores/tenantStore'

const { t } = useI18n()
const imgUrl = new URL('/logo.png', import.meta.url).href
const switchMenu = useInterfaceStore().switchMenu
const tenantStore = useTenantStore()

const tenantOptions = computed(() => tenantStore.availableTenants)
const selectedTenantId = computed({
  get: () => tenantStore.currentTenantId,
  set: (val: string | null) => tenantStore.setCurrentTenant(val)
})

const logout = async () => {
  await useInterfaceStore().logout()
}
</script>

<template>
  <v-app-bar class="bg-secondary-gradient">
    <div class="app-title">
      <span class="promo">Promo</span><span class="zone">Zone</span>
    </div>
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
    <v-menu location="bottom end">
      <template #activator="{ props }">
        <v-btn v-bind="props" icon="fa6-solid:grip" :title="t('menu.more')" />
      </template>
      <v-list density="comfortable">
        <v-list-item :to="{ name: 'settingsDashboard' }" :title="t('menu.settings')" prepend-icon="fa6-solid:gear" />
        <v-list-item :title="t('app.logout')" prepend-icon="fa6-solid:arrow-right-from-bracket" @click="logout" />
        <v-list-group :value="t('menu.account')" prepend-icon="fa6-solid:user">
          <v-list-item :title="t('menu.settings')" :to="{ name: 'settingsDashboard' }" />
          <v-list-item :title="t('app.logout')" @click="logout" />
        </v-list-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useInterfaceStore } from '@/stores/interfaceStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useTenantStore } from '@/stores/tenantStore'

const { t } = useI18n()
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

<style scoped>
.app-title {
  min-width: 150px;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.5px;
  display: inline-flex;
}
.promo {
  color: var(--v-theme-primary);
}
.zone {
  color: var(--v-theme-secondary);
}
</style>

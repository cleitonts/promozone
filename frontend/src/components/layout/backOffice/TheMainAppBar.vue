<template>
  <v-app-bar class="bg-secondary-gradient">
    <img :width="150" :src="imgUrl" />
    <v-btn icon="fa6-solid:bars" :title="t('app.switchMenu')" @click.stop="switchMenu()" />
    <v-spacer />
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

const { t } = useI18n()
const imgUrl = new URL('/logo.png', import.meta.url).href
const switchMenu = useInterfaceStore().switchMenu

const logout = async () => {
  await useInterfaceStore().logout()
}
</script>

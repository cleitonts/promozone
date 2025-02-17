<template>
  <v-app-bar class="bg-secondary-gradient">
    <img :width="150" :src="imgUrl" />
    <v-btn icon="fa6-solid:bars" title="Switch menu" @click.stop="switchMenu()" />
    <v-spacer />
    <v-btn
      icon="fa6-solid:arrow-right-from-bracket"
      title="Logout"
      @click="
        async () => {
          await useInterfaceStore().logout()
        }
      "
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useInterfaceStore } from '@/stores/interfaceStore'

const imgUrl = new URL('/logo.png', import.meta.url).href
const switchMenu = useInterfaceStore().switchMenu
</script>

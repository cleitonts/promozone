<template>
  <v-app-bar class="bg-secondary-gradient">
    <img :width="150" :src="imgUrl" />
    <v-btn class="fa fa-bars" icon title="Switch menu" @click.stop="switchMenu()" />
    <v-spacer />
    <v-btn class="fa fa-sign-out" icon title="Logout" @click="useInterfaceStore().logout()" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useInterfaceStore } from '@/stores/interfaceStore'

const imgUrl = new URL('/logo.png', import.meta.url).href
const switchMenu = useInterfaceStore().switchMenu
</script>

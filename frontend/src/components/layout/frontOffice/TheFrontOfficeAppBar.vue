<template>
  <v-app-bar class="bg-primary-gradient">
    <img :width="120" :src="imgUrl" />
    <v-spacer />
    <router-link :to="{ name: 'FOCreatePost' }">
      <v-btn class="fa fa-plus info mr-3" size="small" icon title="New" />
    </router-link>

    <v-btn class="fa fa-sign-out" icon title="Logout" />
  </v-app-bar>
</template>

<script setup lang="ts">
const imgUrl = new URL('/logo.png', import.meta.url).href
</script>

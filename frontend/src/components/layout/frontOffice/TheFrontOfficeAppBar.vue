<template>
  <v-app-bar class="bg-primary-gradient">
    <div class="app-title">
      <span class="promo">Promo</span><span class="zone">Zone</span>
    </div>
    <v-spacer />
    <router-link :to="{ name: 'FOCreatePost' }">
      <v-btn class="fa fa-plus info mr-3" size="small" icon title="New" />
    </router-link>

    <v-btn class="fa fa-sign-out" icon title="Logout" />
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-title {
  min-width: 150px;
  font-weight: 900;
  font-size: 22px;
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

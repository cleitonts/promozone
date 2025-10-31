<template>
  <TheMainAppBar />

  <TheMainMenu />

  <v-main ref="mainView" style="position: relative;">
    <TheRequestOverlay target="main-content" />
    <v-container ref="mainContainer" fluid>
      <router-view v-slot="{ Component, route }" name="default">
        <transition
          :key="route.path"
          :name="route.meta.transition as string"
          mode="out-in"
          :duration="300"
        >
          <suspense>
            <template #default>
              <component :is="Component" :key="route.path" />
            </template>
            <template #fallback>
              <the-spinner :height="containerHeight + 'px'"></the-spinner>
            </template>
          </suspense>
        </transition>
      </router-view>
      <suspense>
        <the-notifications />
      </suspense>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import TheMainAppBar from '@/components/layout/backOffice/TheMainAppBar.vue'
import TheMainMenu from '@/components/layout/backOffice/TheMainMenu.vue'
import TheNotifications from '@/components/layout/TheNotifications.vue'
import { TheRequestOverlay } from '@/components'
import { ref, onMounted } from 'vue'
import type { VContainer } from 'vuetify/components'

const mainContainer = ref<VContainer | null>(null)
const containerHeight = ref(0)

onMounted(() => {
  if (mainContainer.value) containerHeight.value = mainContainer.value.$vuetify.display.height - 152
})
</script>

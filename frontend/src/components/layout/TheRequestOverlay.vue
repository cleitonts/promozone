<template>
  <v-overlay
    :model-value="visible"
    contained
    persistent
    class="request-overlay"
  >
    <v-progress-circular indeterminate color="primary" size="48" />
  </v-overlay>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInterfaceStore } from '@/stores/interfaceStore'

const props = defineProps<{ target: string }>()
const interfaceStore = useInterfaceStore()
const visible = computed(() => interfaceStore.isLoading(props.target))
</script>

<style scoped>
.request-overlay {
  position: absolute;
  inset: 0;
}
</style>
<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    tile
    contained
    :color="type"
    :multi-line="false"
    location="right bottom"
  >
    <template #default>
      {{ text }}
    </template>

    <template #actions>
      <v-btn icon color="white" variant="text" @click="snackbar = false">
        <i class="fa fa-times" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { EMessageType, useInterfaceStore } from '@/stores/interfaceStore'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  text: string
  title?: string
  lastId: number
  type?: EMessageType
  timeout?: number
}>()

const snackbar = ref(true)

watchEffect(() => {
  if (!snackbar.value) {
    const { removeMessage } = useInterfaceStore()
    removeMessage(props.lastId)
  }
})
</script>

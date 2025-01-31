<template>
  <div v-if="messages.length" class="notification-wrapper">
    <the-notification
      v-for="notification in messages"
      :key="notification.id"
      :last-id="notification.id"
      :text="notification.text"
      :timeout="notification.time"
      :type="notification.type"
    >
    </the-notification>
  </div>
</template>
<script setup lang="ts">
import { useInterfaceStore } from '@/stores/interfaceStore'
// import TheNotification from './TheNotification.vue'

const messages = useInterfaceStore().messages
</script>

<style lang="scss">
.notification-wrapper {
  position: fixed;
  right: 10px;
  bottom: 30px;
  z-index: 2000;

  & .v-overlay--contained {
    position: relative;
    height: auto;
  }

  & .v-overlay__content {
    position: relative;
  }
}
</style>

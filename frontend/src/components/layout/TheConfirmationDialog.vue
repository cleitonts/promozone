<template>
  <v-dialog v-model="active" max-width="400px" @keydown="handleKeydown">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="red" variant="text" @click="handleReject">Cancel</v-btn>
        <v-btn color="green" variant="flat" @click="handleAccept">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string }>()

const emit = defineEmits(['accept', 'reject'])
const active = defineModel<boolean>({ required: true })

const handleAccept = () => {
  emit('accept')
}

const handleReject = () => {
  emit('reject')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') handleReject()
  if (event.key === 'Enter') handleAccept()
}
</script>

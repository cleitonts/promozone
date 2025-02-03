<template>
  <v-list-item :key="item.title" link :to="{ name: item.routeName }">
    <template v-if="item.icon" #prepend>
      <v-icon :icon="item.icon" size="small" />
    </template>
    <v-list-item-title>
      {{ item.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
export interface IMenuItem {
  title?: string
  routeName?: string
  icon?: string
  group?: boolean
  items?: IMenuItem[]
}

defineProps<{
  item: IMenuItem
}>()
</script>

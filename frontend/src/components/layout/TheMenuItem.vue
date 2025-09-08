<template>
  <v-list-item :key="item.title" link :to="item.to || (item.routeName ? { name: item.routeName } : undefined)">
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
  to?: string
  icon?: string
  group?: boolean
  items?: IMenuItem[]
  children?: IMenuItem[]
}

defineProps<{
  item: IMenuItem
}>()
</script>

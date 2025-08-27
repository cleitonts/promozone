<template>
  <v-navigation-drawer v-model="mini" permanent :rail="!interfaceStore.menuOpen" expand-on-hover>
    <v-list dense class="main-menu">
      <template v-for="item in items" :key="item.title">
        <template v-if="item.items">
          <v-list-group
            :value="item.title"
            color="primary"
            expand-icon="fa6-solid:fa-sort-down"
            collapse-icon="fa-solid fa-sort-up"
          >
            <template #activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" />
            </template>

            <TheMenuItem v-for="ii in item.items" :key="ii.title" :item="ii" variant="tonal" />
          </v-list-group>
        </template>
        <TheMenuItem v-else :item="item" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { type IMenuItem } from '@/components/layout/TheMenuItem.vue'
import { useInterfaceStore } from '@/stores/interfaceStore'
import { ref } from 'vue'
import TheMenuItem from '@/components/layout/TheMenuItem.vue'

const interfaceStore = useInterfaceStore()
const mini = ref(true)
const items = ref<IMenuItem[]>([
  {
    title: 'Admin',
    icon: 'fa6-solid:user',
    items: [
      {
        title: 'Users',
        routeName: 'usersList',
      },
      {
        title: 'Perfil',
        routeName: 'perfilList',
      },
    ],
  },
  {
    title: 'Catalog',
    icon: 'fa6-solid:store',
    items: [
      {
        title: 'Products',
        routeName: 'productsList',
      },
      {
        title: 'Brands',
        routeName: 'brandsList',
      },
    ],
  },
])
</script>

<style lang="scss">
.main-menu {
  i.fa::before {
    margin-left: 5px;
  }
}
</style>

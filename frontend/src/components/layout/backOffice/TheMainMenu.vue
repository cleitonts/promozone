<template>
  <v-navigation-drawer v-model="mini" permanent :rail="!interfaceStore.menuOpen" expand-on-hover>
    <v-list dense class="main-menu">
      <template v-for="item in menuItems" :key="item.title">
        <template v-if="item.children">
          <v-list-group
            :value="item.title"
            color="primary"
            expand-icon="fa6-solid:fa-sort-down"
            collapse-icon="fa-solid fa-sort-up"
          >
            <template #activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" />
            </template>

            <TheMenuItem v-for="ii in item.children" :key="ii.title" :item="ii" variant="tonal" />
          </v-list-group>
        </template>
        <TheMenuItem v-else :item="item" />
      </template>
    </v-list>

    <template #append>
      <div class="language-switcher">
        <v-btn size="small" variant="text" @click="setLocale('pt')">PT</v-btn>
        <v-btn size="small" variant="text" @click="setLocale('en')">EN</v-btn>
        <v-btn size="small" variant="text" @click="setLocale('dev')">DEV</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useInterfaceStore } from '@/stores/interfaceStore'
import { ref } from 'vue'
import TheMenuItem from '@/components/layout/TheMenuItem.vue'
import { useMenuItems } from './mainMenu'
import { useI18n } from 'vue-i18n'

const interfaceStore = useInterfaceStore()
const mini = ref(true)
const { menuItems } = useMenuItems()
const { locale } = useI18n()

const setLocale = (lang: 'pt' | 'en' | 'dev') => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style lang="scss">
.main-menu {
  i.fa::before {
    margin-left: 5px;
  }
}
.language-switcher {
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  background: rgba(0,0,0,0.03);
}
</style>

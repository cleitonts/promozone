import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'

export interface IMenuItem {
  title: string
  icon: string
  to?: string
  children?: IMenuItem[]
  permission?: string
  requiresAdmin?: boolean
}

const menuItemsConfig = (t: (key: string) => string): IMenuItem[] => [
  {
    title: t('menu.home'),
    icon: 'mdi-home',
    to: '/bo/home'
  },
  {
    title: t('menu.users'),
    icon: 'mdi-account-group',
    to: '/bo/users',
    permission: 'users.read'
  },
  {
    title: t('menu.perfil'),
    icon: 'mdi-account-circle',
    to: '/bo/perfil'
  },
  {
    title: t('menu.products'),
    icon: 'mdi-package-variant',
    to: '/bo/products'
  },
  {
    title: t('menu.brands'),
    icon: 'mdi-tag',
    to: '/bo/brands'
  },
  {
    title: t('menu.categories'),
    icon: 'mdi-shape',
    to: '/bo/categories'
  },
  {
    title: t('menu.administration'),
    icon: 'mdi-cog',
    requiresAdmin: true,
    children: [
      {
        title: t('menu.userRoles'),
        icon: 'mdi-account-cog',
        to: '/admin/users',
        requiresAdmin: true
      },
      {
        title: t('menu.tenants'),
        icon: 'mdi-domain',
        to: '/bo/admin/tenants',
        permission: 'tenant.list'
      },
      
    ]
  }
]

function hasPermission(permission: string | undefined): boolean {
  if (!permission) return true
  const authStore = useAuthStore()
  return authStore.hasPermission(permission)
}

function filterMenuItems(items: IMenuItem[]): IMenuItem[] {
  return items.filter(item => {
    const authStore = useAuthStore()
    if (item.requiresAdmin && !authStore.isAdmin()) {
      return false
    }
    if (item.permission && !hasPermission(item.permission)) {
      return false
    }
    
    if (item.children) {
      const filteredChildren = filterMenuItems(item.children)
      if (filteredChildren.length === 0) {
        return false
      }
      item.children = filteredChildren
    }
    
    return true
  })
}

export const useMenuItems = () => {
  const { t } = useI18n()
  const filteredMenuItems = computed(() => {
    const items = filterMenuItems(menuItemsConfig(t))
    const authStore = useAuthStore()
    const home = items.find(i => i.icon === 'mdi-home')
    if (home) {
      home.to = authStore.isAdmin() ? '/admin' : '/bo/home'
    }
    return items
  })
  
  return {
    menuItems: filteredMenuItems
  }
}

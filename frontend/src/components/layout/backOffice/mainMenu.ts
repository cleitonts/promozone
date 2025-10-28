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
        to: '/bo/users',
        requiresAdmin: true
      },
      {
        title: t('menu.roles'),
        icon: 'mdi-account-key',
        to: '/bo/admin/roles',
        permission: 'roles.read'
      },
      {
        title: t('menu.tenants'),
        icon: 'mdi-domain',
        to: '/bo/admin/tenants',
        permission: 'tenant.list'
      },
      {
        title: t('menu.permissions'),
        icon: 'mdi-shield-account',
        to: '/bo/admin/permissions',
        permission: 'permissions.read'
      }
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
    return filterMenuItems(menuItemsConfig(t))
  })
  
  return {
    menuItems: filteredMenuItems
  }
}
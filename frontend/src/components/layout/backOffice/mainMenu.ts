import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export interface IMenuItem {
  title: string
  icon: string
  to?: string
  children?: IMenuItem[]
  permission?: string
}

const menuItemsConfig: IMenuItem[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    to: '/bo/home'
  },
  {
    title: 'Users',
    icon: 'mdi-account-group',
    to: '/bo/users',
    permission: 'users.read'
  },
  {
    title: 'Perfil',
    icon: 'mdi-account-circle',
    to: '/bo/perfil'
  },
  {
    title: 'Products',
    icon: 'mdi-package-variant',
    to: '/bo/products'
  },
  {
    title: 'Brands',
    icon: 'mdi-tag',
    to: '/bo/brands'
  },
  {
    title: 'Categories',
    icon: 'mdi-shape',
    to: '/bo/categories'
  },
  {
    title: 'Administration',
    icon: 'mdi-cog',
    children: [
      {
        title: 'Roles',
        icon: 'mdi-account-key',
        to: '/bo/admin/roles',
        permission: 'roles.read'
      },
      {
        title: 'Tenants',
        icon: 'mdi-domain',
        to: '/bo/admin/tenants',
        permission: 'tenant.list'
      },
      {
        title: 'Permissions',
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
  const filteredMenuItems = computed(() => {
    return filterMenuItems([...menuItemsConfig])
  })
  
  return {
    menuItems: filteredMenuItems
  }
}
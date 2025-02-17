import { TheEmptyLayout } from '@/components'
import { LoginView, RegisterView } from '@/views'
import type { RouteRecordRaw } from 'vue-router'

export const AuthRoutes: RouteRecordRaw = {
  path: '/auth',
  component: TheEmptyLayout,
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      path: '',
      redirect: () => {
        return { name: 'login' }
      },
    },
    {
      path: 'login',
      name: 'login',
      component: LoginView,
      meta: {
        pageTitle: 'Authentication',
      },
    },
    {
      path: 'register',
      name: 'register',
      component: RegisterView,
      meta: {
        pageTitle: 'User Registration',
      },
    },
  ],
}

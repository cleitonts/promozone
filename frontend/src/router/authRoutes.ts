import { TheEmptyLayout } from '@/components'
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
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        pageTitle: 'Authentication',
      },
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        pageTitle: 'User Registration',
      },
    },
  ],
}

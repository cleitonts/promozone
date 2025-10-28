import TheMainLayout from '@/components/layout/backOffice/TheMainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  meta: {
    requiresAuth: true,
    requiresAdmin: true,
  },
  children: [
    {
      path: '',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'adminDashboard',
          component: () => import('@/views/admin/AdminDashboardView.vue'),
          meta: {
            pageTitle: 'Administração',
            requiresAdmin: true,
          },
        },
      ],
    },
    {
      path: 'users',
      component: TheMainLayout,
      children: [
        {
          path: 'create',
          name: 'adminUserCreate',
          component: () => import('@/views/admin/users/AdminUserCreateView.vue'),
          meta: {
            pageTitle: 'Criar Usuário',
            requiresAdmin: true,
          },
        },
      ],
    },
    {
      path: 'tenants',
      component: TheMainLayout,
      children: [
        {
          path: 'create',
          name: 'adminTenantCreate',
          component: () => import('@/views/admin/tenants/AdminTenantCreateView.vue'),
          meta: {
            pageTitle: 'Criar Tenant',
            requiresAdmin: true,
          },
        },
      ],
    },
  ],
}
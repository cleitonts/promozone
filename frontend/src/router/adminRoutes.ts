import TheMainLayout from '@/components/layout/backOffice/TheMainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
import AdminUserCreateView from '@/views/admin/users/AdminUserCreateView.vue'
import AdminTenantCreateView from '@/views/admin/tenants/AdminTenantCreateView.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  meta: {
    requiresAuth: true,
    requiresPermission: 'tenant.manage',
  },
  children: [
    {
      path: '',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'adminDashboard',
          component: AdminDashboardView,
          meta: {
            pageTitle: 'Administração',
            requiresPermission: 'tenant.manage',
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
          component: AdminUserCreateView,
          meta: {
            pageTitle: 'Criar Usuário',
            requiresPermission: 'users.create',
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
          component: AdminTenantCreateView,
          meta: {
            pageTitle: 'Criar Tenant',
            requiresPermission: 'tenant.create',
          },
        },
      ],
    },
  ],
}
import TheMainLayout from '@/components/layout/backOffice/TheMainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export const backOfficeRoutes: RouteRecordRaw = {
  path: '/bo',
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: 'home',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'backOfficeHome',
          component: () => import('@/views/backOffice/HomeView.vue'),
          meta: {
            pageTitle: 'Home',
          },
        },
      ],
    },
    {
      path: 'settings',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'settingsDashboard',
          component: () => import('@/views/backOffice/settings/SettingsDashboard.vue'),
          meta: {
            pageTitle: 'Settings',
          },
        },
      ],
    },
    {
      path: 'users',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'usersList',
          component: () => import('@/views/backOffice/user/UserListView.vue'),
          meta: {
            pageTitle: 'Users list',
            requiresPermission: 'users.read',
          },
        },
        {
          path: 'new',
          name: 'usersNew',
          component: () => import('@/views/backOffice/user/UserEditView.vue'),
          meta: {
            pageTitle: 'Create user',
            requiresPermission: 'users.create',
          },
        },
        {
          path: 'edit/:id',
          name: 'usersEdit',
          component: () => import('@/views/backOffice/user/UserEditView.vue'),
          meta: {
            pageTitle: 'Edit user',
            requiresPermission: 'users.write',
          },
        },
      ],
    },
    {
      path: 'profile',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'profileList',
          component: () => import('@/views/backOffice/profile/ProfileListView.vue'),
          meta: {
            pageTitle: 'Profile list',
          },
        },
        {
          path: 'new',
          name: 'profileNew',
          component: () => import('@/views/backOffice/profile/ProfileEditView.vue'),
          meta: {
            pageTitle: 'Create profile',
          },
        },
        {
          path: 'edit/:id',
          name: 'profileEdit',
          component: () => import('@/views/backOffice/profile/ProfileEditView.vue'),
          meta: {
            pageTitle: 'Edit profile',
          },
        },
      ],
    },
    {
      path: 'products',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'productsList',
          component: () => import('@/views/backOffice/products/ProductListView.vue'),
          meta: {
            pageTitle: 'Products list',
          },
        },
        {
          path: 'new',
          name: 'productsNew',
          component: () => import('@/views/backOffice/products/ProductEditView.vue'),
          meta: {
            pageTitle: 'Create product',
          },
        },
        {
          path: 'edit/:id',
          name: 'productsEdit',
          component: () => import('@/views/backOffice/products/ProductEditView.vue'),
          meta: {
            pageTitle: 'Edit product',
          },
        },
      ],
    },
    {
      path: 'brands',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'brandsList',
          component: () => import('@/views/backOffice/brands/BrandListView.vue'),
          meta: {
            pageTitle: 'Brands list',
          },
        },
        {
          path: 'new',
          name: 'brandsNew',
          component: () => import('@/views/backOffice/brands/BrandEditView.vue'),
          meta: {
            pageTitle: 'Create brand',
          },
        },
        {
          path: 'edit/:id',
          name: 'brandsEdit',
          component: () => import('@/views/backOffice/brands/BrandEditView.vue'),
          meta: {
            pageTitle: 'Edit brand',
          },
        },
      ],
    },
    {
      path: 'categories',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'categoriesList',
          component: () => import('@/views/backOffice/categories/CategoryListView.vue'),
          meta: {
            pageTitle: 'Categories list',
          },
        },
        {
          path: 'new',
          name: 'categoriesNew',
          component: () => import('@/views/backOffice/categories/CategoryEditView.vue'),
          meta: {
            pageTitle: 'Create category',
          },
        },
        {
          path: 'edit/:id',
          name: 'categoriesEdit',
          component: () => import('@/views/backOffice/categories/CategoryEditView.vue'),
          meta: {
            pageTitle: 'Edit category',
          },
        },
      ],
    },
    
    {
      path: 'admin/tenants',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'tenantsList',
          component: () => import('@/views/backOffice/admin/TenantListView.vue'),
          meta: {
            pageTitle: 'Tenants list',
            requiresPermission: 'tenant.list',
          },
        },
        {
          path: 'new',
          name: 'tenantsNew',
          component: () => import('@/views/backOffice/admin/TenantEditView.vue'),
          meta: {
            pageTitle: 'Create tenant',
            requiresPermission: 'tenant.create',
          },
        },
        {
          path: ':id/edit',
          name: 'tenantsEdit',
          component: () => import('@/views/backOffice/admin/TenantEditView.vue'),
          meta: {
            pageTitle: 'Edit tenant',
            requiresPermission: 'tenant.write',
          },
        },
      ],
    },
    {
      path: 'admin/permissions',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'permissionsList',
          component: () => import('@/views/backOffice/admin/PermissionListView.vue'),
          meta: {
            pageTitle: 'Permissions list',
            requiresPermission: 'permissions.read',
          },
        },
        {
          path: 'new',
          name: 'permissionsNew',
          component: () => import('@/views/backOffice/admin/PermissionEditView.vue'),
          meta: {
            pageTitle: 'Create permission',
            requiresPermission: 'permissions.write',
          },
        },
        {
          path: ':id/edit',
          name: 'permissionsEdit',
          component: () => import('@/views/backOffice/admin/PermissionEditView.vue'),
          meta: {
            pageTitle: 'Edit permission',
            requiresPermission: 'permissions.write',
          },
        },
      ],
    },
  ],
}

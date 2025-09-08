import TheMainLayout from '@/components/layout/backOffice/TheMainLayout.vue'
import {
  BackOfficeHomeView,
  UserEditView,
  UserListView,
  PerfilListView,
  PerfilEditView,
} from '@/views'
import ProductListView from '@/views/backOffice/products/ProductListView.vue'
import ProductEditView from '@/views/backOffice/products/ProductEditView.vue'
import BrandListView from '@/views/backOffice/brands/BrandListView.vue'
import BrandEditView from '@/views/backOffice/brands/BrandEditView.vue'
import CategoryListView from '@/views/backOffice/categories/CategoryListView.vue'
import CategoryEditView from '@/views/backOffice/categories/CategoryEditView.vue'
import RoleListView from '@/views/backOffice/admin/RoleListView.vue'
import RoleEditView from '@/views/backOffice/admin/RoleEditView.vue'
import TenantListView from '@/views/backOffice/admin/TenantListView.vue'
import TenantEditView from '@/views/backOffice/admin/TenantEditView.vue'
import PermissionListView from '@/views/backOffice/admin/PermissionListView.vue'
import PermissionEditView from '@/views/backOffice/admin/PermissionEditView.vue'
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
          component: BackOfficeHomeView,
          meta: {
            pageTitle: 'Home',
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
          component: UserListView,
          meta: {
            pageTitle: 'Users list',
            requiresPermission: 'users.read',
          },
        },
        {
          path: 'new',
          name: 'usersNew',
          component: UserEditView,
          meta: {
            pageTitle: 'Create user',
            requiresPermission: 'users.create',
          },
        },
        {
          path: 'edit/:id',
          name: 'usersEdit',
          component: UserEditView,
          meta: {
            pageTitle: 'Edit user',
            requiresPermission: 'users.write',
          },
        },
      ],
    },
    {
      path: 'perfil',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'perfilList',
          component: PerfilListView,
          meta: {
            pageTitle: 'Perfil list',
          },
        },
        {
          path: 'new',
          name: 'perfilNew',
          component: PerfilEditView,
          meta: {
            pageTitle: 'Create perfil',
          },
        },
        {
          path: 'edit/:id',
          name: 'perfilEdit',
          component: PerfilEditView,
          meta: {
            pageTitle: 'Edit perfil',
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
          component: ProductListView,
          meta: {
            pageTitle: 'Products list',
          },
        },
        {
          path: 'new',
          name: 'productsNew',
          component: ProductEditView,
          meta: {
            pageTitle: 'Create product',
          },
        },
        {
          path: 'edit/:id',
          name: 'productsEdit',
          component: ProductEditView,
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
          component: BrandListView,
          meta: {
            pageTitle: 'Brands list',
          },
        },
        {
          path: 'new',
          name: 'brandsNew',
          component: BrandEditView,
          meta: {
            pageTitle: 'Create brand',
          },
        },
        {
          path: 'edit/:id',
          name: 'brandsEdit',
          component: BrandEditView,
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
          component: CategoryListView,
          meta: {
            pageTitle: 'Categories list',
          },
        },
        {
          path: 'new',
          name: 'categoriesNew',
          component: CategoryEditView,
          meta: {
            pageTitle: 'Create category',
          },
        },
        {
          path: 'edit/:id',
          name: 'categoriesEdit',
          component: CategoryEditView,
          meta: {
            pageTitle: 'Edit category',
          },
        },
      ],
    },
    {
      path: 'admin/roles',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'rolesList',
          component: RoleListView,
          meta: {
            pageTitle: 'Roles list',
            requiresPermission: 'roles.read',
          },
        },
        {
          path: 'new',
          name: 'rolesNew',
          component: RoleEditView,
          meta: {
            pageTitle: 'Create role',
            requiresPermission: 'roles.write',
          },
        },
        {
          path: ':id/edit',
          name: 'rolesEdit',
          component: RoleEditView,
          meta: {
            pageTitle: 'Edit role',
            requiresPermission: 'roles.write',
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
          component: TenantListView,
          meta: {
            pageTitle: 'Tenants list',
            requiresPermission: 'tenant.list',
          },
        },
        {
          path: 'new',
          name: 'tenantsNew',
          component: TenantEditView,
          meta: {
            pageTitle: 'Create tenant',
            requiresPermission: 'tenant.create',
          },
        },
        {
          path: ':id/edit',
          name: 'tenantsEdit',
          component: TenantEditView,
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
          component: PermissionListView,
          meta: {
            pageTitle: 'Permissions list',
            requiresPermission: 'permissions.read',
          },
        },
        {
          path: 'new',
          name: 'permissionsNew',
          component: PermissionEditView,
          meta: {
            pageTitle: 'Create permission',
            requiresPermission: 'permissions.write',
          },
        },
        {
          path: ':id/edit',
          name: 'permissionsEdit',
          component: PermissionEditView,
          meta: {
            pageTitle: 'Edit permission',
            requiresPermission: 'permissions.write',
          },
        },
      ],
    },
  ],
}

import { TheMainLayout } from '@/components'
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
          },
        },
        {
          path: 'new',
          name: 'usersNew',
          component: UserEditView,
          meta: {
            pageTitle: 'Create user',
          },
        },
        {
          path: 'edit/:id',
          name: 'usersEdit',
          component: UserEditView,
          meta: {
            pageTitle: 'Edit user',
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
  ],
}

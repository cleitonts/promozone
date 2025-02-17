import { TheMainLayout } from '@/components'
import {
  BackOfficeHomeView,
  UserEditView,
  UserListView,
  PerfilListView,
  PerfilEditView,
} from '@/views'
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
  ],
}

import { TheMainLayout } from '@/components/index.js'
import { BackOfficeHomeView, UserEditView, UserListView } from '@/views/index.js'

export const backOfficeRoutes = {
  path: '/bo',
  meta: {
    middleware: { requiresAuth: true },
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
  ],
}

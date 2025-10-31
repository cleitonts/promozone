import { createRouter, createWebHistory } from 'vue-router'
import { backOfficeRoutes } from '@/router/backOfficeRoutes'
import { adminRoutes } from '@/router/adminRoutes'
import { AuthRoutes } from '@/router/authRoutes'
import TheMainLayout from '@/components/layout/backOffice/TheMainLayout.vue'
import TheIndex from '@/views/TheIndex.vue'
import { useInterfaceStore, EMessageType } from '@/stores/interfaceStore'
import { i18n } from '@/plugins/i18n'
import { useAuthStore } from '@/stores/authStore'

const tt = (key: string): string => ((i18n as any).global.t(key) as string)

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    backOfficeRoutes,
    adminRoutes,
    AuthRoutes,

    {
      path: '/',
      component: TheMainLayout,
      children: [
        {
          path: '',
          name: 'index',
          component: TheIndex,
          meta: {
            pageTitle: 'Home',
          },
        },
      ],
    },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to) => {
  const interfaceStore = useInterfaceStore()
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !interfaceStore.token) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && interfaceStore.token) {
    return { path: '/' }
  }

  // if user is admin and navigating to app home, redirect to admin dashboard
  if (to.name === 'index' && authStore.isAuthenticated && authStore.isAdmin()) {
    return { name: 'adminDashboard' }
  }

  if (to.meta.requiresPermission && authStore.isAuthenticated) {
    try {
      const hasRequiredPermission = authStore.hasPermission(to.meta.requiresPermission as string)
      if (!hasRequiredPermission) {
        interfaceStore.addMessage(tt('errors.accessDenied'), EMessageType.Danger)
        return { path: '/bo/home' }
      }
    } catch (error) {
      console.error('Error checking permissions:', error)
      return { path: '/bo/home' }
    }
  }

  if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated || !authStore.isAdmin()) {
      interfaceStore.addMessage(tt('errors.accessDenied'), EMessageType.Danger)
      return { path: '/bo/home' }
    }
  }
})



router.afterEach((to) => {
  const interfaceStore = useInterfaceStore()
  const pageTitle = to.meta.pageTitle || interfaceStore.pageTitle
  document.title = `${import.meta.env.VITE_APP_NAME} - ${pageTitle}`
})

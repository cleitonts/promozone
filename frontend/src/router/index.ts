import { createRouter, createWebHistory } from 'vue-router'
import { backOfficeRoutes } from '@/router/backOfficeRoutes.js'
import { AuthRoutes } from '@/router/authRoutes.js'
import { TheMainLayout } from '@/components/index.js'
import TheIndex from '@/views/TheIndex.vue'
import { useInterfaceStore } from '@/stores/interfaceStore'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    backOfficeRoutes,
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

// router.beforeEach(async (to, from, next) => {
//   next();
// });

router.afterEach((to) => {
  const interfaceStore = useInterfaceStore()
  const pageTitle = to.meta.pageTitle || interfaceStore.pageTitle
  document.title = `${import.meta.env.VITE_APP_NAME} - ${pageTitle}`
})

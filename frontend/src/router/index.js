import { createRouter, createWebHistory } from "vue-router";
import { BORoutes } from "@/router/BORoutes.js";
import { AuthRoutes } from "@/router/AuthRoutes.js";
import { TheMainLayout } from "@/components/index.js";
import TheIndex from "@/views/TheIndex.vue"
import { useInterfaceStore } from "@/stores";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    BORoutes,
    AuthRoutes,

    {
      path: "/",
      component: TheMainLayout,
      children: [
        {
          path: "",
          name: "index",
          component: TheIndex,
          meta: {
            pageTitle: "Home",
          },
        },
      ],
    },
    // catch all redirect to home page
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   next();
// });

router.afterEach((to) => {
  const interfaceStore = useInterfaceStore();
  const pageTitle = to.meta.pageTitle || interfaceStore.pageTitle;
  document.title = `${import.meta.env.VITE_APP_NAME} - ${pageTitle}`;
});

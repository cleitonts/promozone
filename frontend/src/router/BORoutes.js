import { TheMainLayout } from "@/components/index.js";
import {
  BOHomeView,
  UserEditView,
  UserListView,
} from "@/views/index.js";

export const BORoutes = {
  path: "/bo",
  meta: {
    middleware: { requiresAuth: true },
  },
  children: [
    {
      path: "home",
      component: TheMainLayout,
      children: [
        {
          path: "",
          name: "BOHome",
          component: BOHomeView,
          meta: {
            pageTitle: "Home",
          },
        },
      ],
    },
    {
      path: "users",
      component: TheMainLayout,
      children: [
        {
          path: "",
          name: "usersList",
          component: UserListView,
          meta: {
            pageTitle: "Users list",
          },
        },
        {
          path: "new",
          name: "usersNew",
          component: UserEditView,
          meta: {
            pageTitle: "Create user",
          },
        },
        {
          path: "edit/:id",
          name: "usersEdit",
          component: UserEditView,
          meta: {
            pageTitle: "Edit user",
          },
        },
      ],
    },
  ],
};

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresPermission?: string
    guestOnly?: boolean
    pageTitle?: string
  }
}
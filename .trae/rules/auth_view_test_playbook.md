# Trae Playbook: Testing Authenticated Views

This playbook describes how to test authenticated frontend views in PromoZone using Trae. It standardizes the flow so preview interactions are reliable and repeatable.

## Goals
- Start from the login route, authenticate, and then navigate to the target view.
- Default to the admin account; allow overriding with credentials provided in the current prompt.
- Respect router meta flags (`requiresAuth`, `requiresAdmin`, `requiresPermission`).

## Prerequisites
- Frontend dev server running (`npm run dev`).
- Backend GraphQL API available and configured via `VITE_GRAPHQL_URL`.
- Seeded admin user or prompt-provided credentials.

## Credential Strategy
- Default: use the seeded admin user to ensure full access to admin routes.
- Override: if the prompt specifies a user, use that instead. Expected prompt keys:
  - `userEmail`
  - `userPassword`

If the prompt provides only one of the two, prefer safe failure and request the missing value via the UI form.

## Test Flow
1. Open the login route in preview:
   - Navigate to `/login`.
2. Perform login:
   - Fill email/password with either the prompt-provided credentials or the default admin.
   - Submit the form.
3. Observe post-login routing:
   - Admins are redirected to `adminDashboard` (see `router/index.ts` and `useInterfaceStore.login`).
   - Non-admin users are redirected to `/bo/home`.
4. Locate the target view route:
   - Review `src/router/adminRoutes.ts` and `src/router/backOfficeRoutes.ts` for the component’s path and meta.
   - Confirm any `requiresAuth`, `requiresAdmin`, or `requiresPermission` flags.
5. Navigate to the target route:
   - Open the exact path or named route in the preview.
   - If `requiresPermission` is set, ensure the logged-in user has that permission (`useAuthStore.hasPermission`).
6. Validate rendering and access:
   - Confirm the component loads, the Apollo overlay appears during GraphQL operations, and the view behaves as expected.

## Notes
- Tenant context: requests include `x-tenant-id` based on the current selection in the header. Select a tenant if the view depends on tenant data.
- Overlays: GraphQL operations automatically show an overlay on the main content area; components do not manage loader state.

## Troubleshooting
- If redirected to login, ensure tokens are present in `useInterfaceStore.token` and `useAuthStore.isAuthenticated` is true.
- If access denied, check the user roles/permissions and route meta requirements.
- Ensure the target route exists and the path is correct.
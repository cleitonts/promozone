# Frontend CRUD Playbook — List View Pattern (Vuetify + Vue 3)

This playbook defines how to create list views aligned with `UserListView.vue` style and components. Use these guidelines whenever creating or editing a CRUD in the frontend.

## Goals
- Standardize layout, components, i18n, responsiveness, and navigation.
- Ensure visual and technical consistency using Vuetify, Composition API, and TypeScript.

## Layout Base
- Contêiner principal: `v-card` com `class="overflow-visible"`.
- Título: `TheCardTitle` com `:text` vindo de i18n (`t('<entidade>.listTitle')`).
- Slot `#after` do título para o botão de criação (atalho de ação primária).
- Conteúdo: `v-card-text` contendo `BaseGrid`.

## Components and Structure
- `TheCardTitle`
  - `:text`: `t('<entity>.listTitle')`.
  - `icon`: Font Awesome or equivalent.
  - `bg-color`: use variations like `bg-secondary-gradient`.
  - `text-color`: typically `white`.
  - Slot `#after`: create button with route `:to="{ name: '<entities>New' }"`.

- Create button
  - `v-btn` with `rounded`, `color="secondary"`, `icon="fa6-solid:plus"`.
  - Placement: inside `v-col` with `class="pa-0 d-flex justify-end"` and utility classes (`position-absolute mt-n5 mb-3`).

- `BaseGrid` (data grid)
  - Required bindings:
    - `v-model:page`: current page (`ref<number>`).
    - `v-model:limit`: items per page (`ref<number>`).
    - `:total-items`: total items (`ref<number>` or `number`).
    - `:matrix`: array of row objects.
    - `:header`: column key/label object (use i18n).
    - `@update`: trigger `getList()` on pagination/limit change.
  - Default slots:
    - `#prepend`: filters area (inputs above the grid).
    - `#action`: per-row actions cell (edit, view, etc.).

## Data Flow
- State
  - `const items = ref<any[]>([])` for data.
  - `const totalItems = ref(0)` for total.
  - `const page = ref(1)` and `const limit = ref(10)` for pagination.
  - `const headers = computed(() => ({ ... }))` with labels via `t()`.
- Fetch and mapping
  - `getList` fetches data (via composable or GraphQL) and maps into `items` in the format consumed by the grid.
  - Update `totalItems` accordingly.
  - Run `getList()` on `onMounted` and on `@update` from `BaseGrid`.

## I18n
- Always use `useI18n` and `t()` for all texts.
- Recommended keys:
  - `'<entity>.listTitle'` for the list view title.
  - `'common.id'` for the ID column.
  - `'<entity>.fields.<field>'` for headers and labels.
  - `'<entity>.actions.<action>'` for button texts.
  - `'<entity>.validation.<rule>'` for filter validation messages.
- Grid headers must be `computed` and react to language changes.

## Filters
- Place filters in the `#prepend` slot of `BaseGrid`.
- Inputs with `v-model` and `:rules` when needed.
- Validation messages via i18n.
- Column distribution example (see Responsiveness): `v-col cols="12" sm="6" md="4"`.

## Row Actions
- The `#action` slot receives the row `element`.
- Use small buttons (`size="x-small"`) with icons (`icon="fa6-solid:pencil"`).
- Navigation: `:to="{ name: '<entities>Edit', params: { id: element.id } }"`.

## Navigation and Routes
- Recommended named routes:
  - List: `'<entities>List'`.
  - Create: `'<entities>New'`.
  - Edit: `'<entities>Edit'`.
- Create button in the title should point to `'<entities>New'`.

## Responsiveness and Screen Sizes
- Vuetify breakpoints:
  - `xs`: < 600px
  - `sm`: ≥ 600px and < 960px
  - `md`: ≥ 960px and < 1280px
  - `lg`: ≥ 1280px and < 1920px
  - `xl`: ≥ 1920px
- Recommendations:
  - Filters in `#prepend`:
    - `v-col cols="12"` on `xs` to take full row.
    - `v-col sm="6"` for two filters per row on tablets.
    - `v-col md="4"` for three filters per row on desktops.
  - Create button in title: keep `rounded` and `icon`; align right with `justify-end`.
  - Row actions: `size="x-small"` for density.
  - Pagination: defaults `page=1`, `limit=10`, adjustable by `BaseGrid`.

## GraphQL and Data
- Follow the project's GraphQL policy (frontend):
  - Documents in `src/graphql/queries/` or `src/graphql/mutations/`.
  - Generate types and composables with `npx graphql-codegen --config codegen.yml`.
  - Consume `src/generated/graphql.ts` or import `.graphql` documents from `src/graphql/`.
- Domain composable (`use<Entity>`) is recommended to encapsulate fetching and mapping.

## Best Practices
- No code comments; use self-explanatory naming and i18n for texts.
- Composition API and TypeScript in all views.
- Maintain visual consistency with `TheCardTitle` and `BaseGrid`.
- Grid headers always in `computed` dependent on `t()`.
- Row actions with navigation via named routes and `params`.

## Reference: `UserListView.vue` Pattern
- `TheCardTitle` with `t('user.listTitle')`, icon `fa6-solid:person`.
- Create button via `#after` with `:to="{ name: 'usersNew' }"`.
- `BaseGrid` with pagination (`page`, `limit`), `totalItems`, `matrix`, and computed `headers`.
- Email filter in `#prepend` with i18n validation.
- Per-row edit action with route `usersEdit` passing `id`.
- `getList` fetches and maps data for the grid.

## Administrative Context — Admin-only List Views
- Administrative views and components must be accessible only to users with the `admin` role.
- Admin user list must be a dedicated component and display:
  - `id`
  - `name`
  - `email`
  - `ownerTenantsCount` (number of tenants the user owns)
  - `visibleTenantsCount` (number of tenants the user can view)
- Use i18n keys under `user.admin.*` for admin-specific labels where applicable.

---

Próximas seções do guia (quando necessário): criação, edição e visualização de registros, incluindo padrões de validação, envio e navegação pós-ação.
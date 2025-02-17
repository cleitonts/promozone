/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace JSX {
  import type { VNode, ComponentPublicInstance } from 'vue'
  interface Element extends VNode {}
  interface ElementClass extends ComponentPublicInstance {}
  interface IntrinsicElements {
    [elem: string]: any
  }
}

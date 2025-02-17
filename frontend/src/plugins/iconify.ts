import { type FunctionalComponent, h } from 'vue'
import { Icon } from '@iconify/vue'
import type { IconProps } from 'vuetify'

const IconifyIcon: FunctionalComponent<IconProps> = (props) => {
  const iconName = typeof props.icon === 'string' ? props.icon : ''

  return h(Icon, { icon: iconName })
}
export const iconifyAdapter = {
  component: IconifyIcon,
}

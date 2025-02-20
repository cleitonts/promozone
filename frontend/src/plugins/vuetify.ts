import '@/assets/base.scss'
import { createVuetify } from 'vuetify'
import { iconifyAdapter } from './iconify'
import * as colors from '@/assets/template/variables/colors.module.scss'

const customLightTheme = {
  dark: true,
  colors: {
    background: colors.background,
    surface: colors.surface,
    surfaceLighten: colors.surfaceLighten,
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    accent: colors.accent,
    textDark: colors.textDark,
  },
}

export default createVuetify({
  blueprint: {
    defaults: {
      VCombobox: {
        variant: 'underlined',
      },
      VSelect: {
        variant: 'underlined',
        color: 'textDark',
        density: 'compact',
      },
      VTextarea: {
        variant: 'underlined',
        color: 'textDark',
      },
      VTextField: {
        variant: 'underlined',
        density: 'compact',
      },
      VTabs: {
        density: 'compact',
      },
      VTable: {
        density: 'compact',
      },
    },
  },
  icons: {
    defaultSet: 'iconify',
    sets: {
      iconify: iconifyAdapter,
    },
  },
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
    },
  },
})

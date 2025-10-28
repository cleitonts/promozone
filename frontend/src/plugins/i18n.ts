import { createI18n } from 'vue-i18n'
import pt from '../locales/pt'
import en from '../locales/en'
import createDevLocale from '../locales/dev'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'pt',
  fallbackLocale: 'en',
  messages: {
    pt,
    en,
    dev: createDevLocale(pt),
  },
})

export default i18n
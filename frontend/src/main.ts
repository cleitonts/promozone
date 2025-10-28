import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'

// Vuetify
import vuetify from '@/plugins/vuetify'
import apolloClient from '@/plugins/apollo'
import App from './App.vue'
import { router } from './router'
import { TheSpinner } from './components'
import i18n from '@/plugins/i18n'

const app = createApp(App)

app.component('TheSpinner', TheSpinner)
app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')

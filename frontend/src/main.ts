import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import { router } from './router'
import { TheSpinner } from './components'

const app = createApp(App)

app.component('TheSpinner', TheSpinner)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

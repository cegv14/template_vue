import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // Importa todos los iconos
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // Importa el CSS

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Registra los iconos globalmente
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus) // Usa Element Plus

app.mount('#app')

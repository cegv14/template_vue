import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '/', name: 'Home', component: HomeView }, // Ruta por defecto (path vacío)
        { path: '/about', name: 'About', component: AboutView },
      ],
    },
  ],
})

export default router

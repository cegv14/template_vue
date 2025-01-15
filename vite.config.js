import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        // Todas las solicitudes que comiencen con /api se enviarán al backend
        target: 'http://localhost:3000', // URL del backend
        changeOrigin: true, // Necesario para que funcione el proxy
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina el prefijo /api de la ruta
      },
    },
  },
})

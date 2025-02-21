import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Define el puerto del servidor de desarrollo
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Dirección del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/development/',  // For deployment at becker.limited/development/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@eckert-preisser/shared': path.resolve(__dirname, '../shared'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      // Config API goes directly to Config Server (8888)
      '/api/config': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
      // All other API requests go to API Gateway (8080)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})

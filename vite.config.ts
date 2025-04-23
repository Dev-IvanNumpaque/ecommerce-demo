import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': JSON.stringify({
      VITE_API_URL: process.env.VITE_API_URL,
      NODE_ENV: process.env.NODE_ENV
    }),
    global: 'globalThis'
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['axios'],
    exclude: ['bcrypt', '@mapbox/node-pre-gyp']
  },
  build: {
    commonjsOptions: {
      esmExternals: true
    }
  },
  resolve: {
    alias: {}
  },
  ssr: {
    // Lista de dependencias que no deben ser transformadas para SSR
    noExternal: ['bcrypt', '@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock']
  },
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

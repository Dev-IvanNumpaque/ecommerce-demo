import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': JSON.stringify({
      VITE_DB_USER: process.env.VITE_DB_USER,
      VITE_DB_HOST: process.env.VITE_DB_HOST,
      VITE_DB_NAME: process.env.VITE_DB_NAME,
      VITE_DB_PASSWORD: process.env.VITE_DB_PASSWORD,
      VITE_DB_PORT: process.env.VITE_DB_PORT,
      NODE_ENV: process.env.NODE_ENV
    }),
    global: 'globalThis'
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock', 'pg-native']
  },
  build: {
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      external: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock']
    }
  },
  resolve: {
    alias: {
      pg: 'pg-browser',
      'pg-native': 'pg-browser'
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})

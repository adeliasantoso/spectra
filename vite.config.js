import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/spectra/' : '/',
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['./src/components/OptimizedImage.jsx', './src/components/OptimizedVideo.jsx']
        }
      }
    },
    // Enable compression
    minify: 'esbuild',
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Server configuration for development
  server: {
    open: true,
    cors: true
  }
})

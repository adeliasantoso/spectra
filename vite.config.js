import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/spectra/' : '/',
  define: {
    // Fix for __DEFINES__ error
    global: 'globalThis',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    // Add build timestamp for cache busting
    __BUILD_TIME__: JSON.stringify(Date.now()),
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        // Aggressive cache busting with timestamp
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`,
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['./src/components/OptimizedImage.jsx', './src/components/OptimizedVideo.jsx']
        }
      }
    },
    // Enable compression
    minify: 'esbuild',
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Better error handling
    sourcemap: false,
    // Ensure proper asset handling
    assetsDir: 'assets',
    // Output directory
    outDir: 'dist',
    // Empty output directory before build
    emptyOutDir: true
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

// import { defineConfig } from 'vite';

// export default defineConfig({
//   optimizeDeps: {
//     exclude: ['@electric-sql/pglite'],
//   },
//   build: {
//     target: 'esnext',
//   }
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite']
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
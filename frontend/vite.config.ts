import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gestion-librairie/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // Default Vite port
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
       '/api': { // Any request starting with /api will be proxied
        target: 'http://localhost:3000', // Replace with your backend server URL
        changeOrigin: true, // Recommended for cross-origin requests

      },
    }
  }
})

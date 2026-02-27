import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Supabase — lazy-loaded, separate chunk
            if (id.includes('@supabase')) return 'vendor-supabase';
            // DnD — only used by Agenda
            if (id.includes('@hello-pangea')) return 'vendor-dnd';
            // Router
            if (id.includes('react-router')) return 'vendor-router';
            // styled-components + stylis
            if (id.includes('styled-components') || id.includes('stylis')) return 'vendor-styled';
          }
        },
      },
    },
  },
})

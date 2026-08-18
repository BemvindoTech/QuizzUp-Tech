import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ajoutez cette ligne pour le déploiement sur GitHub Pages
  base: '/QuizzUp-Tech/', 
  
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Optional: Set `base` if deploying to a subpath (e.g., GitHub Pages)
  base: '/',
});
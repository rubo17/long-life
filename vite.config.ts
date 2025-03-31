import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    tailwindcss(),
    svgLoader(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue'] // Asegúrate de incluir .ts
  }
})

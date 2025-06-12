import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Permite usar as APIs do Vitest (describe, it, expect) sem importar
    environment: 'jsdom', // Usa o JSDOM para simular o navegador
  },
})
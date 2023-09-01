/* eslint-disable import/order */
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue3-compare-image': path.resolve(__dirname, '../src'),
    },
  },
})

import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // "/" at a custom domain, "/metrio-website/" on github.io. The Pages workflow
  // sets BASE_PATH from the repo's Pages settings; local builds use "/".
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})

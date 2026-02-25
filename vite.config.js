import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Bu plugin hər şeyi idarə edir

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
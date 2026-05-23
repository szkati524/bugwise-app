import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Dodajemy go tutaj
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // To naprawia błąd z importami @/
    },
  },
})
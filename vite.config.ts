import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // الركيزة الأساسية لـ Tailwind 4
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // تفعيل المحرك الجديد للستايل
  ],
  resolve: {
    alias: {
      // ربط الاختصار @ بمجلد src كما فعلنا في tsconfig
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // إعدادات اختيارية لتسهيل الوصول من الهاتف في الشبكة المحلية (جواب)
    host: true,
    port: 3000,
  }
})

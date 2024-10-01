import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Плагин для React
    VitePWA({
      registerType: "prompt", // Конфигурация для PWA
      includeAssets: ["logo.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Название вашего сайта",
        short_name: "Короткое название",
        description: "Описание приложения",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  test: {
    globals: true, // Установка глобальных переменных для тестов
    environment: 'jsdom', // Использование jsdom для тестов
    setupFiles: 'tests/setup.tsx', // Файл для начальной конфигурации тестов
    css: true, // Включаем поддержку CSS в тестах
  },
});

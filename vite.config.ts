import { defineConfig } from 'vitest/config'; // Используй 'vitest/config' для тестов
import react from '@vitejs/plugin-react'; // Оставляем один импорт react

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Плагин для React
  test: {
    globals: true, // Установка глобальных переменных для тестов
    environment: 'jsdom', // Использование jsdom для тестов
    setupFiles: 'tests/setup.tsx', // Файл для начальной конфигурации тестов
    css: true, // Включаем поддержку CSS в тестах
  },
});

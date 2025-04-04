import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.jsx', 'resources/css/app.css']),
        react(),
    ],
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
    define: {
        global: 'window',
    },
});

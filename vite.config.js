import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name].[hash][extname]';
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return 'assets/fonts/[name][extname]';
          }
          
          if (/css/i.test(ext)) {
            return 'assets/css/[name].[hash][extname]';
          }
          
          return 'assets/other/[name].[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./public', import.meta.url)),
      '@js': fileURLToPath(new URL('./src/js', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/css', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/js/components', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@css/variables";`,
      },
    },
  },
});

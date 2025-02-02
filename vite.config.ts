//import { defineConfig } from 'vite'
/**
 * No overload matches this call.
   The last overload gave the following error.
    Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.

  Solution: importing Vite config extended by Vitest
 */
import { defineConfig } from 'vitest/config';
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

// It has only d.mts file, no d.ts file, so the following error
//   Cannot find module '@tailwindcss/vite' or its corresponding type declarations.
//   There are types at '<path/to>/vite-lit-library-starter/node_modules/@tailwindcss/vite/dist/index.d.mts',
// but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 
// 'node16', 'nodenext', or 'bundler'.
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ tailwindcss()],
  publicDir: false,
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './playground'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('src/**/*.{ts,tsx}', {
          ignore: ["src/**/*.d.ts"],
        }).map(file => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          relative(
            'src',
            file.slice(0, file.length - extname(file).length)
          ),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});

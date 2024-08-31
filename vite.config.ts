import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Togglee',
      fileName: 'togglee',
    },
  },
  plugins: [dts({ include: ['lib'], rollupTypes: true })],
})

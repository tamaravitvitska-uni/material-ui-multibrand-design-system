import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// The design system is aliased to its TypeScript source so the demo runs
// without a prebuilt dist/ and hot-reloads token/theme changes instantly.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@multibrand/design-system': fileURLToPath(
        new URL('../../packages/design-system/src/index.ts', import.meta.url),
      ),
    },
  },
});

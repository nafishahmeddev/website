// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
// Rendered on Cloudflare Workers. The home page is rendered per request so
// the middleware can answer AI agents with Markdown (see src/middleware.ts);
// everything else is prerendered at build time and served as static assets.
export default defineConfig({
  site: 'https://nafish.me',
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  vite: {
    optimizeDeps: { exclude: ['@astrojs/cloudflare'] },
  },
});

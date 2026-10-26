// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nafish.me',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
});

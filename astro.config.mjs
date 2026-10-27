// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // [FILL: domain] — replace before launch (M5). Used for canonical URLs and the sitemap.
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
});

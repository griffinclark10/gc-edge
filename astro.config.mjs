// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSidenotes from './src/lib/rehype-sidenotes.mjs';
import blueprintTheme from './src/lib/shiki-blueprint.mjs';

export default defineConfig({
  // Cloudflare Pages production URL until a custom domain is attached ([FILL: domain]).
  // Used for canonical URLs, OG images and the sitemap. Update when the domain moves.
  site: 'https://gc-edge.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    // @ts-expect-error: a full theme object is accepted; the type only lists bundled names
    shikiConfig: { theme: blueprintTheme },
    rehypePlugins: [rehypeSidenotes],
  },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404') })],
});

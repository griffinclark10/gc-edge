import type { APIRoute } from 'astro';
import { NOINDEX } from '../lib/site';

export const GET: APIRoute = ({ site }) =>
  new Response(
    NOINDEX
      ? 'User-agent: *\nDisallow: /\n' // staging: see NOINDEX in lib/site.ts
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );

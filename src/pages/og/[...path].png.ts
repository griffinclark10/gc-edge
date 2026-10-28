// /og/<path>.png, one Open Graph image per page (§8), rendered at build time.
import type { APIRoute } from 'astro';
import { getOgPages, type OgPage } from '../../lib/og-pages';
import { renderOg } from '../../lib/og';

export async function getStaticPaths() {
  return (await getOgPages()).map((page) => ({ params: { path: page.path }, props: page }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOg(props as OgPage)), {
    headers: { 'Content-Type': 'image/png' },
  });

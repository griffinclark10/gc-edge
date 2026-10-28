// §8 Open Graph image: 1200×630, blueprint ground, white grid, title in Bricolage 800
// with a yellow detection box around the first word, gc/edge mark.
// satori lays out the text as SVG paths; sharp rasterises it over the grid.
import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { OgPage } from './og-pages';

const W = 1200;
const H = 630;
const C = {
  ground: '#1C3D96',
  ink: '#F2F5FF',
  muted: '#C9D4F5',
  accent: '#FFD23F',
  deep: '#0F2560',
};

// Static (non-variable) woff files: satori can't read woff2.
const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
function loadFonts() {
  fonts ??= Promise.all([
    font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'),
    font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'),
    font('ibm-plex-mono', 'ibm-plex-mono-latin-600-normal.woff'),
  ]).then(([display, mono, monoBold]) => [
    { name: 'Bricolage', data: display, weight: 800, style: 'normal' },
    { name: 'Plex', data: mono, weight: 500, style: 'normal' },
    { name: 'Plex', data: monoBold, weight: 600, style: 'normal' },
  ]);
  return fonts;
}

const grid = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="rgba(242,245,255,0.11)" stroke-width="1"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="${C.ground}"/>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`,
);

// Minimal element helper so this file needs no JSX runtime.
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

function titleSize(title: string) {
  if (title.length <= 18) return 128;
  if (title.length <= 32) return 104;
  if (title.length <= 52) return 84;
  return 68;
}

export async function renderOg(page: OgPage) {
  const [first, ...rest] = page.title.split(' ');
  const size = titleSize(page.title);

  const firstWord = el(
    'div',
    {
      position: 'relative',
      display: 'flex',
      padding: '0 18px',
      margin: '0 6px 0 -24px',
      border: `6px solid ${C.accent}`,
    },
    [
      el(
        'div',
        {
          position: 'absolute',
          left: -6,
          top: -48,
          padding: '4px 12px',
          background: C.accent,
          color: C.deep,
          fontFamily: 'Plex',
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 0,
        },
        page.chip,
      ),
      first,
    ],
  );

  const tree = el(
    'div',
    {
      width: W,
      height: H,
      // satori defaults to content-box; without this the padding pushes the footer off-canvas
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 80px 56px',
      color: C.ink,
    },
    [
      el(
        'div',
        { fontFamily: 'Plex', fontWeight: 500, fontSize: 24, color: C.muted, letterSpacing: 1 },
        page.kicker,
      ),
      el(
        'div',
        {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          rowGap: 8,
          marginTop: 48,
          fontFamily: 'Bricolage',
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: -0.04 * size,
        },
        [firstWord, ...rest.map((w) => el('div', { marginRight: 0.25 * size }, w))],
      ),
      el(
        'div',
        { display: 'flex', justifyContent: 'space-between', fontFamily: 'Plex', fontSize: 28 },
        [
          el('div', { display: 'flex', fontWeight: 600 }, [
            'gc',
            el('span', { color: C.accent }, '/'),
            'edge',
          ]),
          el('div', { color: C.muted, fontWeight: 500, fontSize: 24 }, 'griffin clark'),
        ],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: W,
    height: H,
    fonts: await loadFonts(),
  });
  return sharp(grid)
    .composite([{ input: Buffer.from(svg) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

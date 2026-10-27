// Rasterises public/favicon.svg into the PNG sizes in SPEC §7.
// Run with `npm run favicons` after changing the SVG; the PNGs are committed.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const targets = [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

for (const [name, size] of targets) {
  await sharp(svg, { density: 72 * (size / 64) * 2 })
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(`../public/${name}`, import.meta.url)));
  console.log(`wrote public/${name}`);
}

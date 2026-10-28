// §9 visual snapshots of every page at 390 and 1440px. Baselines are per-machine and
// gitignored (font rendering differs across OSes): `npm run test:visual -- -u` once to
// record them, then `npm run test:visual` before each release to catch regressions.
import { test, expect } from '@playwright/test';
import { routes, routeName } from './routes';

for (const route of routes) {
  for (const width of [390, 1440]) {
    test(`${route} @ ${width}px @visual`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${routeName(route)}-${width}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
}

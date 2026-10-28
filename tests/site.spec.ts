// §9 quality budget, per page: zero axe violations, no horizontal scroll at 360px,
// and a keyboard walkthrough where every focus stop shows a visible ring.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes } from './routes';

for (const route of routes) {
  test.describe(route, () => {
    test('no axe violations', async ({ page }) => {
      await page.goto(route);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      expect(violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`)).toEqual([]);
    });

    test('no horizontal scroll at 360px', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 780 });
      await page.goto(route);
      const [scroll, client] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(scroll).toBeLessThanOrEqual(client);
    });

    test('keyboard: every focus stop shows a focus ring', async ({ page }) => {
      await page.goto(route);
      const seen = new Set<string>();
      for (let i = 0; i < 120; i++) {
        await page.keyboard.press('Tab');
        const stop = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          // Stretched-link cards draw the ring on the card, not the link.
          const ringed = el.closest<HTMLElement>('.card, .featured') ?? el;
          const style = getComputedStyle(ringed);
          const ring = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
          const id = `${el.tagName}:${el.getAttribute('href') ?? el.textContent?.trim().slice(0, 40)}`;
          return { id, ring };
        });
        if (!stop) continue;
        if (seen.has(stop.id)) break; // wrapped around
        seen.add(stop.id);
        expect(stop.ring, `no visible focus ring on ${stop.id}`).toBe(true);
      }
      expect(seen.size).toBeGreaterThan(0);
    });
  });
}

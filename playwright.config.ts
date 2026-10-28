import { defineConfig, devices } from '@playwright/test';

// Tests run against a built site: `npm run build` first (or `DIST=dist-drafts` after a
// SHOW_DRAFTS=1 build to cover the draft-only pages too).
const dist = process.env.DIST ?? 'dist';
const port = 4329;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  webServer: {
    command: `npx astro preview --port ${port} --outDir ${dist}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});

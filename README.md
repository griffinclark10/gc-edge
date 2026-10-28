# portfolio

Griffin Clark's portfolio site. Astro 5, static output, plain CSS with design tokens.
The visual source of truth is [`design-reference/`](design-reference/). The build brief (`SPEC.md`)
is kept locally and deliberately not committed.

```sh
npm install
npm run dev           # http://localhost:4321 (drafts visible)
npm run build         # → dist/ (published pages only)
npm run build:drafts  # → dist-drafts/, published + draft pages, for local QA
npm run check         # astro check (types)
npm run lint          # prettier --check
npm run test:e2e      # axe, 360px overflow, keyboard focus rings on every built page
npm run test:visual   # full-page snapshots at 390/1440px (record once with `-- -u`)
npm run favicons      # re-render PNG favicons from public/favicon.svg
```

`test:e2e` and `test:visual` run against the last build; add `DIST=dist-drafts` to test the
drafts build.

- Design tokens: `src/styles/tokens.css`. Surfaces (`blueprint`, `paper`) map tokens to semantic
  variables in `src/styles/global.css`; components use those variables only.
- Content: experiments in `src/content/experiments/`, field notes in `src/content/notes/`
  (filename = URL slug). `draft: true` notes and `pageDraft: true` experiments never reach a
  production build. Field notes, their nav item and `/rss.xml` appear once a note is published.
- Open Graph images are rendered per page at build time (`src/lib/og.ts`).
- Placeholders still waiting on content are tracked in [`TODO-CONTENT.md`](TODO-CONTENT.md).
- CI (`.github/workflows/ci.yml`): type check, Prettier, build, lychee link check, Playwright
  e2e on the published and draft builds, Lighthouse CI on every published page.

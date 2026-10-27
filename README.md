# portfolio

Griffin Clark's portfolio site. Astro 5, static output, plain CSS with design tokens.
The visual source of truth is [`design-reference/`](design-reference/). The build brief (`SPEC.md`)
is kept locally and deliberately not committed.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run check     # astro check (types)
npm run lint      # prettier --check
npm run favicons  # re-render PNG favicons from public/favicon.svg
```

- Design tokens: `src/styles/tokens.css`. Surfaces (`blueprint`, `paper`) map tokens to semantic
  variables in `src/styles/global.css`; components use those variables only.
- Placeholders still waiting on content are tracked in [`TODO-CONTENT.md`](TODO-CONTENT.md).
- CI (`.github/workflows/ci.yml`): type check, Prettier, build, lychee link check, Lighthouse CI on `/`.

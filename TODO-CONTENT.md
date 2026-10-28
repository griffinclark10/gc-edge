# Content to supply or confirm

Everything Griffin needs to supply before launch. Items marked `[FILL]` or `[CONFIRM]` render
visibly on the site, exactly as written, until they're resolved. Tick an item off once it's
resolved and the placeholder is gone from the source.

## Facts to confirm (SPEC §11)

- [ ] Bon public-safe metric for Exp. 005, and sign-off that the 005 card and worldline wording are OK to publish
- [x] Toolchain: TensorRT confirmed (2026-10-27)
- [x] Toolchain: GStreamer and RTSP multi-camera confirmed (2026-10-28)
- [ ] Toolchain, still open: ONNX? DeepStream? PyAV? (Only list what you've used in production or on a real project.)
- [x] MPL title: Software Engineer II (2026-10-28)
- [x] HelpingHand "Best Paper, CUCAI" confirmed (2026-10-27)
- [x] TA: Sept 2020 → Dec 2021, three semesters, three different courses incl. PHYS 104 and electromagnetics (2026-10-28). Worldline copy now says Maxwell's equations; if second-year quantum was the third course, the old quantum joke can come back
- [x] Bon start date: Aug 2025 (2026-10-28)
- [x] Wildfire smoke: not completed; Exp. 008 deleted (2026-10-28)
- [x] Queue Hop accuracy: 7.2% MAE on 500 held-out frames, from the final report (confirmed 2026-10-27)
- [x] ESP32 / Exp. 007: only an idea (2026-10-28). Now `status: planned`, "would"-tense copy, no ✓ results in the terminal mock, title "Tell a tiny chip what to see." (no price claim). ESP32 also removed from the spec sheet, instrument list and meta description so nothing implies hands-on ESP32 work
- [x] HelpingHand dataset: per the paper, Kaggle's ASL Alphabet (87,000 images); card and case study updated (2026-10-28)
- [x] HelpingHand card result: stays at 93% (2026-10-28)
- [x] HelpingHand role: correct as written (2026-10-28)

## Content to supply (SPEC §11)

- [ ] Domain name → `site` in `astro.config.mjs` (currently `https://gc-edge.pages.dev`)
- [ ] Current general-purpose résumé PDF → `public/resume.pdf` (in progress; then remove the `resume.pdf` exclusion in `lychee.toml`)
- [ ] "Next, I want to…" line for the lab bench
- [ ] Thesis "What I'd do now" section
- [ ] Exp. 007 name, package name, repo, license, teacher model, and results as they come in
- [ ] First field note (thesis rewrite). **Drafted** in `src/content/notes/cars-that-borrow-the-roadsides-eyes.mdx` from the thesis PDF (facts only, Claude's wording). Rewrite in your voice, fill "What I took from it", add `date:`, set `draft: false`. That one change publishes `/notes/`, the nav item and `/rss.xml`.

## Placeholders in the source, by location

Added as each milestone lands. `grep -rn "\[FILL\|\[CONFIRM" src` should match this list.
Everything below renders visibly on the site (dashed underline) unless marked _hidden_.

| Where (file)                                       | Placeholder                                                                                                                                                     | Since |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `astro.config.mjs`                                 | `[FILL: domain]`, `site` set to gc-edge.pages.dev (_hidden_)                                                                                                    | M1    |
| footer + hero buttons                              | `résumé.pdf` links to `/resume.pdf`, not there yet                                                                                                              | M1    |
| Exp. 007 case study (_hidden_: `pageDraft`)        | specimen teacher, student params, license, repo `[FILL]`; tiles `[—]`; `[Δ]`, `[N]` seeds, `[PACKAGE-NAME]`; repo/write-up buttons hidden until they have links | M2–M3 |
| Exp. 005 card (`edge-vision-in-production.mdx`)    | result `[CONFIRM: public-safe metric approved by Bon …]`                                                                                                        | M2    |
| Exp. 001 case study (`cooperative-perception.mdx`) | "If I ran it again": `[FILL: what you'd do now …]`                                                                                                              | M3    |
| lab bench                                          | `[FILL: one line, e.g. "work on the inference engine other people build on"]`                                                                                   | M2    |
| instruments (`src/data/home.ts`, `pending`)        | ONNX, DeepStream, PyAV (_hidden_ until confirmed, per §6.6)                                                                                                     | M2    |

## Build notes for Griffin

- **Ticker glyphs (§9):** IBM Plex Mono has no Greek subset. Δ ħ ∇ ε ρ ₀ ✦ fall back per glyph to the system monospace; checked in Chrome on macOS, all render, no tofu.
- **Spec sheet still says `PyTorch → ONNX → TensorRT`**, as the spec wrote it, while ONNX stays hidden in the instruments list until confirmed. If you haven't used ONNX on a real project, drop it from the spec-sheet line too.
- **Card summaries are capped at 320 characters** by the content schema (§6.2); a longer one fails the build. Exp. 005 was reworded to 317 to fit (technical nouns kept, "health" and "updates" cut).
- **Exp. 007 links nowhere yet:** its case study is `pageDraft: true` (the spec's draft gate), so it builds only in `npm run dev` / `npm run build:drafts`, and the featured card hides `read the lab report →` until the page goes public. Remove `pageDraft` to publish.
- **Previewing drafts:** `npm run build:drafts` builds published + draft pages into `dist-drafts/` (never deployed). CI builds and tests it too, so the notes templates stay green before the first note goes live.
- **Queue Hop images were anonymised** before going in the repo (M3): the line photo keeps only the annotated half, fully pixelated, with the model's head-dots redrawn; the app screenshots have venue photos and avatars pixelated. The unblurred originals are only in the old `chat-gsc` repo.
- **Queue Hop report PDF is withheld.** It contains the un-pixelated app screenshots (teammates' and bystanders' faces, p.17) and a sign with a phone number (p.11), so it's not in the repo and the 002 page has no report link. To publish it, redact those pages, add it as `public/papers/queue-hop.pdf` and restore `links.report` in `queue-hop.mdx`. `helpinghand-asl.pdf` is published as-is, author emails included (Griffin's call, 2026-10-27).
- **Case-study copy is sourced, not invented:** 001 from the thesis PDF, 002 from the final report, 003 from the paper. Where the spec's card copy and a source disagree, the case study follows the source and the disagreement is listed above.

## Launch checklist (M5)

**Now: go live on `gc-edge.pages.dev`, unindexed.**

1. Commit and push the M5 prep (`_redirects`, `_headers`, `NOINDEX` switch, `site` URL).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → `griffinclark10/gc-edge`.
   - Project name: `gc-edge` (gives `gc-edge.pages.dev`; if the name is taken, update `site` in `astro.config.mjs`)
   - Production branch: `main` · Framework preset: Astro · Build command: `npm run build` · Output: `dist`
   - Environment variables (Production): `NODE_VERSION` = `22`, `NOINDEX` = `1`
3. Optional, keeps the footer joke true: Pages project → Metrics → enable **Web Analytics** (cookieless).
4. Note: Cloudflare deploys every push to `main` whether or not GitHub CI passes; keep CI green before pushing.

**Before removing `NOINDEX` (public launch):**

- [ ] Bon sign-off on the Exp. 005 card and worldline wording (SPEC guardrail), and the 005 result metric
- [ ] Résumé PDF at `public/resume.pdf` (the hero, footer and `/documents/Resume.pdf` redirect point there)
- [ ] Resolve, or accept as visible, the remaining `[FILL]`/`[CONFIRM]` placeholders listed above

**Custom domain (finishes M5):**

- [ ] Choose the domain; Pages project → Custom domains → add it
- [ ] Set `site` in `astro.config.mjs` to the domain; push
- [ ] 301 every chatgsc.com path to the new domain: either a `vercel.json` redirect in `chat-gsc` (the Vercel project serves chatgsc.com today) or Squarespace domain forwarding with path forwarding. Old paths then land on this site's `_redirects`
- [ ] Remove `NOINDEX` from the Cloudflare environment and redeploy
- [ ] Archive `griffinclark10/chat-gsc` once the 301s are verified
- [ ] Check: `curl -sI https://chatgsc.com/projects` → 301 to `https://<domain>/projects` → 301 to `/#experiments`

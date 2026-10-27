# Content to supply or confirm

Everything Griffin needs to supply before launch. Items marked `[FILL]` or `[CONFIRM]` render
visibly on the site, exactly as written, until they're resolved. Tick an item off once it's
resolved and the placeholder is gone from the source.

## Facts to confirm (SPEC §11)

- [ ] Bon public-safe metric for Exp. 005, and sign-off that the 005 card and worldline wording are OK to publish
- [x] Toolchain: TensorRT confirmed (2026-10-27)
- [ ] Toolchain, still open: ONNX? DeepStream/GStreamer? PyAV? RTSP multi-camera? (Only list what you've used in production or on a real project.)
- [ ] MPL title: Software Developer II or Software Engineer II
- [x] HelpingHand "Best Paper, CUCAI" confirmed (2026-10-27)
- [ ] TA course (quantum physics?) and dates
- [ ] Bon start date: résumé says Aug 2025
- [ ] Wildfire smoke project on Jetson Orin Nano: real and built? Keep or delete Exp. 008
- [ ] Queue Hop accuracy, if known
- [ ] ESP32 dev board and its actual price, for the "$10 chip" headline

## Content to supply (SPEC §11)

- [ ] Domain name → `site` in `astro.config.mjs` (currently `https://example.com`)
- [ ] Current general-purpose résumé PDF → `public/resume.pdf` (then remove the `resume.pdf` exclusion in `lychee.toml`)
- [ ] "Next, I want to…" line for the lab bench
- [ ] Thesis "What I'd do now" section
- [ ] Exp. 007 name, package name, repo, license, teacher model, and results as they come in
- [ ] First field note (thesis rewrite)

## Placeholders in the source, by location

Added as each milestone lands. `grep -rn "\[FILL\|\[CONFIRM" src` should match this list.
Everything below renders visibly on the site (dashed underline) unless marked _hidden_.

| Where (file)                                    | Placeholder                                                                                  | Since |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- | ----- |
| `astro.config.mjs`                              | `[FILL: domain]`, `site` set to example.com (_hidden_)                                       | M1    |
| footer + hero buttons                           | `résumé.pdf` links to `/resume.pdf`, not there yet                                           | M1    |
| Exp. 007 card (`distill-to-esp32.mdx`)          | `[CONFIRM: board price for the dev board actually used]`                                     | M2    |
| Exp. 007 terminal mock                          | `[N]` frames, `[SIZE]` KB                                                                    | M2    |
| Exp. 007 specimen (_hidden_ until M3 page)      | teacher, student params, license, repo: `[FILL]`                                             | M2    |
| Exp. 005 card (`edge-vision-in-production.mdx`) | result `[CONFIRM: public-safe metric approved by Bon …]`; tag `multi-camera [CONFIRM: RTSP]` | M2    |
| Exp. 002 card (`queue-hop.mdx`)                 | result `[CONFIRM: count accuracy / MAE if known]`                                            | M2    |
| Exp. 008 (`wildfire-smoke-jetson.mdx`)          | status and whole card (_hidden_: `draft: true`)                                              | M2    |
| worldline E₅ (`src/data/home.ts`)               | `[CONFIRM title: "Developer II" … vs "Engineer II" …]`                                       | M2    |
| worldline E₁                                    | `[CONFIRM: course; the old site's Q&A says a quantum physics class]`                         | M2    |
| lab bench                                       | `[FILL: one line, e.g. "work on the inference engine other people build on"]`                | M2    |
| instruments (`src/data/home.ts`, `pending`)     | ONNX, DeepStream / GStreamer, PyAV, RTSP / multi-camera (_hidden_ until confirmed, per §6.6) | M2    |

## Build notes for Griffin

- **Ticker glyphs (§9):** IBM Plex Mono has no Greek subset. Δ ħ ∇ ε ρ ₀ ✦ fall back per glyph to the system monospace; checked in Chrome on macOS, all render, no tofu.
- **Spec sheet still says `PyTorch → ONNX → TensorRT`**, as the spec wrote it, while ONNX stays hidden in the instruments list until confirmed. If you haven't used ONNX on a real project, drop it from the spec-sheet line too.
- **Card summaries are capped at 320 characters** by the content schema (§6.2); a longer one fails the build. Exp. 005 was reworded to 317 to fit (technical nouns kept, "health" and "updates" cut).
- **Exp. 007 links nowhere yet:** its case study is `pageDraft: true` (the spec's draft gate), so the featured card hides its `read the lab report →` CTA until the page goes public. No other card links yet either; case-study pages land in M3.

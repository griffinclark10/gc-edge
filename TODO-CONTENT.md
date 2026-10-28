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
- [x] Queue Hop accuracy: 7.2% MAE on 500 held-out frames, from the final report (confirmed 2026-10-27)
- [ ] ESP32 dev board and its actual price, for the "$10 chip" headline
- [ ] HelpingHand dataset: the paper's method says Kaggle's ASL Alphabet set (87,000 images); the card and old site say Sign Language MNIST. The paper's "24 letters, no J or Z" fits MNIST. Which one? (Case study shows a `[CONFIRM]`; the card summary may need the same fix.)
- [ ] HelpingHand card result: the paper reports 93% on the test set but **64% live**. The card says "93% accuracy · best paper". Suggest `93% test · 64% live · best paper`, which fits the honest-measurement pitch better.
- [ ] HelpingHand role: the case study says "I worked on the Keras model and built the browser interface" (from the old site). Correct?

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

| Where (file)                                       | Placeholder                                                                                                                                                     | Since |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `astro.config.mjs`                                 | `[FILL: domain]`, `site` set to example.com (_hidden_)                                                                                                          | M1    |
| footer + hero buttons                              | `résumé.pdf` links to `/resume.pdf`, not there yet                                                                                                              | M1    |
| Exp. 007 card (`distill-to-esp32.mdx`)             | `[CONFIRM: board price for the dev board actually used]`                                                                                                        | M2    |
| Exp. 007 terminal mock                             | `[N]` frames, `[SIZE]` KB                                                                                                                                       | M2    |
| Exp. 007 case study (_hidden_: `pageDraft`)        | specimen teacher, student params, license, repo `[FILL]`; tiles `[—]`; `[Δ]`, `[N]` seeds, `[PACKAGE-NAME]`; repo/write-up buttons hidden until they have links | M2–M3 |
| Exp. 005 card (`edge-vision-in-production.mdx`)    | result `[CONFIRM: public-safe metric approved by Bon …]`; tag `multi-camera [CONFIRM: RTSP]`                                                                    | M2    |
| Exp. 001 case study (`cooperative-perception.mdx`) | "If I ran it again": `[FILL: what you'd do now …]`                                                                                                              | M3    |
| Exp. 003 case study (`helpinghand-asl.mdx`)        | specimen dataset `[CONFIRM: Kaggle ASL Alphabet … or Sign Language MNIST …]`                                                                                    | M3    |
| Exp. 008 (`wildfire-smoke-jetson.mdx`)             | status and whole card (_hidden_: `draft: true`)                                                                                                                 | M2    |
| worldline E₅ (`src/data/home.ts`)                  | `[CONFIRM title: "Developer II" … vs "Engineer II" …]`                                                                                                          | M2    |
| worldline E₁                                       | `[CONFIRM: course; the old site's Q&A says a quantum physics class]`                                                                                            | M2    |
| lab bench                                          | `[FILL: one line, e.g. "work on the inference engine other people build on"]`                                                                                   | M2    |
| instruments (`src/data/home.ts`, `pending`)        | ONNX, DeepStream / GStreamer, PyAV, RTSP / multi-camera (_hidden_ until confirmed, per §6.6)                                                                    | M2    |

## Build notes for Griffin

- **Ticker glyphs (§9):** IBM Plex Mono has no Greek subset. Δ ħ ∇ ε ρ ₀ ✦ fall back per glyph to the system monospace; checked in Chrome on macOS, all render, no tofu.
- **Spec sheet still says `PyTorch → ONNX → TensorRT`**, as the spec wrote it, while ONNX stays hidden in the instruments list until confirmed. If you haven't used ONNX on a real project, drop it from the spec-sheet line too.
- **Card summaries are capped at 320 characters** by the content schema (§6.2); a longer one fails the build. Exp. 005 was reworded to 317 to fit (technical nouns kept, "health" and "updates" cut).
- **Exp. 007 links nowhere yet:** its case study is `pageDraft: true` (the spec's draft gate), so it builds in `npm run dev` only and the featured card hides `read the lab report →` until the page goes public. Remove `pageDraft` to publish.
- **Queue Hop images were anonymised** before going in the repo (M3): the line photo keeps only the annotated half, fully pixelated, with the model's head-dots redrawn; the app screenshots have venue photos and avatars pixelated. The unblurred originals are only in the old `chat-gsc` repo.
- **Queue Hop report PDF is withheld.** It contains the un-pixelated app screenshots (teammates' and bystanders' faces, p.17) and a sign with a phone number (p.11), so it's not in the repo and the 002 page has no report link. To publish it, redact those pages, add it as `public/papers/queue-hop.pdf` and restore `links.report` in `queue-hop.mdx`. `helpinghand-asl.pdf` is published as-is, author emails included (Griffin's call, 2026-10-27).
- **Case-study copy is sourced, not invented:** 001 from the thesis PDF, 002 from the final report, 003 from the paper. Where the spec's card copy and a source disagree, the case study follows the source and the disagreement is listed above.

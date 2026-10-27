# Content to supply or confirm

Everything Griffin needs to supply before launch. Items marked `[FILL]` or `[CONFIRM]` render
visibly on the site, exactly as written, until they're resolved. Tick an item off once it's
resolved and the placeholder is gone from the source.

## Facts to confirm (SPEC §11)

- [ ] Bon public-safe metric for Exp. 005, and sign-off that the 005 card and worldline wording are OK to publish
- [ ] Toolchain truth: ONNX? TensorRT? DeepStream/GStreamer? PyAV? RTSP multi-camera? (Only list what you've used in production or on a real project.)
- [ ] MPL title: Software Developer II or Software Engineer II
- [ ] HelpingHand "Best Paper, CUCAI" (on the old site, not on any résumé)
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

| Where                 | Placeholder                                        | Since |
| --------------------- | -------------------------------------------------- | ----- |
| `astro.config.mjs`    | `[FILL: domain]`, `site` set to example.com        | M1    |
| footer + hero buttons | `résumé.pdf` links to `/resume.pdf`, not there yet | M1    |

## Build notes for Griffin

- **Ticker glyphs (§9):** IBM Plex Mono has no Greek subset, so Δ ħ ∇ ε ρ in the ticker will fall back to `ui-monospace`. This is handled in M2; flagged here in case you'd rather swap the ticker to glyphs Plex covers.

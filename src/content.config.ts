import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Field notes (§6.7). The collection exists from M1 so the nav and 404 can hide
// "field notes" until at least one note is published. Templates arrive in M4.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    number: z.string(), // "001"
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.enum(['edge ml', 'tooling', 'physics'])),
    readMinutes: z.number().int().positive(),
    draft: z.boolean().default(true),
  }),
});

// Experiments (§6.2). Two extra fields beyond the spec schema:
// - `pageDraft`: the entry's card is public but its case-study page isn't built in
//   production yet (Exp. 007). `draft` still hides the whole entry (Exp. 008).
// - `notes`: [CONFIRM]/[FILL] lines that belong next to the title, e.g. 007's price check.
// `terminal` holds the featured card's mock terminal lines.
//
// Case-study fields (§5.2) are all optional: the page renders a section only when its
// data exists. The MDX body, when present, renders as the "Method" section.
const caption = z.string(); // figure captions omit "FIG. n ·"; the page numbers them

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiments' }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      kicker: z.string(),
      status: z.enum(['shipped', 'in-progress', 'planned']),
      featured: z.boolean().default(false),
      order: z.number(),
      summary: z.string().max(320), // §6.2: card copy, ≤ 320 chars
      result: z.string().optional(),
      tags: z.array(z.string()),
      illustration: z.string().optional(),
      hasPage: z.boolean(),
      draft: z.boolean().default(false),
      pageDraft: z.boolean().default(false),
      notes: z.array(z.string()).default([]),
      terminal: z.array(z.string()).optional(),
      specimen: z.record(z.string()).optional(),
      links: z
        .object({
          repo: z.string().optional(),
          report: z.string().optional(),
          demo: z.string().optional(),
        })
        .optional(),

      // ── case study ──
      lede: z.string().optional(),
      /** "YYYY.MM" or "YYYY", shown on the shipped status pill */
      date: z.string().optional(),
      pipeline: z
        .object({
          title: z.string(),
          steps: z.array(z.object({ label: z.string(), text: z.string() })),
          loop: z.object({ label: z.string(), text: z.string() }).optional(),
        })
        .optional(),
      hypothesis: z.string().optional(),
      questions: z.array(z.string()).optional(),
      results: z
        .object({
          title: z.string(),
          tiles: z
            .array(
              z.object({
                label: z.string(),
                value: z.string().optional(), // missing → "[—]"
                unit: z.string().optional(),
                sub: z.string().optional(),
              }),
            )
            .default([]),
          table: z
            .object({
              caption,
              columns: z.array(z.string()),
              rows: z.array(z.array(z.string())),
              highlight: z.number().int().optional(), // row index to emphasise
              note: z.string().optional(),
            })
            .optional(),
          plot: z.object({ caption, yLabel: z.string() }).optional(),
          gallery: z.array(z.object({ src: image(), alt: z.string(), caption })).default([]),
          note: z.string().optional(),
        })
        .optional(),
      log: z
        .object({
          title: z.string(),
          entries: z.array(
            z.object({
              date: z.string().optional(),
              status: z.enum(['planned', 'in-progress', 'done']),
              title: z.string(),
              text: z.string().optional(),
            }),
          ),
        })
        .optional(),
      reproduce: z
        .object({
          title: z.string(),
          lines: z.array(z.string()),
          // buttons without an href are not rendered (no links to nowhere)
          buttons: z
            .array(z.object({ label: z.string(), href: z.string().optional() }))
            .default([]),
        })
        .optional(),
      reflection: z.object({ title: z.string(), text: z.string() }).optional(),
    }),
});

export const collections = { notes, experiments };

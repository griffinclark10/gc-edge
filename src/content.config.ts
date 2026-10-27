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
const experiments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiments' }),
  schema: z.object({
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
  }),
});

export const collections = { notes, experiments };

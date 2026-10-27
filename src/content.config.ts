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

export const collections = { notes };

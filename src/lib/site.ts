import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  name: 'Griffin Clark',
  homeTitle: 'Griffin Clark · Edge computer vision engineer',
  description:
    'Griffin Clark is an engineering physicist who puts computer vision on small hardware: NVIDIA Jetson fleets, microcontrollers, and the release, telemetry and benchmarking that keep models working in the field.',
  email: 'griffinclark10@gmail.com',
  github: 'https://github.com/griffinclark10',
  linkedin: 'https://www.linkedin.com/in/griffin-clark-a02513146/',
  resume: '/resume.pdf',
} as const;

/**
 * Drafts (notes with `draft: true`, experiments with `pageDraft: true`) render in
 * `astro dev`, and in a production build only with `SHOW_DRAFTS=1` (local QA of the
 * draft pages; CI and deploys never set it).
 */
export const SHOW_DRAFTS = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

/**
 * Staging switch: `NOINDEX=1` at build time keeps every page out of search engines
 * (robots meta + robots.txt Disallow) while the site is live but not launched.
 * Set it in the Cloudflare Pages environment; remove it on launch day.
 */
export const NOINDEX = process.env.NOINDEX === '1';

export type Note = CollectionEntry<'notes'>;

/** Published notes, newest first. A published note must have a date. */
export async function getPublishedNotes() {
  const notes = await getCollection('notes', ({ data }) => SHOW_DRAFTS || !data.draft);
  for (const n of notes) {
    if (!n.data.draft && !n.data.date) throw new Error(`Published note "${n.id}" needs a date`);
  }
  return notes.sort(
    (a, b) =>
      (b.data.date?.valueOf() ?? Infinity) - (a.data.date?.valueOf() ?? Infinity) ||
      b.data.number.localeCompare(a.data.number),
  );
}

/** §3: the "field notes" nav item and routes stay hidden until a note is published. */
export async function notesAreVisible() {
  return (await getPublishedNotes()).length > 0;
}

/** "2026.11.03", the site's date style. Missing dates render as a visible placeholder. */
export function formatDate(date: Date | undefined) {
  return date ? date.toISOString().slice(0, 10).replaceAll('-', '.') : '[DATE]';
}

/** Reading time at ~230 words a minute, unless the note sets `readMinutes`. */
export function readMinutes(note: Note) {
  if (note.data.readMinutes) return note.data.readMinutes;
  const words = (note.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

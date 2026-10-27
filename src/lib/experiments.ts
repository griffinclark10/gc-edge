import { getCollection, type CollectionEntry } from 'astro:content';

export type Experiment = CollectionEntry<'experiments'>;

/**
 * Case-study pages arrive in M3. Until then no card links anywhere, so the build
 * never points at a route that doesn't exist. Flip to true when
 * src/pages/experiments/[slug].astro lands.
 */
const PAGES_READY = false;

/** Entries visible in this build, by display order (§6.4: relevance, not date). */
export async function getListedExperiments() {
  const entries = await getCollection('experiments', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** Whether this entry's case study is built in this build. */
export function hasLivePage({ data }: Experiment) {
  if (!PAGES_READY || !data.hasPage) return false;
  return import.meta.env.DEV || !data.pageDraft;
}

export function experimentHref(entry: Experiment) {
  return hasLivePage(entry) ? `/experiments/${entry.data.slug}` : undefined;
}

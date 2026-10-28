import { getCollection, type CollectionEntry } from 'astro:content';

export type Experiment = CollectionEntry<'experiments'>;

/** Entries visible in this build, by display order (§6.4: relevance, not date). */
export async function getListedExperiments() {
  const entries = await getCollection('experiments', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Whether this entry's case study is built in this build. `pageDraft` pages
 * (Exp. 007) exist in `astro dev` only, so nothing links to a page that isn't public.
 */
export function hasLivePage({ data }: Experiment) {
  if (!data.hasPage) return false;
  return import.meta.env.DEV || !data.pageDraft;
}

export function experimentHref(entry: Experiment) {
  // trailing slash matches the built /experiments/<slug>/index.html, so no redirect hop
  return hasLivePage(entry) ? `/experiments/${entry.data.slug}/` : undefined;
}

/** Case studies built in this build, in display order. */
export async function getLiveExperiments() {
  return (await getListedExperiments()).filter(hasLivePage);
}

/** Previous/next case study by display order, for the footer nav. No wrap-around. */
export function neighbours(live: Experiment[], entry: Experiment) {
  const i = live.findIndex((e) => e.id === entry.id);
  return { prev: live[i - 1], next: live[i + 1] };
}

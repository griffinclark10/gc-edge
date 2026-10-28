// Every page that gets an Open Graph image (§8: one per page). BaseLayout derives
// the same path from the page URL, so the two stay in step.
import { getLiveExperiments } from './experiments';
import { getPublishedNotes, notesAreVisible } from './site';

export interface OgPage {
  /** "home", "experiments/<slug>", "notes", "notes/<slug>" → /og/<path>.png */
  path: string;
  title: string;
  kicker: string;
  /** detection-box chip over the first word */
  chip: string;
}

export function ogPathFor(pathname: string) {
  const clean = pathname.replace(/^\/|\/$/g, '');
  return `/og/${clean || 'home'}.png`;
}

export async function getOgPages(): Promise<OgPage[]> {
  const pages: OgPage[] = [
    {
      path: 'home',
      title: 'Griffin Clark.',
      kicker: 'EDGE COMPUTER VISION · VANCOUVER, BC',
      chip: 'person · id 07 · 0.98',
    },
  ];
  for (const e of await getLiveExperiments()) {
    pages.push({
      path: `experiments/${e.data.slug}`,
      title: e.data.title,
      kicker: e.data.kicker,
      chip: `exp · ${e.data.id} · 0.98`,
    });
  }
  if (await notesAreVisible()) {
    pages.push({
      path: 'notes',
      title: 'Field notes.',
      kicker: 'NOTEBOOK · VOL. 1',
      chip: 'notes · 0.98',
    });
    for (const n of await getPublishedNotes()) {
      pages.push({
        path: `notes/${n.id}`,
        title: n.data.title,
        kicker: `N° ${n.data.number} · FIELD NOTE`,
        chip: `note · ${n.data.number} · 0.98`,
      });
    }
  }
  return pages;
}

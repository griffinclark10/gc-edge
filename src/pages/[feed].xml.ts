// /rss.xml (§3), built only once a note is published, like the notes routes.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedNotes, notesAreVisible } from '../lib/site';

export async function getStaticPaths() {
  return (await notesAreVisible()) ? [{ params: { feed: 'rss' } }] : [];
}

export const GET: APIRoute = async ({ site }) => {
  const notes = await getPublishedNotes();
  return rss({
    title: 'Field notes · Griffin Clark',
    description:
      "Write-ups from the bench: what I measured, what broke, and what I'd do differently.",
    site: site!,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.dek,
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
      categories: note.data.tags,
    })),
  });
};

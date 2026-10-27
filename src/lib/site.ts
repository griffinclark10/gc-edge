import { getCollection } from 'astro:content';

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

/** Drafts are visible in `astro dev` and excluded from production builds. */
export async function getPublishedNotes() {
  return getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
}

/** §3: the "field notes" nav item and route stay hidden until a note is published. */
export async function notesAreVisible() {
  return (await getPublishedNotes()).length > 0;
}

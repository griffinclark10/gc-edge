// Every page in the built site, read from the output folder so new pages are covered
// without touching the tests.
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.env.DIST ?? 'dist';

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

export const routes = htmlFiles(dist)
  .map((file) => '/' + relative(dist, file).replace(/index\.html$/, ''))
  .sort();

/** "/experiments/queue-hop/" → "experiments-queue-hop" */
export const routeName = (route: string) =>
  route.replace(/^\/|\/$/g, '').replace(/[/.]/g, '-') || 'home';

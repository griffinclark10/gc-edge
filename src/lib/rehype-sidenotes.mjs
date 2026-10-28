// §5.4: footnotes as margin notes on wide screens.
//
// GFM footnotes render as a list at the end of the post. This plugin copies each
// footnote's content into an <aside class="sidenote"> placed right after the block
// that references it. CSS shows the asides in the right margin at ≥1100px and hides
// the end list visually there; below that, the asides are hidden and the list shows.
// The asides are aria-hidden: screen readers always get the standard footnotes.

const isElement = (node, tag) => node?.type === 'element' && (!tag || node.tagName === tag);

function findFootnoteSection(node) {
  if (isElement(node, 'section') && 'dataFootnotes' in (node.properties ?? {})) return node;
  for (const child of node.children ?? []) {
    const hit = findFootnoteSection(child);
    if (hit) return hit;
  }
  return undefined;
}

function collectRefs(node, out = []) {
  if (isElement(node, 'a') && 'dataFootnoteRef' in (node.properties ?? {})) {
    out.push(String(node.properties.href).replace(/^#/, ''));
  }
  for (const child of node.children ?? []) collectRefs(child, out);
  return out;
}

function withoutBackrefs(node) {
  if (!node.children) return node;
  return {
    ...node,
    children: node.children
      .filter((c) => !(isElement(c, 'a') && 'dataFootnoteBackref' in (c.properties ?? {})))
      .map(withoutBackrefs),
  };
}

export default function rehypeSidenotes() {
  return (tree) => {
    const section = findFootnoteSection(tree);
    if (!section) return;

    const notes = new Map();
    const list = section.children.find((c) => isElement(c, 'ol'));
    let n = 0;
    for (const li of list?.children ?? []) {
      if (!isElement(li, 'li')) continue;
      n += 1;
      const body = li.children.filter((c) => isElement(c)).map(withoutBackrefs);
      notes.set(li.properties.id, { n, body });
    }

    const visit = (parent) => {
      const out = [];
      for (const child of parent.children ?? []) {
        out.push(child);
        if (child === section || !isElement(child)) continue;
        const refs = collectRefs(child);
        if (refs.length && ['p', 'li', 'blockquote'].includes(child.tagName)) {
          for (const id of refs) {
            const note = notes.get(id);
            if (!note) continue;
            out.push({
              type: 'element',
              tagName: 'aside',
              properties: { className: ['sidenote'], ariaHidden: 'true' },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['sidenote-n'] },
                  children: [{ type: 'text', value: String(note.n) }],
                },
                ...note.body.flatMap((b) => (isElement(b, 'p') ? b.children : [b])),
              ],
            });
          }
        } else if (child.children && !refs.length) {
          // nothing to place under this subtree
        } else if (child.children) {
          child.children = visit(child);
        }
      }
      return out;
    };
    tree.children = visit(tree);
  };
}

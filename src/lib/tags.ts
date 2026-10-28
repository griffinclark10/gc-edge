// Field-note tags (§6.7). No imports, so content.config.ts can use it too.
export const NOTE_TAGS = ['edge ml', 'tooling', 'physics'] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

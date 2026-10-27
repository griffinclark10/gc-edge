import Exp001 from './Exp001.astro';
import Exp002 from './Exp002.astro';
import Exp003 from './Exp003.astro';
import Exp004 from './Exp004.astro';
import Exp005 from './Exp005.astro';
import Exp006 from './Exp006.astro';

// Card header art (§4.4), keyed by the experiment's `illustration` field.
// `ground` is the header background: deep blue, or yellow for one card only.
export const illustrations = {
  Exp001: { component: Exp001, ground: 'deep' },
  Exp002: { component: Exp002, ground: 'deep' },
  Exp003: { component: Exp003, ground: 'accent' },
  Exp004: { component: Exp004, ground: 'deep' },
  Exp005: { component: Exp005, ground: 'deep' },
  Exp006: { component: Exp006, ground: 'deep' },
} as const;

export type IllustrationName = keyof typeof illustrations;

export function getIllustration(name: string | undefined) {
  return name && name in illustrations ? illustrations[name as IllustrationName] : undefined;
}

import type { EditorialSpotName } from '../components/EditorialSpot';

// Stable reading identities and authored associations are shared by all languages.
export const chapterIds = ['doorways', 'manifesto', 'adults-ideas', 'adults-product', 'adults-life', 'ai', 'parents', 'atlas', 'final-sky'];
export const partIds = [
  ['doorways'],
  ['manifesto-introduction', ...Array.from({length: 12}, (_, i) => `M${String(i + 1).padStart(2, '0')}`)],
  ['adults-invariant', 'adults-energy', 'adults-craft', 'adults-compass', 'adults-adult-cycle'],
  ['adults-product-intro', 'adults-product-observation', 'adults-product-first-try', 'adults-product-revision', 'adults-product-wind', 'adults-product-return'],
  ['adults-present-life', 'adults-ground-gravity', 'adults-purpose', 'adults-voice', 'adults-return'],
  ['ai-wind-meaning', 'ai-mirror', 'ai-interlocutor', 'ai-generator', 'ai-craft', 'ai-critic', 'ai-simulator', 'ai-direction-test'],
  ['parents-present-child', 'parents-family-cycle', 'parents-honest-modes', 'parents-refusal-feedback', 'parents-keeper-conditions', 'parents-family-wind'],
  ['atlas-practices', ...Array.from({length: 10}, (_, i) => `atlas-A${String(i + 1).padStart(2, '0')}`)],
  ['final-sky-reading'],
];
export const chapterSpots: readonly EditorialSpotName[] = ['borrowed-map','open-horizon','question-window','shared-table','adults-doorway','ai-doorway','parents-doorway','borrowed-map','open-horizon'];
export const partSpots: readonly (readonly EditorialSpotName[])[] = [
  ['borrowed-map'],
  ['open-horizon','dignity-bench','question-window','borrowed-map','patient-craft','care-basket','compass-hands','parents-doorway','adults-doorway','wind-anchor','return-repair','open-gate','open-horizon'],
  ['question-window','time-pocket','paper-bridge','compass-hands','return-repair'],
  ['shared-table','old-notebook','paper-letter','unfinished-drawing','wind-generator','borrowed-map'],
  ['adults-doorway','borrowed-map','old-notebook','paper-letter','time-pocket'],
  ['wind-anchor','wind-mirror','wind-dialogue','wind-generator','wind-craft','wind-critic','wind-simulator','compass-hands'],
  ['parents-doorway','paper-bridge','patient-craft','unfinished-drawing','making-space','child-roof'],
  ['borrowed-map','making-space','question-window','open-gate','atlas-template','paper-letter','old-notebook','time-pocket','return-repair','atlas-rest','borrowed-map'],
  ['open-horizon'],
];

/** Old chapter subdivisions remain meaningful entry points after condensation. */
export const creativeAnchorAliases: Record<string, string> = {
  'parents-ideas':'parents-present-child', 'parents-practices':'parents-family-cycle',
  'parents-dignity-responsibility':'parents-refusal-feedback','parents-care-gravity':'parents-keeper-conditions',
  'adults-maps':'adults-ground-gravity','adults-practices':'adults-purpose',
  'ai-ideas':'ai-wind-meaning','ai-practices':'ai-mirror','ai-human-assignments':'ai-mirror',
  'ai-wind-roles':'ai-generator','ai-cycle':'ai-direction-test','ai-human-first-pattern':'ai-craft',
  'ai-protocol':'ai-critic','ai-family-boundary':'parents-family-wind',
  'ai-drift-repairs':'ai-direction-test','ai-adoption-attribution':'ai-direction-test','ai-craft-scope':'ai-simulator',
};

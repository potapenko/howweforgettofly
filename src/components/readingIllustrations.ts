import type { EditorialSpotName } from './EditorialSpot';

// Authored associations, shared by every edition. Recurrence follows the text.
export const manifestoSpots: Record<string, EditorialSpotName> = {
  M01: 'dignity-bench', M02: 'question-window', M03: 'borrowed-map',
  M04: 'patient-craft', M05: 'care-basket', M06: 'compass-hands',
  M07: 'parents-doorway', M08: 'adults-doorway', M09: 'wind-anchor',
  M10: 'return-repair', M11: 'open-gate', M12: 'open-horizon',
};
export const cycleSpots: readonly EditorialSpotName[] = [
  'question-window', 'compass-hands', 'time-pocket', 'patient-craft',
  'paper-bridge', 'return-repair', 'atlas-rest',
];
export const pathwaySpots = {
  parent: 'parents-doorway', adult: 'adults-doorway', ai: 'ai-doorway',
} as const;
export const cardSpots: Record<string, EditorialSpotName> = {
  safety: 'open-gate', time: 'time-pocket', rest: 'atlas-rest',
  materials: 'making-space', craft: 'patient-craft', boundaries: 'open-gate',
  conversation: 'shared-table', return: 'return-repair',
  instruction: 'wind-craft', boundary: 'open-gate', invitation: 'question-window',
  'co-exploration': 'paper-bridge', witness: 'parents-doorway',
  money: 'old-notebook', care: 'care-basket', work: 'adults-doorway', ai: 'wind-anchor',
  consent: 'open-gate', compass: 'compass-hands', responsibility: 'return-repair',
  'hidden-brief': 'unfinished-drawing', 'safety-expands': 'open-gate',
  'absent-keeper': 'care-basket', 'explanation-interrupts': 'shared-table',
  'pattern-criteria': 'compass-hands', 'pattern-options': 'wind-generator',
  'pattern-making': 'patient-craft', 'step-1': 'question-window',
  'step-3': 'wind-craft', 'step-4': 'paper-letter', 'step-6': 'wind-critic',
  'drift-01': 'question-window', 'drift-02': 'compass-hands',
  'drift-03': 'borrowed-map', 'drift-04': 'paper-letter',
  'drift-05': 'wind-critic', 'drift-06': 'wind-mirror',
  'drift-07': 'open-gate', 'drift-08': 'patient-craft',
  'drift-09': 'atlas-template', 'drift-10': 'return-repair',
  'parent-what-grounds-flight': 'care-basket',
  'parent-instruction-invitation': 'open-gate', 'parent-ground-landing': 'atlas-rest',
  'adult-problem-finder': 'question-window', 'adult-one-day-form': 'time-pocket',
  'adult-boring-hinge': 'patient-craft', 'adult-relationship-check': 'shared-table',
  'adult-honorable-refusal': 'open-gate', 'ai-adoption-test': 'paper-letter',
  'parent-scene-02': 'child-roof', 'parent-scene-04': 'wind-craft',
  'parent-scene-08': 'blanket-fort', 'parent-scene-10': 'atlas-rest',
  'parent-scene-11': 'unfinished-drawing', 'adult-scene-a': 'wind-generator',
  'adult-scene-b': 'old-notebook', 'adult-scene-c': 'borrowed-map',
  'ai-scene-assistance-without-erasure': 'paper-letter',
};
// Six prompts per authored phase; these are stable card-number associations.
export const invitationSpots: readonly EditorialSpotName[] = [
  'question-window', 'care-basket', 'patient-craft', 'borrowed-map', 'care-basket', 'open-horizon',
  'question-window', 'compass-hands', 'shared-table', 'open-gate', 'borrowed-map', 'wind-craft',
  'time-pocket', 'shared-table', 'atlas-template', 'making-space', 'patient-craft', 'atlas-rest',
  'paper-letter', 'wind-mirror', 'patient-craft', 'atlas-template', 'return-repair', 'shared-table',
  'unfinished-drawing', 'care-basket', 'wind-anchor', 'borrowed-map', 'atlas-rest', 'open-horizon',
];

export const manifestoEchoSpots: Record<string, EditorialSpotName> = {
  M01: 'care-basket', M02: 'compass-hands', M03: 'open-horizon',
  M04: 'paper-bridge', M05: 'atlas-rest', M06: 'open-gate',
  M07: 'making-space', M08: 'old-notebook', M09: 'paper-letter',
  M10: 'shared-table', M11: 'atlas-rest', M12: 'question-window',
};

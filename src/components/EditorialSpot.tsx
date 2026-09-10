import { Fragment } from "react";
import "./editorial-spot.css";

const spotKinds = {
  "question-window": "section",
  "dignity-bench": "section",
  "compass-hands": "section",
  "return-repair": "section",
  "open-gate": "section",
  "shared-table": "section",
  "blanket-fort": "section",
  "paper-letter": "section",
  "time-pocket": "section",
  "care-basket": "section",
  "wind-anchor": "section",
  "open-horizon": "section",

  "parents-doorway": "doorway", "adults-doorway": "doorway", "ai-doorway": "doorway",
  "paper-bridge": "section", "child-roof": "section", "making-space": "section",
  "unfinished-drawing": "section", "old-notebook": "section", "borrowed-map": "section",
  "patient-craft": "section", "wind-mirror": "role", "wind-generator": "role",
  "wind-dialogue": "role", "wind-critic": "role", "wind-craft": "role",
  "wind-simulator": "role", "atlas-template": "atlas", "atlas-rest": "atlas",
} as const;

export type EditorialSpotName = keyof typeof spotKinds;

export const doorwaySpots: Partial<Record<string, EditorialSpotName>> = {
  "/parents": "parents-doorway", "/adults": "adults-doorway", "/ai": "ai-doorway",
};
export const sectionSpots: Partial<Record<string, EditorialSpotName>> = {
  "parents-present-child": "child-roof",
  "parents-keeper-conditions": "making-space",
  "parents-family-cycle": "paper-bridge",
  "parents-refusal-feedback": "unfinished-drawing",
  "adults-invariant": "old-notebook",
  "adults-maps": "borrowed-map",
  "adults-craft": "patient-craft",
  "parents-dignity-responsibility": "dignity-bench",
  "parents-honest-modes": "open-gate",
  "parents-family-wind": "wind-anchor",
  "parents-care-gravity": "parents-doorway",
  "adults-purpose": "question-window",
  "adults-present-life": "care-basket",
  "adults-ground-gravity": "dignity-bench",
  "adults-adult-cycle": "return-repair",
  "ai-wind-meaning": "wind-anchor",
  "ai-human-assignments": "compass-hands",
  "ai-wind-roles": "wind-generator",
  "ai-cycle": "paper-letter",
  "ai-human-first-pattern": "patient-craft",
  "ai-protocol": "compass-hands",
  "ai-direction-test": "borrowed-map",
  "ai-family-boundary": "parents-doorway",
  "ai-drift-repairs": "return-repair",
  "ai-adoption-attribution": "paper-letter",
  "ai-craft-scope": "wind-craft",
};
export const windSpots = {
  mirror: "wind-mirror", generator: "wind-generator", interlocutor: "wind-dialogue",
  critic: "wind-critic", "craft-aid": "wind-craft", simulator: "wind-simulator",
} as const satisfies Record<string, EditorialSpotName>;
export const atlasSpots: Partial<Record<string, EditorialSpotName>> = {
  A01: "making-space", A02: "question-window", A03: "open-gate",
  A04: "atlas-template", A05: "paper-letter", A06: "old-notebook",
  A07: "time-pocket", A08: "return-repair", A09: "atlas-rest", A10: "borrowed-map",
};

// Adjacent authored prose carries the meaning. Stable ids keep the same
// decorative composition in every edition without adding translated labels.
export function EditorialSpot({ name, size, surface = "paper" }: {
  name: EditorialSpotName;
  size?: "reading" | "small";
  surface?: "paper" | "blue";
}) {
  const kind = spotKinds[name];
  const section = kind === "section";
  const width = section ? 1200 : kind === "doorway" ? 900 : 600;
  const source = `/illustrations/${surface === "blue" ? "blue/" : ""}${name}`;
  return (
    <img
      className={`editorial-spot editorial-spot--${kind} editorial-spot--${name} editorial-spot--${surface}${size ? ` editorial-spot--${size}` : ""}`}
      src={`${source}.webp`}
      srcSet={section
        ? `${source}-600.webp 600w, ${source}.webp 1200w`
        : undefined}
      sizes={section ? (size === "small" ? "180px" : size === "reading" ? "(max-width: 900px) 300px, 420px" : "(max-width: 860px) calc(100vw - 48px), 520px") : undefined}
      width={width}
      height={width * 2 / 3}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}


/** Normal-flow artwork between authored paragraphs; no text splitting or state. */
export function ReadingParagraphs({ paragraphs, name, surface }: {
  paragraphs: readonly string[];
  surface?: "paper" | "blue";
  name: EditorialSpotName;
}) {
  return <>{paragraphs.map((paragraph, index) => (
    <Fragment key={index}>
      <p>{paragraph}</p>
      {index < paragraphs.length - 1
        ? <EditorialSpot name={name} size="reading" surface={surface} /> : null}
    </Fragment>
  ))}</>;
}

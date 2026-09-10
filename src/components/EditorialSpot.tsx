import "./editorial-spot.css";

const spotKinds = {
  "parents-doorway": "doorway", "adults-doorway": "doorway", "ai-doorway": "doorway",
  "paper-bridge": "section", "child-roof": "section", "making-space": "section",
  "unfinished-drawing": "section", "old-notebook": "section", "borrowed-map": "section",
  "patient-craft": "section", "wind-mirror": "role", "wind-generator": "role",
  "wind-dialogue": "role", "wind-critic": "role", "wind-craft": "role",
  "wind-simulator": "role", "atlas-template": "atlas", "atlas-rest": "atlas",
} as const;

type EditorialSpotName = keyof typeof spotKinds;

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
};
export const windSpots = {
  mirror: "wind-mirror", generator: "wind-generator", interlocutor: "wind-dialogue",
  critic: "wind-critic", "craft-aid": "wind-craft", simulator: "wind-simulator",
} as const satisfies Record<string, EditorialSpotName>;
export const atlasSpots: Partial<Record<string, EditorialSpotName>> = {
  A04: "atlas-template", A09: "atlas-rest",
};

// Adjacent authored prose carries the meaning. Stable ids keep the same
// decorative composition in every edition without adding translated labels.
export function EditorialSpot({ name }: { name: EditorialSpotName }) {
  const kind = spotKinds[name];
  const section = kind === "section";
  const width = section ? 1200 : kind === "doorway" ? 900 : 600;
  return (
    <img
      className={`editorial-spot editorial-spot--${kind} editorial-spot--${name}`}
      src={`/illustrations/${name}.webp`}
      srcSet={section
        ? `/illustrations/${name}-600.webp 600w, /illustrations/${name}.webp 1200w`
        : undefined}
      sizes={section ? "(max-width: 860px) calc(100vw - 48px), 520px" : undefined}
      width={width}
      height={width * 2 / 3}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

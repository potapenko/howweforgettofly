import "./editorial-spot.css";

type EditorialSpotName = "paper-bridge" | "parents-doorway" | "wind-mirror";

// The adjacent authored prose carries the meaning. These static, decorative
// spots need neither translated labels nor the chapter scene's motion runtime.
export function EditorialSpot({ name }: { name: EditorialSpotName }) {
  const bridge = name === "paper-bridge";
  const width = bridge ? 1200 : name === "parents-doorway" ? 900 : 600;

  return (
    <img
      className={`editorial-spot editorial-spot--${name}`}
      src={`/illustrations/${name}.webp`}
      srcSet={bridge
        ? "/illustrations/paper-bridge-600.webp 600w, /illustrations/paper-bridge.webp 1200w"
        : undefined}
      sizes={bridge ? "(max-width: 860px) calc(100vw - 48px), 520px" : undefined}
      width={width}
      height={width * 2 / 3}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

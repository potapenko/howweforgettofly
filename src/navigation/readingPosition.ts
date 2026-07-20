const readingAnchorSelector = [
  "#main-content main [data-book-section][id]",
  "#main-content main .scene-story-chapter[id]",
  "#main-content main [data-scene-content][id]",
  "#main-content main [data-pathway-section][id]",
  "#main-content main .pathway-sections[id]",
  "#main-content main section[id]",
].join(", ");

export interface ReadingPositionSnapshot {
  anchor: string;
  /** Reading line below the fixed header, in viewport pixels. */
  viewportOffset: number;
  /** Normalized position inside the semantic section. */
  sectionProgress: number;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function readingLineOffset(root: Document = document) {
  const headerHeight = Number.parseFloat(
    getComputedStyle(root.documentElement).getPropertyValue("--header-height"),
  );
  return (Number.isFinite(headerHeight) ? headerHeight : 78) + 12;
}

/**
 * Finds the smallest semantic section crossing the reading line. If the line
 * sits between sections, the nearest real content anchor is used instead.
 */
export function captureReadingPosition(
  root: Document = document,
  viewportOffset = readingLineOffset(root),
): ReadingPositionSnapshot | null {
  const candidates = Array.from(
    root.querySelectorAll<HTMLElement>(readingAnchorSelector),
  ).filter((element) => Boolean(element.id));
  if (candidates.length === 0) return null;

  const measured = candidates.map((element) => ({
    element,
    rect: element.getBoundingClientRect(),
  }));
  const crossing = measured.filter(
    ({ rect }) => rect.top <= viewportOffset && rect.bottom > viewportOffset,
  );
  const selected = crossing.length > 0
    ? crossing.reduce((best, candidate) =>
        candidate.rect.height < best.rect.height ? candidate : best,
      )
    : measured.reduce((best, candidate) =>
        Math.abs(candidate.rect.top - viewportOffset) <
        Math.abs(best.rect.top - viewportOffset)
          ? candidate
          : best,
      );
  const height = Math.max(1, selected.rect.height);

  return {
    anchor: selected.element.id,
    viewportOffset,
    sectionProgress: clamp((viewportOffset - selected.rect.top) / height),
  };
}

/** Restores the same relative reading point after sticky holds change height. */
export function restoreReadingPosition(
  snapshot: ReadingPositionSnapshot,
  root: Document = document,
) {
  const target = root.getElementById(snapshot.anchor);
  if (!target) return false;

  const rect = target.getBoundingClientRect();
  const desiredTop =
    snapshot.viewportOffset - snapshot.sectionProgress * Math.max(1, rect.height);
  const delta = rect.top - desiredTop;
  if (Math.abs(delta) < 0.5) return false;

  window.scrollTo({
    top: Math.max(0, window.scrollY + delta),
    left: window.scrollX,
    behavior: "auto",
  });
  return true;
}

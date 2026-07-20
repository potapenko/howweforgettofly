import { useEffect, useState } from "react";

function matchesQuery(query: string) {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;
}

/** Keeps layout decisions in sync with the same media query used by CSS. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchesQuery(query));

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    // Safari 13 and older embedded WebKit expose only the original
    // MediaQueryList listener API. Keep the layout breakpoint reactive there
    // instead of freezing the first desktop/mobile pose after rotation.
    media.addListener?.(update);
    return () => media.removeListener?.(update);
  }, [query]);

  return matches;
}

import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLocale } from "../i18n/LocaleContext";
import { ParallaxStage, storyForMechanism } from "../story";

interface HomeStoryProps {
  children: ReactNode;
  reducedMotion: boolean;
  onReleaseChange?: (released: boolean) => void;
}

/**
 * The opening spread is the visual navigation surface, not a decorative hero.
 * It stays pinned while the raster planes play, then releases into the essay.
 */
export function HomeStory({
  children,
  reducedMotion,
  onReleaseChange,
}: HomeStoryProps) {
  const releaseRef = useRef<HTMLDivElement>(null);
  const inlineStory = useMediaQuery("(max-width: 820px)");
  const locale = useLocale();
  const releasedRef = useRef(reducedMotion || inlineStory);
  const story = useMemo(() => {
    const source = storyForMechanism("map-sky");
    if (locale === "en") return source;
    return {
      ...source,
      poster: "/parallax/home/background-master.png",
      ariaLabel:
        "Раскрытая бумажная книга: над волнами идут парусник, воздушные змеи и самолётики, а цветные ленты показывают движение ветра.",
    };
  }, [locale]);

  const handleProgress = useCallback(
    (progress: number) => {
      const released = inlineStory || progress >= 0.965;
      if (released === releasedRef.current) return;
      releasedRef.current = released;
      onReleaseChange?.(released);
    },
    [inlineStory, onReleaseChange],
  );

  useEffect(() => {
    if (!inlineStory || releasedRef.current) return;
    releasedRef.current = true;
    onReleaseChange?.(true);
  }, [inlineStory, onReleaseChange]);

  return (
    <>
      <ParallaxStage
        className="home-story"
        inline={inlineStory}
        onProgress={handleProgress}
        reducedMotion={reducedMotion}
        showNarration={false}
        story={story}
      >
        {children}
      </ParallaxStage>
      <div
        aria-label={
          locale === "ru"
            ? "Вступительная сцена закончена. Дальше начинается текст."
            : "Opening story complete. Continue with the text."
        }
        className="story-release-anchor"
        ref={releaseRef}
        tabIndex={-1}
      />
    </>
  );
}

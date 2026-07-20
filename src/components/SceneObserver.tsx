import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  ParallaxStage,
  storyForMechanism,
  storySupportsLocale,
  type EditorialPanel,
} from "../story";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLocale } from "../i18n/LocaleContext";
import { useTheatreScene } from "../theatre";
import type { SceneDefinition } from "../types";

interface SceneObserverProps extends HTMLAttributes<HTMLElement> {
  scene: SceneDefinition;
  children: ReactNode;
  settled?: boolean;
  as?: "section" | "article" | "div";
  /** Stable id for the readable section released after the illustrated act. */
  contentId?: string;
  /** Presentational repeats of existing localized labels on authored paper tags. */
  editorialPanels?: readonly EditorialPanel[];
}

/**
 * Turns every route or chapter into the same two-part rhythm:
 * a pinned, layered paper story first, then its readable text and controls.
 * The old theatre context remains only as UI state for existing instruments;
 * no Canvas or WebGL host is mounted.
 */
export function SceneObserver({
  scene,
  children,
  settled = false,
  as: Component = "section",
  className,
  contentId,
  editorialPanels,
  id,
  tabIndex,
  ...props
}: SceneObserverProps) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const chapterId = id ?? `${scene.id}-illustration`;
  // The 821-900px portrait band was still receiving a 138svh sticky canvas,
  // which could pan the printed leaf beyond the viewport. Treat compact
  // reading chapters as one living inline spread across that band as well.
  const inlineStory = useMediaQuery("(max-width: 900px)");
  const locale = useLocale();
  const {
    scene: activeScene,
    reducedMotion,
    settled: theatreSettled,
    setScene,
    setVisible,
    settle,
  } = useTheatreScene();
  const story = useMemo(
    () => ({
      ...storyForMechanism(scene.mechanism, locale),
      // The registry owns motion, while the locale-specific scene owns words.
      ariaLabel: scene.description,
    }),
    [locale, scene.description, scene.mechanism],
  );
  const storySettled =
    settled || (theatreSettled && activeScene?.id === scene.id);

  const activate = useCallback(() => {
    // Re-entering the same chapter must not cancel an explicit settled state.
    // A genuinely different chapter still resets to its authored opening beat.
    if (activeScene?.id !== scene.id) setScene(scene);
    setVisible(true);
  }, [activeScene?.id, scene, setScene, setVisible]);

  useEffect(() => {
    const element = chapterRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activate();
      },
      { rootMargin: "-18% 0px -42%", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [activate]);

  useEffect(() => {
    if (!settled) return;
    setScene(scene);
    settle();
  }, [scene, setScene, settle, settled]);

  return (
    <div
      className="scene-story-chapter"
      data-register={scene.register}
      data-scene={scene.id}
      id={chapterId}
      ref={chapterRef}
      tabIndex={tabIndex}
    >
      {!settled ? (
        <ParallaxStage
          editorialCopy={{
            title: scene.title,
            thesis: scene.plainMeaning,
          }}
          editorialPanels={editorialPanels}
          focusAfterSkipRef={inlineStory ? undefined : contentRef}
          inline={inlineStory}
          onSkip={inlineStory ? undefined : activate}
          reducedMotion={reducedMotion}
          settled={storySettled}
          showNarration={storySupportsLocale(story, locale)}
          skipLabel={
            locale === "ru"
              ? `Пропустить иллюстрацию «${scene.title}»`
              : `Skip ${scene.title} illustration`
          }
          story={story}
        />
      ) : null}
      <Component
        {...props}
        className={className}
        data-register={scene.register}
        data-scene-content={scene.id}
        id={contentId}
        ref={contentRef as never}
      >
        {children}
      </Component>
    </div>
  );
}

// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface LegacyMediaQueryList {
  matches: boolean;
  addListener: ReturnType<typeof vi.fn>;
  removeListener: ReturnType<typeof vi.fn>;
}

function installLegacyMatchMedia(initialMatches: boolean) {
  const media: LegacyMediaQueryList = {
    matches: initialMatches,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => media),
  });
  return media;
}

function emitLegacyChange(media: LegacyMediaQueryList, matches: boolean) {
  media.matches = matches;
  const listener = media.addListener.mock.calls[0]?.[0] as
    | (() => void)
    | undefined;
  act(() => listener?.());
}

describe("WebKit media-query compatibility", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("keeps responsive layout queries reactive with legacy MediaQueryList listeners", () => {
    const media = installLegacyMatchMedia(false);
    const { result, unmount } = renderHook(() =>
      useMediaQuery("(max-width: 820px)"),
    );

    expect(result.current).toBe(false);
    expect(media.addListener).toHaveBeenCalledOnce();

    emitLegacyChange(media, true);
    expect(result.current).toBe(true);

    const listener = media.addListener.mock.calls[0][0];
    unmount();
    expect(media.removeListener).toHaveBeenCalledWith(listener);
  });

  it("stops or restores motion when an older WebKit preference changes", () => {
    const media = installLegacyMatchMedia(false);
    const { result, unmount } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
    emitLegacyChange(media, true);
    expect(result.current).toBe(true);

    const listener = media.addListener.mock.calls[0][0];
    unmount();
    expect(media.removeListener).toHaveBeenCalledWith(listener);
  });
});

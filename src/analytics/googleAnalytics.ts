export const MEASUREMENT_ID = "G-JFXJP3SZ0F";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function withoutQueryOrHash(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? `${url.origin}${url.pathname}`
      : "";
  } catch {
    return "";
  }
}

/** One tracker per document; isolated from reading state and rendering. */
export function createPageViewTracker(browser: Window) {
  let initialized = false;
  let failed = false;
  let lastPath: string | undefined;
  let previousPage = "";

  return (pathname: string) => {
    if (
      failed ||
      browser.location.protocol !== "https:" ||
      !["howweforgettofly.com", "www.howweforgettofly.com"].includes(
        browser.location.hostname,
      )
    ) return;

    if (pathname !== "/" && pathname !== "/ru/") {
      lastPath = undefined;
      return;
    }
    if (pathname === lastPath) return;

    try {
      const page = {
        page_location: `${browser.location.origin}${pathname}`,
        page_referrer: previousPage || withoutQueryOrHash(browser.document.referrer),
        page_title: pathname === "/ru/"
          ? "Как мы забываем летать — Творчество, авторство и ИИ"
          : "How We Forget to Fly — Creativity, Agency, and AI",
      };

      if (!initialized) {
        browser.dataLayer = browser.dataLayer || [];
        browser.gtag = function (..._args: unknown[]) {
          browser.dataLayer!.push(arguments);
        };
        browser.gtag("js", new Date());
        browser.gtag("config", MEASUREMENT_ID, {
          ...page,
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });

        const script = browser.document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        browser.document.head.appendChild(script);
        initialized = true;
      }

      // Keep enhanced scroll/click events on the same canonical edition URL.
      browser.gtag!("set", page);
      browser.gtag!("event", "page_view", { ...page, send_to: MEASUREMENT_ID });
      lastPath = pathname;
      previousPage = page.page_location;
    } catch {
      // Analytics is optional: extensions or unavailable globals cannot break reading.
      failed = true;
    }
  };
}

export const trackReadingPage = createPageViewTracker(window);

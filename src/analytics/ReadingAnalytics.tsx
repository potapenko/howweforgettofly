import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackReadingPage } from "./googleAnalytics";

export function ReadingAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackReadingPage(pathname);
  }, [pathname]);
  return null;
}

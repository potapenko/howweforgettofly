import { HomePage } from "./HomePage";
import { ManifestoPage } from "./ManifestoPage";
import { PathwayPage } from "./PathwayPage";
import { AtlasPage } from "./AtlasPage";
import { FinalSkyPage } from "./FinalSkyPage";
import { useLocale } from "../i18n/LocaleContext";

/**
 * The complete editorial journey is one document. Each chapter keeps its own
 * sticky paper story and then releases naturally into the next chapter.
 */
export function LongformPage() {
  const locale = useLocale();
  return (
    <main
      className="longform-page"
      aria-label={locale === "ru" ? "Как мы забываем летать" : "How We Forget to Fly"}
    >
      <HomePage embedded />
      <ManifestoPage embedded />
      <PathwayPage embedded pathwayId="parent" />
      <PathwayPage embedded pathwayId="adult" />
      <PathwayPage embedded pathwayId="ai" />
      <AtlasPage embedded />
      <FinalSkyPage embedded />
    </main>
  );
}

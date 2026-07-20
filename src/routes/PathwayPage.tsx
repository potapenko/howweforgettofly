import { SceneObserver } from "../components/SceneObserver";
import {
  pathways,
  windRoles,
  type CardDeck,
  type PathwayDefinition,
  type PathwayId,
  type WindRole,
} from "../content/pathways";
import { pathwaysRu, windRolesRu } from "../content/pathways.ru";
import {
  pageScenesFor,
  pathwayScenePlacementsFor,
} from "../content/pages";
import { useLocale } from "../i18n/LocaleContext";

function InvitationDeck({ deck, locale }: { deck: CardDeck; locale: "en" | "ru" }) {
  return (
    <section className="invitation-deck page-width">
      <div className="section-heading compact-heading">
        <p className="eyebrow">{deck.title}</p>
        <h2>
          {locale === "ru"
            ? "Тридцать небольших приглашений. Не марафон и не испытание."
            : "Thirty small invitations. Not a challenge or a streak."}
        </h2>
        <p>{deck.introduction}</p>
      </div>
      <ol className="invitation-reading-grid">
        {deck.cards.map((card) => (
          <li key={card.id}>
            <span>{String(card.number).padStart(2, "0")}</span>
            <small>{card.phase}</small>
            <p>{card.prompt}</p>
          </li>
        ))}
      </ol>
      <p className="deck-guardrail">{deck.guardrail}</p>
    </section>
  );
}

function WindRoles({ roles, locale }: { roles: readonly WindRole[]; locale: "en" | "ru" }) {
  const labels = locale === "ru"
    ? {
        eyebrow: "Шесть видимых ролей",
        title: "Выберите для Ветра одну роль.",
        intro: "Роль определяет, какую помощь мы просим. Она не меняет человеческий вопрос, не даёт согласия и не решает, что принять.",
        contribution: "Чем может помочь",
        pull: "Куда незаметно тянет",
        decision: "Что решает человек",
        prompt: "Пример запроса",
        noAiTitle: "И без ИИ маршрут остаётся целым",
        noAi: "Вопрос, критерии и окончательное решение можно удерживать с помощью блокнота, разговора, источника, ремесленной практики — или вообще без помощника.",
      }
    : {
        eyebrow: "Six visible roles",
        title: "Give the Wind one job.",
        intro: "A role defines the help being requested. It does not change the human question, give consent, or decide what to adopt.",
        contribution: "Useful contribution",
        pull: "Non-neutral pull",
        decision: "Human decision",
        prompt: "Bounded starter",
        noAiTitle: "The route remains complete without AI",
        noAi: "The question, criteria, and final adoption can be held with a notebook, another person, a source, a craft practice—or no assistant at all.",
      };
  return (
    <section className="wind-role-instrument">
      <div className="section-heading compact-heading">
        <p className="eyebrow">{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p>{labels.intro}</p>
      </div>
      <div className="wind-role-reading-grid">
        {roles.map((role) => (
          <article key={role.id}>
            <h3>{role.title}</h3>
            <dl>
              <div><dt>{labels.contribution}</dt><dd>{role.usefulContribution}</dd></div>
              <div><dt>{labels.pull}</dt><dd>{role.nonNeutralPull}</dd></div>
              <div><dt>{labels.decision}</dt><dd>{role.humanDecision}</dd></div>
              <div><dt>{labels.prompt}</dt><dd>{role.starterPrompt}</dd></div>
            </dl>
          </article>
        ))}
        <article className="no-ai-card">
          <h3>{labels.noAiTitle}</h3>
          <p>{labels.noAi}</p>
        </article>
      </div>
    </section>
  );
}

export function PathwayPage({
  pathwayId,
  embedded = false,
}: {
  pathwayId: PathwayId;
  embedded?: boolean;
}) {
  const locale = useLocale();
  const localizedPathways = locale === "ru" ? pathwaysRu : pathways;
  const pathway: PathwayDefinition = localizedPathways[pathwayId];
  const roles = locale === "ru" ? windRolesRu : windRoles;
  const sceneKey = pathwayId === "parent" ? "parents" : pathwayId === "adult" ? "adults" : "ai";
  const sectionId = sceneKey;
  const ideasId = `${sectionId}-ideas`;
  const practicesId = `${sectionId}-practices`;
  const scene = pageScenesFor(locale)[sceneKey];
  const scenePlacements = pathwayScenePlacementsFor(locale, pathwayId);
  const Root = embedded ? "section" : "main";
  const ChapterHeading = embedded ? "h2" : "h1";
  const labels = locale === "ru"
    ? {
        outcome: "Что может стать возможным",
        practicesEyebrow: "Идеи, которые можно попробовать",
        practicesTitle: "Одна небольшая форма — или ни одной.",
        practicesIntro: "Это не задания и не проверка. Каждый фрагмент можно просто прочитать, взять с собой или оставить.",
        action: "Возможный ход",
        complete: "Когда достаточно",
        guardrail: "Граница",
        scenesEyebrow: "Обычные ситуации",
        scenesTitle: "Как принцип выглядит в жизни",
        scenesIntro: "Это примеры для размышления, а не готовые реплики и не вердикт о семье или человеке.",
        situation: "Ситуация",
        pattern: "Скрытая схема",
        response: "Более честный ответ",
        principle: "Принцип",
        guardrailsEyebrow: "Границы этого пути",
        guardrailsTitle: "Пусть свобода остаётся конкретной.",
        covenantEyebrow: "Обещание этого пути",
        covenantTitle: "Пусть отношения остаются честными.",
      }
    : {
        outcome: "What this path may make possible",
        practicesEyebrow: "Ideas you might try",
        practicesTitle: "One small form—or none.",
        practicesIntro: "These are not assignments or a test. Read a fragment, carry it with you, or leave it here.",
        action: "A possible move",
        complete: "Enough when",
        guardrail: "Guardrail",
        scenesEyebrow: "Ordinary situations",
        scenesTitle: "What the principle looks like in life",
        scenesIntro: "These are examples to think with, not scripts or verdicts about a person or family.",
        situation: "Situation",
        pattern: "Hidden pattern",
        response: "A more grounded response",
        principle: "Principle",
        guardrailsEyebrow: "This path's guardrails",
        guardrailsTitle: "Keep freedom concrete.",
        covenantEyebrow: "This path's covenant",
        covenantTitle: "Keep the relation honest.",
      };

  return (
    <Root className={`pathway-page pathway-${pathwayId} book-section`} data-book-section={sectionId} id={embedded ? sectionId : undefined} tabIndex={embedded ? -1 : undefined}>
      <SceneObserver scene={scene} className="pathway-hero scene-led-page">
        <div className="pathway-lead paper-panel">
          <p className="eyebrow">{pathway.eyebrow}</p>
          <ChapterHeading className="chapter-title">{pathway.title}</ChapterHeading>
          <p className="hero-deck">{pathway.lede}</p>
          <p>{pathway.plainThesis}</p>
        </div>
        <div className="theatre-reserve" aria-hidden="true" />
      </SceneObserver>

      <section className="path-outcome page-width">
        <p className="eyebrow">{labels.outcome}</p>
        <p>{pathway.readerOutcome}</p>
        <p>{pathway.nextStep}</p>
      </section>

      <div id={ideasId} className="pathway-sections">
        {pathway.sections.map((section, index) => {
          const domId = `${sectionId}-${section.id}`;
          const headingId = `${domId}-title`;
          const className = index % 2
            ? "path-section alternate"
            : "path-section";
          const content = (
            <div className="page-width path-section-grid">
              <div>
                <p className="eyebrow">{section.eyebrow}</p>
                <h2 id={headingId}>{section.title}</h2>
                <p className="section-plain">{section.plain}</p>
              </div>
              <div className="path-section-copy">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.cards && (
                  <div className="editorial-reading-grid">
                    {section.cards.map((card) => (
                      <article key={card.id}>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                        {card.detail && <p className="fold-detail">{card.detail}</p>}
                        {card.prompt && <p><strong>{locale === "ru" ? "Можно спросить:" : "A question to carry:"}</strong> {card.prompt}</p>}
                        {card.repair && <p><strong>{locale === "ru" ? "Что можно исправить:" : "Possible repair:"}</strong> {card.repair}</p>}
                        {card.items && <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
          const placement = scenePlacements.find(
            ({ afterSectionId, releaseIntoSectionId }) =>
              releaseIntoSectionId === section.id &&
              pathway.sections[index - 1]?.id === afterSectionId,
          );

          if (placement) {
            return (
              <SceneObserver
                aria-labelledby={headingId}
                as="section"
                className={className}
                contentId={domId}
                data-pathway-section={section.id}
                key={section.id}
                scene={placement.scene}
              >
                {content}
              </SceneObserver>
            );
          }

          return (
            <section
              aria-labelledby={headingId}
              className={className}
              data-pathway-section={section.id}
              id={domId}
              key={section.id}
            >
              {content}
            </section>
          );
        })}
      </div>

      {pathwayId === "ai" && <WindRoles roles={roles} locale={locale} />}

      <section id={practicesId} className="path-practices page-width">
        <div className="section-heading">
          <p className="eyebrow">{labels.practicesEyebrow}</p>
          <h2>{labels.practicesTitle}</h2>
          <p>{labels.practicesIntro}</p>
        </div>
        <div className="practice-card-grid reading-grid">
          {pathway.practices.map((practice, index) => (
            <article className="practice-card" key={practice.id}>
              <div className="practice-card-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{practice.time ?? (locale === "ru" ? "В своём темпе" : "At your pace")}</span>
              </div>
              <h3>{practice.title}</h3>
              <p>{practice.summary}</p>
              <dl className="reading-note-list">
                <div><dt>{labels.action}</dt><dd>{practice.action}</dd></div>
                <div><dt>{labels.complete}</dt><dd>{practice.completion}</dd></div>
                <div><dt>{labels.guardrail}</dt><dd>{practice.guardrail}</dd></div>
              </dl>
              {practice.prompts && <ul>{practice.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>}
            </article>
          ))}
        </div>
      </section>

      <section className="scene-library full-bleed-night">
        <div className="page-width">
          <div className="section-heading compact-heading">
            <p className="eyebrow">{labels.scenesEyebrow}</p>
            <h2>{labels.scenesTitle}</h2>
            <p>{labels.scenesIntro}</p>
          </div>
          <div className="scene-reading-grid">
            {pathway.sceneCards.map((card, index) => (
              <article className="scene-card" key={card.id}>
                <header><span>{String(index + 1).padStart(2, "0")}</span><h3>{card.title}</h3></header>
                <div>
                  <p><strong>{labels.situation}:</strong> {card.situation}</p>
                  {card.unhelpfulPattern && <p><strong>{labels.pattern}:</strong> {card.unhelpfulPattern}</p>}
                  <p><strong>{labels.response}:</strong> {card.groundedResponse}</p>
                  <p><strong>{labels.principle}:</strong> {card.principle}</p>
                  {card.steps && <ol>{card.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {pathway.cardDecks.map((deck) => <InvitationDeck key={deck.id} deck={deck} locale={locale} />)}

      <section className="path-covenant page-width" aria-labelledby={`${pathwayId}-guardrails-title`}>
        <div>
          <p className="eyebrow">{labels.guardrailsEyebrow}</p>
          <h2 id={`${pathwayId}-guardrails-title`}>{labels.guardrailsTitle}</h2>
        </div>
        <ol>{pathway.guardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}</ol>
      </section>

      <section className="path-covenant page-width">
        <div>
          <p className="eyebrow">{labels.covenantEyebrow}</p>
          <h2>{labels.covenantTitle}</h2>
        </div>
        <ol>{pathway.covenant.map((line) => <li key={line}>{line}</li>)}</ol>
      </section>
    </Root>
  );
}

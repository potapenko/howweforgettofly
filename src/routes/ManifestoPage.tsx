import { Link } from "react-router-dom";
import { SceneObserver } from "../components/SceneObserver";
import { manifestoArticles } from "../content/manifesto";
import { manifestoArticlesRu } from "../content/manifesto.ru";
import { useLocale } from "../i18n/LocaleContext";
import { canonicalBookHref } from "../navigation/bookNavigation";
import type { ManifestoArticle } from "../types";

function ManifestoSpread({
  article,
  locale,
}: {
  article: ManifestoArticle;
  locale: "en" | "ru";
}) {
  return (
    <SceneObserver
      as="article"
      scene={article.scene}
      className="manifesto-spread"
      id={article.id}
      tabIndex={-1}
    >
      <div className="manifesto-number" aria-hidden="true">
        {String(article.number).padStart(2, "0")}
      </div>
      <div className="manifesto-copy paper-panel">
        <p className="eyebrow">
          {locale === "ru" ? `Статья ${article.number}` : `Article ${article.number}`}
        </p>
        <h2>{article.title}</h2>
        <p className="article-kicker">{article.kicker}</p>
        <div className="article-body">
          {article.paragraphs.map((paragraph, index) =>
            paragraph.includes("→") ? (
              <p className="cycle-inline" key={`${article.id}-${index}`}>
                {paragraph}
              </p>
            ) : (
              <p key={`${article.id}-${index}`}>{paragraph}</p>
            ),
          )}
        </div>
        <aside className="article-landing">
          <p className="eyebrow">{locale === "ru" ? "Если приложить к жизни" : "In ordinary life"}</p>
          <p>{article.landing}</p>
        </aside>
      </div>
      <div className="theatre-reserve" aria-hidden="true" />
    </SceneObserver>
  );
}

export function ManifestoPage({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const articles = locale === "ru" ? manifestoArticlesRu : manifestoArticles;
  const Root = embedded ? "section" : "main";
  const ChapterHeading = embedded ? "h2" : "h1";
  const copy = locale === "ru"
    ? {
        eyebrow: "Меморандум о человеческом авторстве",
        title: "То, что должно остаться нашим",
        opening: [
          "Мы живём среди карт. Семья, школа, традиции, профессия, рынок и машины предлагают маршруты раньше, чем мы успеваем спросить, куда они ведут. В картах есть знание, память, предостережение и забота. Опасность появляется, когда карта незаметно объявляет себя небом: знакомый ответ возникает раньше вопроса, а правильное исполнение вытесняет живую связь человека с тем, что он делает.",
          "Генеративный ИИ сделал это напряжение особенно заметным. Готовая фраза, картинка или план могут появиться, пока наше намерение ещё складывается. Среди множества ответов просит внимания что-то более тихое: что мы хотим принести в мир и кому предстоит с этим жить?",
          "Творческое авторство мы называем Полётом. Человек замечает вопрос, выбирает направление, придаёт ответу форму и выпускает её в реальность. Обратно могут прийти полезная вещь, удивление, ошибка, смех или более точный вопрос. Эта книга следует за таким движением."
        ],
        index: "Статьи манифеста",
        covenantEyebrow: "Обещание и приглашение",
        covenantTitle: "Оставлять небо открытым — и не требовать, чтобы кто-то его заслужил.",
        covenant: [
          "Мы не будем просить людей заслужить достоинство, которое у них уже есть.",
          "Мы сохраним пользу карт и пространство, в котором можно услышать вопрос.",
          "Мы будем отвечать за безопасность детей, не присваивая себе право заранее решить, кем им стать.",
          "Мы оставим направление, согласие и ответственность людям, когда Ветер усилится.",
          "На Земле найдётся место ремеслу, заботе, помощи, границам, отказу, исправлению и отдыху."
        ],
        invitation: [
          "Возможно, какой-то вопрос оставался рядом, пока вы читали.",
          "Что произойдёт, если дать ему немного места?",
          "Фраза, сложенный лист, разговор. Что-то достаточно маленькое, чтобы попробовать, и достаточно настоящее, чтобы получить ответ.",
          "Если сегодня ничто не зовёт, страница может подождать."
        ],
      }
    : {
        eyebrow: "A memorandum for human authorship",
        title: "What must remain ours",
        opening: [
          "We live among maps. Families, schools, traditions, professions, markets, and machines offer routes before we know how to ask where they lead. Those maps carry knowledge, memory, warning, and care. The danger begins when a map quietly calls itself the sky: a familiar answer arrives before the question, and correct performance takes the place of a person’s living relation to the work.",
          "Generative AI has made this tension hard to ignore. A finished sentence, image, or plan can arrive while our intention is still taking shape. Among so many answers, something quieter asks for attention: what do we want to bring into the world, and who will live with it?",
          "We call creative authorship Flight. Someone notices a question, chooses a direction, gives the answer a form, and lets it meet reality. What returns may be a useful thing, a surprise, a mistake, a laugh, or a better question. This book follows that movement."
        ],
        index: "Manifesto articles",
        covenantEyebrow: "A covenant and an invitation",
        covenantTitle: "Keep the sky open without asking anyone to earn it.",
        covenant: [
          "We will not ask people to earn the dignity they already possess.",
          "We will keep maps useful and protect the space in which a question can be heard.",
          "We will hold children safely without claiming ownership of who they must become.",
          "We will keep direction, consent, and responsibility human when the Wind grows strong.",
          "Ground will have room for craft, care, help, limits, refusal, repair, and rest."
        ],
        invitation: [
          "Perhaps a question has been keeping you company as you read.",
          "What might happen if you gave it a little room?",
          "A sentence, a folded sheet, a conversation. Something small enough to try and real enough to answer back.",
          "If nothing calls today, the page can wait."
        ],
      };

  return (
    <Root className="manifesto-page book-section" data-book-section="manifesto" id={embedded ? "manifesto" : undefined} tabIndex={embedded ? -1 : undefined}>
      <header className="manifesto-intro page-width">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <ChapterHeading className="chapter-title">{copy.title}</ChapterHeading>
        </div>
        <div className="manifesto-opening">
          {copy.opening.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <nav className="manifesto-index" aria-label={copy.index}>
        <ol>
          {articles.map((article) => (
            <li key={article.id}>
              <Link preventScrollReset to={canonicalBookHref(`/manifesto/${article.id}`, locale)}>
                <span>{String(article.number).padStart(2, "0")}</span>
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="manifesto-book">
        {articles.map((article) => <ManifestoSpread key={article.id} article={article} locale={locale} />)}
      </div>

      <section className="covenant-section page-width">
        <p className="eyebrow">{copy.covenantEyebrow}</p>
        <h2>{copy.covenantTitle}</h2>
        <div className="covenant-lines">
          {copy.covenant.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="manifesto-opening">
          <p>{copy.invitation[0]}</p>
          <p className="article-kicker">{copy.invitation[1]}</p>
          <p>{copy.invitation[2]}</p>
          <p>{copy.invitation[3]}</p>
        </div>
      </section>

    </Root>
  );
}

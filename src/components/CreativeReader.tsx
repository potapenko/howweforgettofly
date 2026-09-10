import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { creativeEdition, type ReadingBlock, type ReadingPart } from '../content/creativeEdition';
import { chapterIds, chapterSpots, partIds, partSpots } from '../content/creativePlacements';
import { manifestoArticles } from '../content/manifesto';
import { manifestoArticlesRu } from '../content/manifesto.ru';
import { pageScenesFor } from '../content/pages';
import { useLocale } from '../i18n/LocaleContext';
import { translateCopy } from '../i18n/translate';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTheatre } from '../theatre';
import { EditorialSpot, type EditorialSpotName } from './EditorialSpot';
import { HomeCoverContent, HomeMobileIntro } from './HomeCoverContent';
import { HomeStory } from './HomeStory';
import { SceneObserver } from './SceneObserver';
import type { SceneDefinition } from '../types';
import './creative-reader.css';

function InlineCopy({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((s, i) => s.startsWith('**') ? <strong key={i}>{s.slice(2, -2)}</strong> : s.startsWith('*') ? <em key={i}>{s.slice(1, -1)}</em> : s)}</>;
}
function Block({ block }: { block: ReadingBlock }) {
  if (block.kind === 'list') return <ul>{block.text.split('\n').map((text, i) => <li key={i}><InlineCopy text={text}/></li>)}</ul>;
  if (block.kind === 'quote') return <blockquote><p><InlineCopy text={block.text}/></p></blockquote>;
  return <p><InlineCopy text={block.text}/></p>;
}
function Reading({ part, spot, blue, title, id, number, level = 3 }: { part: ReadingPart; spot: EditorialSpotName; blue?: boolean; title?: string; id?: string; number?: number; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return <section id={id} className={`creative-part${blue ? ' full-bleed-night' : ''}`}>
    <div className="page-width creative-part-grid">
      <div className="creative-part-lead">
        {number ? <span className="creative-number">{String(number).padStart(2, '0')}</span> : null}
        {title || part.title ? <Heading>{title || part.title}</Heading> : null}
        <EditorialSpot name={spot} size="reading" surface={blue ? 'blue' : 'paper'}/>
      </div>
      <div className="creative-prose">
        {part.blocks.map((block, i) => <Fragment key={i}>
          <Block block={block}/>
          {i < part.blocks.length - 1 && (i % 2 === 1 || block.text.length > 500 || block.kind === 'list') ? <EditorialSpot name={spot} size="reading" surface={blue ? 'blue' : 'paper'}/> : null}
        </Fragment>)}
      </div>
    </div>
  </section>;
}
function IllustratedReading({ scene, children, id }: { scene: SceneDefinition; children: React.ReactNode; id?: string }) {
  return <SceneObserver scene={scene} id={id} as="div" className="creative-scene-release">{children}</SceneObserver>;
}

export function CreativeChapter({ index }: { index: number }) {
  const locale = useLocale();
  const chapter = creativeEdition(locale).chapters[index];
  const scenes = pageScenesFor(locale);
  const articles = locale === 'ru' ? manifestoArticlesRu : translateCopy(manifestoArticles, locale);
  const hero = ({4: scenes.adults, 5: scenes.ai, 6: scenes.parents, 7: scenes.atlas, 8: scenes.finalSky} as Record<number, SceneDefinition>)[index];
  const extras: Record<string, SceneDefinition> = {
    '4:1': scenes.adultsGroundGravity,
    '5:3': scenes.aiAuthorship,
    '5:5': scenes.aiCandidateMap,
    '5:6': scenes.aiReturnThreshold,
    '6:2': scenes.parentsHonestModes,
  };
  const blue = index === 0 || index === 3;
  const major = [1, 5, 6, 7, 8].includes(index);
  const firstPart = chapter.parts[0];
  const heading = firstPart.blocks.length
    ? <Reading part={firstPart} spot={chapterSpots[index]} blue={blue} title={chapter.title} level={2} number={index + 1} id={partIds[index][0] === chapterIds[index] ? undefined : partIds[index][0]}/>
    : <header id={partIds[index][0]} className="creative-chapter-heading"><div className="page-width"><span className="creative-number">{String(index + 1).padStart(2, '0')}</span><h2>{chapter.title}</h2><EditorialSpot name={chapterSpots[index]} size="reading"/></div></header>;
  return <section className={`creative-chapter creative-chapter-${index}${major ? " book-section" : ""}`} data-book-section={major ? chapterIds[index] : undefined} id={chapterIds[index]}>
    {hero ? <IllustratedReading scene={hero}>{heading}</IllustratedReading> : heading}
    {chapter.parts.map((part, partIndex) => {
      if (partIndex === 0) return null;
      const id = partIds[index][partIndex];
      const scene = index === 1 && partIndex > 0 ? articles[partIndex - 1].scene : extras[`${index}:${partIndex}`];
      const content = <Reading part={part} spot={partSpots[index][partIndex]} blue={blue} id={scene && index === 1 ? `${id}-reading` : id === chapterIds[index] ? undefined : id} number={index === 1 || (index === 7 && partIndex > 0) ? partIndex : undefined}/>;
      return <Fragment key={id}>{scene ? <IllustratedReading scene={scene} id={index === 1 ? id : undefined}>{content}</IllustratedReading> : content}</Fragment>;
    })}
  </section>;
}

function CreativeCover() {
  const { reducedMotion } = useTheatre();
  const { hash } = useLocation();
  const inlineStory = useMediaQuery('(max-width: 820px)');
  const [released, setReleased] = useState(() => reducedMotion || inlineStory || Boolean(hash && hash !== '#top'));
  useEffect(() => {
    document.documentElement.dataset.homeCoverActive = String(!released && !inlineStory);
    return () => { delete document.documentElement.dataset.homeCoverActive; };
  }, [released, inlineStory]);
  return <section className="home-page book-section" data-book-section="home" id="top">
    <HomeStory reducedMotion={reducedMotion} onReleaseChange={setReleased}>{!inlineStory ? <HomeCoverContent/> : null}</HomeStory>
    {inlineStory ? <HomeMobileIntro showDeck={false}/> : null}
    <CreativeChapter index={0}/>
  </section>;
}

export function CreativeReader() {
  const locale = useLocale();
  return <main className="longform-page creative-reader" aria-label={creativeEdition(locale).title}>
    <CreativeCover/>
    <CreativeChapter index={1}/>
    <section className="book-section" data-book-section="adults" id="adults" tabIndex={-1}>
      <CreativeChapter index={2}/><CreativeChapter index={3}/><CreativeChapter index={4}/>
    </section>
    {[5, 6, 7, 8].map(index => <CreativeChapter index={index} key={index}/>)}
  </main>;
}

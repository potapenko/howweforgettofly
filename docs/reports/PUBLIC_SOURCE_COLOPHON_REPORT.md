# How We Forget to Fly — отчёт о Final Sky и колофоне

**Статус:** complete  
**Дата:** 2026-07-20  
**План:** `../product/PUBLIC_SOURCE_COLOPHON_PLAN.md`

> Paths to local browser output mentioned below are historical QA evidence from
> the prototype workspace and are intentionally not part of this repository.

## Результат

Сайт теперь заканчивается как самостоятельное произведение:

`Cover -> Manifesto -> Parents -> Adults -> AI as Wind -> Atlas -> Final Sky -> Colophon`

- Публичной главы `Source / Источник` больше нет.
- Последний большой разворот стал `The Sky Remains Open / Небо остаётся
  открытым`.
- Влияние книги названо один раз, тихой строкой в самом низу footer.
- У колофона нет ссылки, кнопки, CTA, обложки, пересказа или рекламного
  оформления.
- Большая одностраничная книга, порядок глав, существующая M12-иллюстрация,
  desktop parallax и мобильный inline-flow сохранены.
- Внутренняя provenance-документация не удалялась и не переписывалась.

## Разрешённый copy diff

Ниже полный allowlist содержательных изменений. Других литературных правок не
делалось.

1. `Source / Источник` в основной навигации заменён на `Sky / Небо`.
2. Левая вкладка обложки больше не ведёт к Source; её доступное имя стало
   `Last spread / Последний разворот`.
3. Из конца Манифеста удалён только отдельный source note вместе с внешней
   ссылкой и переходом к Source.
4. Удалена публичная `SourcePage`: provenance cards, archive gap, source URL,
   bibliography-like labels и объяснение границ проекта.
5. Добавлен новый короткий Final Sky:

   | EN | RU |
   |---|---|
   | After the Return | После Возвращения |
   | The Sky Remains Open | Небо остаётся открытым |
   | A route may end without closing the horizon. | Путь может закончиться, не закрывая горизонта. |
   | Some Flights return as a form. Others return as questions changed by the weather. Some Calls go unanswered and settle quietly back on Ground. | Одни Полёты возвращаются формой. Другие — вопросом, который изменила погода. Некоторые Зовы остаются без ответа и тихо возвращаются на Землю. |
   | The page ends here. The Sky does not. | Здесь заканчивается страница. Не небо. |

6. Source-specific title, aria description, scene mechanism and five story
   beats заменены на Final Sky equivalents; используется прежний `M12.webp`.
7. Из footer удалены прежнее about/source-пояснение и Source-ссылка. Добавлен
   один colophon на локаль:

   - EN: `I drew inspiration for this site from On the Boy Who Could Fly, or
     the Path to Freedom, a Russian-language book by Igor Akimov and Viktor
     Klimenko.`
   - RU: `На создание этого сайта меня вдохновила книга Игоря Акимова и Виктора
     Клименко «О мальчике, который умел летать, или путь к свободе».`

8. Старые `/source`, `/ru/source`, `#source` и `#source-*` сохранены только как
   невидимые совместимые aliases к `final-sky`; публичного Source-раздела они
   не создают.

## Golden master

После реализации повторно посчитаны SHA-256 утверждённых EN/RU-файлов и
компонентов. Все значения совпали с baseline до изменений.

| Файл | SHA-256 |
|---|---|
| `src/content/manifesto.ts` | `2474405d533484eecb0c880936f43f389b7a8cd9021e5d902dfb1b2733ec760c` |
| `src/content/manifesto.ru.ts` | `1b3b654f18ab34a4c28225fb5b1aae6f97ddadbf3f51f7d2e9b7d97c19e25c89` |
| `src/content/pathways.ts` | `f1624bfc0fa89b329d68eb4dbc0d5611d34ccba8d3d6b973af36a68855749ce4` |
| `src/content/pathways.ru.ts` | `2e85dc5aa77c6d872db5b14456caa0e57497b8feb704e77a384297b0f7a8e88c` |
| `src/content/atlasReading.ts` | `67fe34c23309e4cf97150676e37a756661265f1307e4f95d699e298a1683f5f6` |
| `src/routes/HomePage.tsx` | `bb645ae950684d5f2f4d711d0e8bdccd1874e06dea3cee88f10c76516fc884f6` |
| `src/routes/PathwayPage.tsx` | `f4272ebe0f41546ad68631d283aa492ce0d13642b5517d57e8187ed69a59d4c0` |
| `src/routes/AtlasPage.tsx` | `b1ee5138a29a0344e03353bc21a91027f8f57b861f3fb3ca8fed7b0cb4ddd602` |

Это подтверждает, что двенадцать статей, covenant, invitation, Parents,
Adults, AI и Atlas не получили скрытого rewrite или общего
`de-ai-writing`-прохода.

## Source, form и link audit

- В production `src` и `dist` отсутствуют старые публичные фразы:
  `Source / about`, `Источник / о проекте`, `Where the question began`,
  `Где начался вопрос`, provenance-label copy, archive-gap copy,
  `source-traces`, `SourcePage` и URL исходной книги.
- Два остаточных совпадения в исходниках находятся только в отрицательных
  тестах: отсутствие `[data-book-section="source"]` и отсутствие внешнего
  source URL.
- Имя авторов и название исходной книги присутствуют в production только в
  `SiteFooter` и соответствующем скомпилированном bundle — то есть в одном
  локализованном colophon.
- В production `src` нет `http://` или `https://` ссылок.
- В production `src` нет `form`, `input`, `textarea`, `select`, `fieldset`,
  form action, `href="#"` или `to="#"`.
- Footer-ссылки ведут к существующим `#manifesto` и `#atlas`; все шесть ссылок
  header ведут к уникальным существующим секциям.
- Кнопки остались только функциональные: mobile navigation, Quiet view и
  пропуск иллюстрации.

## Автоматические проверки

| Проверка | Результат |
|---|---|
| `npm run typecheck` | pass |
| `npm test -- --reporter=dot` | 11 test files, 78 tests passed |
| `npm run build` | pass, 98 modules transformed |
| `git diff --check` | pass |
| golden SHA-256 audit | 8/8 exact matches |
| source/form/empty-link scans | pass с описанным test-only allowlist |

Vite сохранил прежнее неблокирующее предупреждение о размере основного
minified chunk: `590.54 kB` (`186.51 kB` gzip). Оно не связано с этим
редакционным изменением.

## Safari QA

Проверка выполнена в реальном Safari 26.5 на macOS 26.5.1 по локальному URL
`http://127.0.0.1:4174/` с управлением через Computer Use.

### Desktop

- Первый кадр EN: header доступен поверх обложки; видны Manifesto, Parents,
  Adults, Set the Wind, Atlas, Sky, Quiet view и EN/RU.
- Первый кадр RU: русская обложка и те же controls доступны без прокрутки.
- Переход `Sky / Небо` удерживает обычную desktop-story, затем выпускает в
  Final Sky copy.
- EN и RU title, deck, body, document title и active navigation локализованы.
- Final Sky использует чистую M12-композицию без публичного source copy.
- Прямой визит на прежний `/source` проверен: адрес заменяется на
  `/#final-sky`, фокус и scroll приходят к новому финальному развороту.
- В конце находится один colophon; он не является ссылкой или кнопкой.
- Программный focus на заголовке не создаёт ложную рамку в Safari.

### Mobile

Safari Responsive Design Mode: `390 × 844`, `100%`, `2x`.

- Header и hamburger доступны с первого экрана.
- Меню содержит все шесть разделов, Quiet view и EN/RU.
- Переключение RU -> EN сохраняет текущий anchor и закрывает меню.
- Обложка и Final Sky показываются как полноширинные живые inline-иллюстрации.
- На мобильном нет desktop sticky-hold: изображение естественно переходит в
  текст и footer.
- Final Sky title/deck/body не обрезаны и не перекрываются.
- Footer и colophon входят в нормальный поток и читаются на 390 px.
- После визуальной проверки colophon установлен в `0.78rem` с контрастом
  `5.43:1` на `#063d96`: он остаётся второстепенным, но не микроскопическим.

### Motion

- Normal mode проверен при `Quiet view: off`; mobile и desktop illustrations
  сохраняют ambient drift, pointer/scroll parallax и прежнюю амплитуду.
- В Safari включение `Quiet view` меняет toggle в `Value: on`; выключение
  возвращает `Value: off`.
- Автотесты подтверждают `data-motion-disabled`, остановку ambient motion,
  отсутствие scroll listeners в reduced mode и восстановление normal mode.
- Системный `prefers-reduced-motion` и ручной Quiet view используют один
  авторитетный reduced-motion path.

## Accessibility и структура

- В документе один `main` и один `h1`; крупные главы размечены секциями в
  утверждённом порядке.
- Header доступен во время удержания opening story.
- Mobile menu сообщает expanded/collapsed state и закрывается после перехода.
- Quiet view — настоящая toggle button с `aria-pressed`.
- У Final Sky есть локализованные heading, scene description и skip label.
- Колофон — обычный `p`, без интерактивных потомков.
- Safari accessibility tree содержит полный EN/RU маршрут, Final Sky и один
  colophon; форм и полей ввода нет.

## Инструментальная оговорка

Встроенный Browser wrapper в этой сессии не стартовал из-за локальной ошибки
плагина `TypeError: Cannot redefine property: process`; прямой browser
transport также был закрыт. Это не стало заменой визуальной проверки: весь
запрошенный Safari desktop/mobile QA был выполнен через Computer Use, а
структурные состояния дополнительно покрыты тестами и production scans.

## Терминальное состояние

Источник честно назван как одно влияние, но больше не является публичной
главой, рекламируемым объектом или целью маршрута. Произведение заканчивается
собственным образом открытого неба; утверждённая книга до этого финала
сохранена без литературной переработки.

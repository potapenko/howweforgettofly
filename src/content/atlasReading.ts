import { translateCopy } from "../i18n/translate";
import type { Locale } from "../i18n/LocaleContext";

export interface AtlasReadingCard {
  id: string;
  doorway: string;
  title: string;
  invitation: string;
  lens: string;
  boundary: string;
}

const en: readonly AtlasReadingCard[] = [
  {
    "id": "A01",
    "doorway": "Parents",
    "title": "What Grounds Flight?",
    "invitation": "Look for something that supports a child’s attempt without appearing in the finished work.",
    "lens": "A cleared table, a lift home, time someone made available. The visible result rests on an often invisible Ground.",
    "boundary": "Name the support without turning it into a debt the child must repay with success."
  },
  {
    "id": "A02",
    "doorway": "Adults",
    "title": "Problem Finder",
    "invitation": "Think of a question that disappeared when a ready answer arrived.",
    "lens": "The answer may be useful. Put the question beside it and see whether it still has room to change.",
    "boundary": "A question can remain a question; it need not become a project."
  },
  {
    "id": "A03",
    "doorway": "Parents",
    "title": "Instruction or Invitation?",
    "invitation": "Imagine saying no to a gently worded request. What happens next?",
    "lens": "The reply after a refusal often reveals more about a choice than the invitation did.",
    "boundary": "An adult still names necessary duties and acts directly when safety requires it."
  },
  {
    "id": "A04",
    "doorway": "Adults",
    "title": "Template Escape",
    "invitation": "Keep the task familiar and imagine changing one small part.",
    "lens": "A different material or order can reveal which parts of the old way carry the work and which merely came along with it.",
    "boundary": "The familiar version may still be the one you choose."
  },
  {
    "id": "A05",
    "doorway": "AI",
    "title": "AI as Wind",
    "invitation": "Find a sentence the Wind made easier to say.",
    "lens": "Read it for feelings and promises as well as facts. A graceful sentence can carry more certainty than its author has.",
    "boundary": "The sender keeps responsibility for the words they choose."
  },
  {
    "id": "A06",
    "doorway": "Shared",
    "title": "Flight Log",
    "invitation": "Remember one moment when the work surprised you.",
    "lens": "The line you kept was an accident. The conversation turned. A small trace may recall the encounter better than a complete report.",
    "boundary": "A memory needs neither a score nor a record of every step."
  },
  {
    "id": "A07",
    "doorway": "Parents",
    "title": "Creative Climate Map",
    "invitation": "What is easy to reach here, and what requires asking permission every time?",
    "lens": "The position of a box, a crowded afternoon, an adult’s availability: small arrangements can open or narrow the space for making.",
    "boundary": "This view concerns conditions around a child, never a profile of the child."
  },
  {
    "id": "A08",
    "doorway": "Shared",
    "title": "The Return",
    "invitation": "What arrived after you thought the work was finished?",
    "lens": "A reply, a new use for an object, an unexpected difficulty. Return may change the meaning of what you made.",
    "boundary": "An effect on another person deserves attention even when you keep the work private."
  },
  {
    "id": "A09",
    "doorway": "Shared",
    "title": "Ground Landing",
    "invitation": "What would let this attempt release your attention?",
    "lens": "A borrowed tool returned, a promise kept, a note marking where to begin again. Closing can be a small act of care.",
    "boundary": "Rest remains available even when something cannot yet be resolved."
  },
  {
    "id": "A10",
    "doorway": "Adults",
    "title": "Borrowed Map, Living Compass",
    "invitation": "Which inherited rule once helped you, and what has changed around it?",
    "lens": "A map carries the weather of the place where it was drawn. Its useful lines and its old assumptions can be seen separately.",
    "boundary": "Changing a route does not require rejecting the people who showed it to you."
  }
];

const ru: readonly AtlasReadingCard[] = [
  {
    "id": "A01",
    "doorway": "Родителям",
    "title": "Что держит Полёт?",
    "invitation": "Посмотрите, что поддержало детскую попытку, но не попало в готовую работу.",
    "lens": "Освобождённый стол, дорога домой, время, которое кто-то нашёл. Видимый результат стоит на часто невидимой Земле.",
    "boundary": "Назвать помощь — не значит выставить ребёнку счёт, который нужно оплатить успехом."
  },
  {
    "id": "A02",
    "doorway": "Взрослым",
    "title": "Найти вопрос",
    "invitation": "Вспомните вопрос, который исчез, когда появился готовый ответ.",
    "lens": "Ответ может быть полезным. Положите вопрос рядом и посмотрите, осталось ли у него место измениться.",
    "boundary": "Вопрос может остаться вопросом; ему не обязательно становиться проектом."
  },
  {
    "id": "A03",
    "doorway": "Родителям",
    "title": "Указание или приглашение?",
    "invitation": "Представьте, что на мягкую просьбу ответили «нет». Что происходит дальше?",
    "lens": "Реакция на отказ часто говорит о свободе выбора больше, чем само приглашение.",
    "boundary": "Взрослый по-прежнему прямо называет необходимые обязанности и действует, когда этого требует безопасность."
  },
  {
    "id": "A04",
    "doorway": "Взрослым",
    "title": "Выйти из шаблона",
    "invitation": "Оставьте задачу знакомой и представьте изменение одной небольшой детали.",
    "lens": "Другой материал или порядок помогает увидеть, что в привычном способе держит работу, а что просто оказалось рядом.",
    "boundary": "Возможно, в итоге вы выберете прежний вариант."
  },
  {
    "id": "A05",
    "doorway": "ИИ",
    "title": "ИИ как Ветер",
    "invitation": "Найдите фразу, которую с помощью Ветра стало легче произнести.",
    "lens": "Прочитайте её ради чувств и обещаний, а не только фактов. В красивой фразе может быть больше уверенности, чем у автора.",
    "boundary": "За выбранные слова отвечает тот, кто их отправляет."
  },
  {
    "id": "A06",
    "doorway": "Для всех",
    "title": "Журнал Полёта",
    "invitation": "Вспомните момент, когда работа вас удивила.",
    "lens": "Линия, которую вы оставили, вышла случайно. Разговор повернул. Маленький след может напомнить о встрече лучше полного отчёта.",
    "boundary": "Для памяти не нужны ни балл, ни запись каждого шага."
  },
  {
    "id": "A07",
    "doorway": "Родителям",
    "title": "Карта творческого климата",
    "invitation": "До чего здесь легко дотянуться, а для чего каждый раз нужно спрашивать разрешения?",
    "lens": "Место коробки, плотно занятый день, доступность взрослого: небольшие детали могут расширять или сужать пространство для дела.",
    "boundary": "Речь об условиях вокруг ребёнка, а не о его профиле."
  },
  {
    "id": "A08",
    "doorway": "Для всех",
    "title": "Возвращение",
    "invitation": "Что пришло уже после того, как работа казалась законченной?",
    "lens": "Ответ, новое применение вещи, неожиданная трудность. Возвращение может изменить смысл сделанного.",
    "boundary": "Последствия для другого человека требуют внимания, даже если сама работа остаётся личной."
  },
  {
    "id": "A09",
    "doorway": "Для всех",
    "title": "Посадка на Землю",
    "invitation": "Что позволит этой попытке отпустить ваше внимание?",
    "lens": "Возвращённый инструмент, выполненное обещание, пометка о месте остановки. Завершение может быть небольшим делом заботы.",
    "boundary": "Отдых остаётся возможным, даже когда что-то пока не удаётся разрешить."
  },
  {
    "id": "A10",
    "doorway": "Взрослым",
    "title": "Чужая карта, живой Компас",
    "invitation": "Какое унаследованное правило когда-то помогало вам и что изменилось вокруг него?",
    "lens": "Карта несёт погоду места, в котором её рисовали. Полезные линии и старые допущения можно рассмотреть по отдельности.",
    "boundary": "Изменить маршрут — не значит отвергнуть людей, которые его показали."
  }
];

export function atlasReading(locale: Locale) {
  return locale === "ru" ? ru : translateCopy(en, locale);
}

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
  { id: "A01", doorway: "Parents", title: "What Grounds Flight?", invitation: "After an ordinary family moment, separate what the adult must hold from what the child can genuinely author.", lens: "Safety, care, time, shared obligations, and consent can stay firm without quietly prescribing the result.", boundary: "A clearer frame is not a score for either the parent or the child." },
  { id: "A02", doorway: "Adults", title: "Problem Finder", invitation: "Notice one irritation, care, curiosity, or mismatch before turning it into a project.", lens: "Attention may become a question, an obligation, a refusal, or nothing that needs action today.", boundary: "Not every discomfort is a calling, and no question has to become a life purpose." },
  { id: "A03", doorway: "Parents", title: "Instruction or Invitation?", invitation: "Listen to one sentence and name its honest mode: instruction, invitation, negotiation, warning, or limit.", lens: "Gentle grammar does not turn a fixed requirement into a free choice.", boundary: "The aim is honest authority, not the largest possible amount of choice." },
  { id: "A04", doorway: "Adults", title: "Template Escape", invitation: "Choose one inherited routine and imagine a small, reversible variation.", lens: "A borrowed form can be kept, adapted, questioned, or left without condemning the life built around it.", boundary: "Change is not automatically brave, original, or necessary." },
  { id: "A05", doorway: "AI", title: "AI as Wind", invitation: "Name the human purpose first, then give the tool one bounded role.", lens: "AI may mirror, generate, question, criticise, assist with craft, or simulate possibilities; it does not inherit the Compass.", boundary: "Consent, evidence, adoption, and consequence remain human responsibilities." },
  { id: "A06", doorway: "Shared", title: "Flight Log", invitation: "Look back at one attempt without converting it into a performance report.", lens: "Notice the Call, conditions, form, contact, Return, and landing—including where the cycle stopped.", boundary: "The record does not calculate talent, altitude, productivity, or identity." },
  { id: "A07", doorway: "Parents", title: "Creative Climate Map", invitation: "Look at the conditions around a child rather than trying to measure creativity inside the child.", lens: "Time, materials, permission, limits, repair, solitude, conversation, and rest all shape what can emerge.", boundary: "This is a map of adult-held conditions, not a child profile." },
  { id: "A08", doorway: "Shared", title: "The Return", invitation: "Ask what came back after a form met material, place, or another person.", lens: "Return may be learning, usefulness, surprise, privacy, repair, silence, or an honest ending.", boundary: "Audience response is information, not a measure of human worth." },
  { id: "A09", doorway: "Shared", title: "Ground Landing", invitation: "Let an attempt become smaller, pause, ask for help, or end.", lens: "Ground includes craft, care, obligations, maintenance, limits, routine, and rest.", boundary: "Stopping is not visual or moral demotion." },
  { id: "A10", doorway: "Adults", title: "Borrowed Map, Living Compass", invitation: "Place an inherited route beside the life and evidence that exist now.", lens: "A map can remain useful while its assumptions, authorship, blind spots, and current cost become visible.", boundary: "Questioning a route does not require rejecting everyone who handed it to you." },
];

const ru: readonly AtlasReadingCard[] = [
  { id: "A01", doorway: "Родителям", title: "Что держит Полёт?", invitation: "После обычной семейной ситуации отделите то, за что отвечает взрослый, от того, что ребёнок действительно может выбрать сам.", lens: "Безопасность, забота, время, общие обязанности и согласие могут оставаться твёрдыми, не предписывая заранее результат.", boundary: "Более ясная рамка — не оценка ни родителя, ни ребёнка." },
  { id: "A02", doorway: "Взрослым", title: "Найти вопрос", invitation: "Заметьте раздражение, заботу, любопытство или несоответствие до того, как превратить его в проект.", lens: "Внимание может стать вопросом, обязанностью, отказом — или ничем, что требует действия сегодня.", boundary: "Не всякий дискомфорт является Зовом, и ни один вопрос не обязан становиться смыслом жизни." },
  { id: "A03", doorway: "Родителям", title: "Указание или приглашение?", invitation: "Послушайте одну фразу и честно назовите её режим: указание, приглашение, переговоры, предупреждение или граница.", lens: "Мягкая формулировка не превращает обязательное требование в свободный выбор.", boundary: "Цель — честно назвать власть взрослого, а не предложить как можно больше вариантов." },
  { id: "A04", doorway: "Взрослым", title: "Выйти из шаблона", invitation: "Выберите одну унаследованную привычку и представьте небольшое обратимое изменение.", lens: "Чужую форму можно сохранить, приспособить, пересмотреть или оставить — не обесценивая жизнь, которая вокруг неё сложилась.", boundary: "Перемены сами по себе не делают человека смелым, оригинальным или правым." },
  { id: "A05", doorway: "ИИ", title: "ИИ как Ветер", invitation: "Сначала назовите человеческую цель, а затем дайте инструменту одну ограниченную роль.", lens: "ИИ может отражать, предлагать варианты, задавать вопросы, критиковать, помогать с ремеслом или моделировать возможности; Компас ему не принадлежит.", boundary: "За согласие, проверку, окончательный выбор и последствия отвечает человек." },
  { id: "A06", doorway: "Для всех", title: "Журнал Полёта", invitation: "Оглянитесь на одну попытку, не превращая её в отчёт об эффективности.", lens: "Заметьте Зов, условия, форму, встречу с реальностью, Возвращение и посадку — в том числе место, где цикл остановился.", boundary: "Такая запись не вычисляет талант, высоту, продуктивность или тип личности." },
  { id: "A07", doorway: "Родителям", title: "Карта творческого климата", invitation: "Посмотрите на условия вокруг ребёнка вместо того, чтобы измерять творчество внутри него.", lens: "Время, материалы, разрешение, границы, возможность исправить, одиночество, разговор и отдых влияют на то, что может появиться.", boundary: "Это карта условий, за которые отвечает взрослый, а не профиль ребёнка." },
  { id: "A08", doorway: "Для всех", title: "Возвращение", invitation: "Спросите, что вернулось после встречи созданной формы с материалом, местом или другим человеком.", lens: "Вернуться могут опыт, польза, удивление, тишина, необходимость исправить, право на приватность или честный конец.", boundary: "Реакция аудитории — информация, а не мера человеческой ценности." },
  { id: "A09", doorway: "Для всех", title: "Посадка на Землю", invitation: "Позвольте попытке стать меньше, остановиться, попросить помощи или закончиться.", lens: "Земля — это ремесло, забота, обязанности, поддержание быта, границы, рутина и отдых.", boundary: "Остановка не делает человека ни хуже, ни менее достойным." },
  { id: "A10", doorway: "Взрослым", title: "Чужая карта, живой Компас", invitation: "Положите унаследованный маршрут рядом с жизнью и фактами, которые существуют сегодня.", lens: "Карта может оставаться полезной, пока видны её допущения, авторство, слепые зоны и нынешняя цена.", boundary: "Пересмотреть маршрут — не значит отвергнуть всех, кто когда-то его показал." },
];

export function atlasReading(locale: Locale) {
  return locale === "ru" ? ru : en;
}

/**
 * Editorial content for the three life paths.
 *
 * The Atlas experiences are the site's ten full visitor-authored tools. This
 * registry keeps the larger foundations visible around those tools: household
 * scenes, adult scenes, voluntary practices, small cards, AI roles, and drift
 * repairs. An Atlas-backed practice carries its EXP id and route; a
 * supplementary card remains deliberately editorial and non-scored.
 */

export type PathwayId = "parent" | "adult" | "ai";

export type AtlasExperienceId =
  | "EXP-01"
  | "EXP-02"
  | "EXP-03"
  | "EXP-04"
  | "EXP-05"
  | "EXP-06"
  | "EXP-07"
  | "EXP-08"
  | "EXP-09"
  | "EXP-10";

export interface EditorialCard {
  id: string;
  title: string;
  body: string;
  detail?: string;
  prompt?: string;
  repair?: string;
  items?: readonly string[];
}

export interface PathwaySection {
  id: string;
  eyebrow: string;
  title: string;
  plain: string;
  paragraphs: readonly string[];
  cards?: readonly EditorialCard[];
}

export interface PracticeCard {
  id: string;
  title: string;
  summary: string;
  action: string;
  completion: string;
  guardrail: string;
  time?: string;
  prompts?: readonly string[];
  atlasExperienceId?: AtlasExperienceId;
  href?: string;
}

export interface SceneCard {
  id: string;
  title: string;
  situation: string;
  unhelpfulPattern?: string;
  groundedResponse: string;
  principle: string;
  steps?: readonly string[];
}

export interface SmallEditorialCard {
  id: string;
  number: number;
  phase: string;
  prompt: string;
}

export interface CardDeck {
  id: string;
  title: string;
  introduction: string;
  guardrail: string;
  cards: readonly SmallEditorialCard[];
}

export interface RouteLink {
  label: string;
  href: string;
  description: string;
  kind: "primary" | "atlas" | "cross-path" | "reference";
}

export interface PathwayDefinition {
  id: PathwayId;
  route: string;
  eyebrow: string;
  title: string;
  lede: string;
  plainThesis: string;
  readerOutcome: string;
  nextStep: string;
  sections: readonly PathwaySection[];
  practices: readonly PracticeCard[];
  sceneCards: readonly SceneCard[];
  cardDecks: readonly CardDeck[];
  guardrails: readonly string[];
  covenant: readonly string[];
  routeLinks: readonly RouteLink[];
}

export interface WindRole {
  id:
    | "mirror"
    | "generator"
    | "interlocutor"
    | "critic"
    | "craft-aid"
    | "simulator";
  title:
    | "Mirror"
    | "Generator"
    | "Interlocutor"
    | "Critic"
    | "Craft aid"
    | "Simulator";
  usefulContribution: string;
  nonNeutralPull: string;
  humanDecision: string;
  starterPrompt: string;
}

export const windRoles = [
  {
    id: "mirror",
    title: "Mirror",
    usefulContribution:
      "Reflects a draft, summary, tension, or repeated pattern back to the maker.",
    nonNeutralPull:
      "A tidy reflection can erase ambiguity or make one interpretation feel definitive.",
    humanDecision:
      "Decide whether the reflection is recognisable, what it leaves out, and whether it changes the Call.",
    starterPrompt:
      "Reflect my current position in no more than five points. Mark interpretations you add. Do not name my true purpose. End with one question I may decline.",
  },
  {
    id: "generator",
    title: "Generator",
    usefulContribution:
      "Produces materially different options, examples, questions, structures, or forms.",
    nonNeutralPull:
      "Abundance can replace choosing, while familiar patterns quietly define the option set.",
    humanDecision:
      "Choose which options deserve attention, what criteria matter, and whether to choose any.",
    starterPrompt:
      "Offer five materially different responses to this Call. State each assumption. Include doing nothing now. Do not rank them until I provide criteria.",
  },
  {
    id: "interlocutor",
    title: "Interlocutor",
    usefulContribution:
      "Asks questions, rehearses a conversation, or helps articulate an unfinished thought.",
    nonNeutralPull:
      "Dialogue can become an agreeable loop or give fluency the aura of understanding.",
    humanDecision:
      "Decide which question is real, when another human is needed, and when to end the exchange.",
    starterPrompt:
      "Ask one clarifying question at a time. Separate what I observed, assumed, and care about. Do not turn my answer into a diagnosis or mission.",
  },
  {
    id: "critic",
    title: "Critic",
    usefulContribution:
      "Tests assumptions, identifies gaps, checks stated criteria, and offers counterarguments.",
    nonNeutralPull:
      "Confident criticism can become a moral verdict, imported taste, or endless revision.",
    humanDecision:
      "Choose legitimate criteria, decide what criticism to adopt, and decide when the form is ready enough.",
    starterPrompt:
      "Test this form against my stated criteria. Separate factual gaps, ethical concerns, craft choices, and taste. Suggest repairs without scoring me or the work.",
  },
  {
    id: "craft-aid",
    title: "Craft aid",
    usefulContribution:
      "Helps edit, translate, restructure, format, prototype, calculate, or execute a chosen technique.",
    nonNeutralPull:
      "Friction can vanish before the maker learns which part of the craft matters to this attempt.",
    humanDecision:
      "Keep the intended effect, acceptable method, verification standard, and final adoption human.",
    starterPrompt:
      "Help with this bounded craft operation. Preserve the decisions I name. Flag changes to meaning, consent, attribution, or audience.",
  },
  {
    id: "simulator",
    title: "Simulator",
    usefulContribution:
      "Generates plausible questions, edge cases, scenarios, or audience reactions before real contact.",
    nonNeutralPull:
      "A plausible simulation can be mistaken for evidence, consent, lived experience, or feedback.",
    humanDecision:
      "Name what still requires reality and whose real voice must still be heard.",
    starterPrompt:
      "Generate plausible reactions from the stated context. Label them hypotheses, not evidence. Name what only a real person, source, or trial can answer.",
  },
] as const satisfies readonly WindRole[];

const parentSections = [
  {
    id: "present-child",
    eyebrow: "The starting relation",
    title: "The child is not the project",
    plain:
      "A child is a person in the room now, not the first draft of a future adult.",
    paragraphs: [
      "Creativity is not a trait for a parent to extract. Flight is a moment of noticing, choosing, forming, meeting reality, and taking part in what follows.",
      "The parent becomes a Keeper of Conditions: holding safety, time, materials, limits, rest, craft, conversation, and gradual responsibility while leaving the child's question and form alive.",
    ],
  },
  {
    id: "dignity-responsibility",
    eyebrow: "A productive asymmetry",
    title: "Equal dignity, unequal responsibility",
    plain:
      "Parent and child have equal human worth; the adult still carries more power and duty.",
    paragraphs: [
      "The adult holds safety, care, money, transport, permissions, and consequences the child cannot reasonably carry. Greater duty does not create ownership of the child's interests, pace, style, meaning, or future.",
      "The adult holds the frame. The child can author a form inside it. When no choice exists, the adult names the requirement instead of disguising it as freedom.",
    ],
  },
  {
    id: "keeper-conditions",
    eyebrow: "What a Keeper keeps",
    title: "Conditions support many answers",
    plain:
      "Good conditions do not guarantee a result; they make making, refusal, help, and rest more possible.",
    paragraphs: [
      "A condition is not a recipe for a creative child. It is a concrete part of the Ground that an adult can hold honestly.",
    ],
    cards: [
      { id: "safety", title: "Safety", body: "Name the hazard and act directly; reopen choice when it becomes real again." },
      { id: "time", title: "Time", body: "Protect unhurried time without turning every free hour into enrichment." },
      { id: "rest", title: "Rest and energy", body: "Treat tiredness as information, not a verdict. Rest belongs to Ground." },
      { id: "materials", title: "Materials and access", body: "Make access real without implying that more supplies must produce more creativity." },
      { id: "craft", title: "Craft and instruction", body: "Teach the safe or useful map, then return destination and whole action to the maker." },
      { id: "boundaries", title: "Boundaries", body: "State limits around cost, noise, privacy, consent, and shared belongings plainly." },
      { id: "conversation", title: "Conversation", body: "Make questions and help available without demanding explanation or commentary." },
      { id: "return", title: "Consequences and Return", body: "Meet effects through repair, learning, return, sharing, privacy, or an honest ending—not compulsory publicity." },
    ],
  },
  {
    id: "honest-modes",
    eyebrow: "Before choosing a tone",
    title: "Name the mode honestly",
    plain:
      "Gentle wording does not make an instruction into an invitation, and a question is not open if only yes can survive.",
    paragraphs: [
      "Choose the mode that matches the adult's real responsibility and the amount of choice actually available.",
    ],
    cards: [
      { id: "instruction", title: "Direct instruction", body: "Use for immediate safety, care, law, or an unavoidable responsibility. Explain afterward and restore choice where possible." },
      { id: "boundary", title: "Boundary with choice", body: "Name the fixed obligation and offer only workable ways to meet it." },
      { id: "invitation", title: "Genuine invitation", body: "Use only when refusal will not cost affection, status, or future access." },
      { id: "co-exploration", title: "Co-exploration", body: "Learn together while the adult continues to hold adult risk and responsibility." },
      { id: "witness", title: "Witnessing and stepping back", body: "Stay available without adding another suggestion or abandoning the conditions." },
    ],
  },
  {
    id: "family-cycle",
    eyebrow: "One small family Flight",
    title: "A map, not a compliance system",
    plain:
      "Call, Compass, Lift, Making, Flight, Return, and Ground can move backward, become smaller, or end.",
    paragraphs: [
      "A family may notice a possible question, name intention and limits, check present capacity, give the question a small form, let it meet reality, answer what happened, and close or rest.",
      "No cycle today is a valid result. Less Lift never means less worth.",
    ],
  },
  {
    id: "refusal-feedback",
    eyebrow: "No altitude score",
    title: "Refusal and feedback preserve personhood",
    plain:
      "A child may refuse an optional activity, and feedback can meet a form without appointing a kind of child.",
    paragraphs: [
      "For unavoidable obligations, refusal may not cancel what must happen, but it can still inform how. Ending a chosen project can remain separate from returning borrowed items or repairing effects.",
      "Observe the form, ask about intention, name the encounter, ask what response is wanted, and leave revision with the maker when safety permits.",
    ],
  },
  {
    id: "family-wind",
    eyebrow: "AI in the family",
    title: "Wind, not wings or pilot",
    plain:
      "AI may support a bounded operation; it does not judge the child, choose a worthy future, or absorb responsibility.",
    paragraphs: [
      "Name the human question first, give AI one role, keep purpose and adoption human, protect privacy as an adult duty, never ask it to profile the child, and name material assistance simply.",
      "Where choice is real, a child may choose a non-AI route. Using Wind is not lesser authorship; refusing it is not moral purity.",
    ],
  },
  {
    id: "care-gravity",
    eyebrow: "Repair, not parental shame",
    title: "When care becomes Gravity",
    plain:
      "Gravity appears when one route becomes unquestioned destiny; every family can notice and repair it.",
    paragraphs: [
      "The aim is not perfect parenting. It is to make responsibility visible and repair the next part that can be repaired.",
    ],
    cards: [
      { id: "imagined-child", title: "The imagined child", body: "A future identity replaces the child present now.", repair: "Describe what is happening now and remove future identity as prize or threat." },
      { id: "hidden-brief", title: "The hidden brief", body: "Make anything secretly means make my answer.", repair: "Name the constraint; call a required form instruction and accept surprise when it is truly open." },
      { id: "forced-takeoff", title: "Forced takeoff", body: "Creativity, enthusiasm, or sharing becomes compulsory performance.", repair: "Restore no, not now, or differently; separate the obligation from optional Flight." },
      { id: "safety-expands", title: "Safety covers every uncertainty", body: "Mess, failure, judgment, or wasted money is renamed danger.", repair: "Name the concrete risk, hold that boundary, and reopen choices outside it." },
      { id: "absent-keeper", title: "The absent Keeper", body: "It is your choice transfers adult burdens to the child.", repair: "Take back adult responsibility for risk, cost, time, cleanup, and consequences." },
      { id: "altitude-scoring", title: "Altitude scoring", body: "Originality, speed, awards, visibility, or output becomes a measure of a person.", repair: "Discuss the form and effects specifically; remove labels and leaderboards." },
      { id: "map-sky", title: "The map becomes the sky", body: "One method or example becomes the only legitimate route.", repair: "Teach what the map is for, then return whole action and safe adaptation to the child." },
      { id: "explanation-interrupts", title: "Explanation interrupts action", body: "Questions and corrections arrive before the child can complete a movement.", repair: "Ask when input is wanted; offer one relevant technique and return to the whole." },
      { id: "ground-shame", title: "Ground shame", body: "Care, cleanup, repetition, boredom, or rest is treated as lesser life.", repair: "Close, care, and rest without promising a more productive tomorrow." },
      { id: "return-performance", title: "Return becomes performance", body: "Public display is used to prove the activity mattered.", repair: "Ask permission and offer private or addressed Return without making visibility a fee." },
      { id: "wind-drift", title: "Wind drift", body: "AI's polished form arrives before a human direction and becomes the route.", repair: "Restate the human question, tool role, and remaining choices; keep, change, or discard." },
    ],
  },
] as const satisfies readonly PathwaySection[];

const parentPractices = [
  {
    id: "parent-what-grounds-flight",
    title: "What Grounds Flight?",
    summary:
      "Separate a recurring conflict into visible facts, adult responsibility, possible Gravity, a fixed frame, and an open part.",
    action:
      "Write one next-time sentence naming what the adult must hold and what the child can truly author.",
    completion: "One specific, revisable Ground agreement exists—or the distinction remains honestly unresolved.",
    guardrail:
      "Use after the moment, never instead of immediate safety action; the result is not a family diagnosis or score.",
    prompts: ["What I must hold…", "What the child can truly author…"],
    atlasExperienceId: "EXP-01",
    href: "/atlas/what-grounds-flight",
  },
  {
    id: "parent-instruction-invitation",
    title: "Instruction or Invitation?",
    summary:
      "Test one familiar sentence against what is required, why it is required, what is open, and whether no can survive.",
    action: "Rewrite the sentence in the honest mode and name the behaviour that will make the openness real.",
    completion: "The words and the actual distribution of choice agree.",
    guardrail:
      "Do not soften an unavoidable instruction into manipulation or weaken a necessary safety boundary.",
    prompts: ["What is required?", "Why?", "What is genuinely open?", "Can no survive?"],
    atlasExperienceId: "EXP-03",
    href: "/atlas/instruction-or-invitation",
  },
  {
    id: "parent-creative-climate-map",
    title: "Creative Climate Map",
    summary:
      "Look at safety, time, rest, materials, freedom of form, craft, conversation, and possible Return for one attempt.",
    action: "Use ordinary condition words, then choose at most one support worth changing—or none.",
    completion: "One condition is clearer without producing a total, profile, or verdict.",
    guardrail:
      "Map one situation, never the child, parent, or family. The child may disagree and may not want the attempt.",
    atlasExperienceId: "EXP-07",
    href: "/atlas/creative-climate-map",
  },
  {
    id: "parent-one-small-flight",
    title: "One Small Flight",
    summary:
      "Help a real Call become one reversible form: a rough model, question, rearrangement, test, or conversation.",
    action: "Agree on one safety boundary, one stop point, and one possible Return before beginning.",
    completion: "The small form meets what it needs to meet, or the family chooses not to proceed.",
    guardrail:
      "The small form is not bait for a larger programme and does not create a debt to continue.",
  },
  {
    id: "parent-ground-landing",
    title: "Ground Landing",
    summary:
      "Close, pause, care, repair, ask for help, or rest at the end of a family attempt.",
    action:
      "Name only what should be put away, returned, cleaned, kept safely, repaired, helped, or left undecided.",
    completion: "The present cycle no longer demands hidden attention.",
    guardrail: "Close with no next project required; rest is not a productivity technique.",
    atlasExperienceId: "EXP-09",
    href: "/atlas/ground-landing",
  },
] as const satisfies readonly PracticeCard[];

const parentScenes = [
  {
    id: "parent-scene-01",
    title: "Choosing an activity",
    situation: "A parent notices a recurring interest and can offer access, time, or a trial.",
    unhelpfulPattern: "Assign a future identity, enrol first, and call the decision gratitude later.",
    groundedResponse:
      "Name what was observed, offer real options including open time, and explain cost, schedule, and commitment before deciding.",
    principle: "The adult holds money and logistics; a trial is not a contract for a future self.",
  },
  {
    id: "parent-scene-02",
    title: "Starting a home project",
    situation: "Materials and forty minutes are available before a shared table is needed.",
    unhelpfulPattern: "Say make anything while requiring the example from a video.",
    groundedResponse:
      "Offer several genuinely different forms, the child's own idea, or nothing today; name cleanup and offer one technique or company.",
    principle: "The material and boundary are real; the example remains a map, not the hidden answer.",
  },
  {
    id: "parent-scene-03",
    title: "Refusing to continue",
    situation: "A child wants to stop a chosen project that still touches borrowed pieces or a collaborator.",
    unhelpfulPattern: "Treat stopping as evidence of weak character.",
    groundedResponse:
      "Ask whether this is pause, different version, or ending; help meet the limited remaining responsibility.",
    principle: "Ending a form and meeting a consequence are different decisions.",
  },
  {
    id: "parent-scene-04",
    title: "A tool becomes unsafe",
    situation: "A fastening has come loose and the tool can hurt someone.",
    unhelpfulPattern: "Use a false invitation while expecting immediate compliance.",
    groundedResponse:
      "Stop the action directly, make the tool safe, then reopen continue, demonstration, another tool, or ending.",
    principle: "The adult owns the safety duty; choice returns when it becomes real.",
  },
  {
    id: "parent-scene-05",
    title: "Homework or another unavoidable task",
    situation: "A task must be completed or submitted.",
    unhelpfulPattern: "Turn compliance into a judgment about being responsible.",
    groundedResponse:
      "Name the obligation and offer honest choices of order, environment, break, company, or clarification.",
    principle: "An obligation can contain authorship without pretending to be a Call.",
  },
  {
    id: "parent-scene-06",
    title: "Paint, noise, and a shared room",
    situation: "An expressive activity affects equipment, surfaces, noise, or other people.",
    unhelpfulPattern: "Romanticise mess or ban the whole medium because uncertainty feels unsafe.",
    groundedResponse:
      "Name the mat, water, noise, and cleanup boundaries; leave picture and method open; offer dry material or no project.",
    principle: "Ground gives imagination somewhere to land.",
  },
  {
    id: "parent-scene-07",
    title: "Responding to a drawing",
    situation: "A child offers or leaves visible a particular form.",
    unhelpfulPattern: "Use praise to appoint the child as a natural artist.",
    groundedResponse:
      "Describe a visible choice, ask about intention, and ask whether the child wants noticing, questions, suggestions, or a witness.",
    principle: "Warmth can meet this form without assigning a role the child must keep performing.",
  },
  {
    id: "parent-scene-08",
    title: "A fort occupies shared space",
    situation: "A child-authored construction blocks a walkway or uses another person's belongings.",
    unhelpfulPattern: "Let the creative project erase consent and shared access.",
    groundedResponse:
      "Keep design open while naming the walkway and permission boundaries; adapt, relocate, or close if no version fits.",
    principle: "Authorship does not cancel consent.",
  },
  {
    id: "parent-scene-09",
    title: "Using AI for a story",
    situation: "AI could suggest titles, ask plot questions, or help check spelling.",
    unhelpfulPattern: "Ask AI to make it better—or claim any AI help makes the story unreal.",
    groundedResponse:
      "Name the child's purpose, offer one bounded role or no AI, keep private information out, and make adoption visible.",
    principle: "The child keeps direction; the adult keeps the privacy duty.",
  },
  {
    id: "parent-scene-10",
    title: "The parent has no Lift",
    situation: "The adult lacks enough attention or energy for the planned activity.",
    unhelpfulPattern: "Push through to perform availability and become unsafe or resentful.",
    groundedResponse:
      "Name the limit and offer a smaller paper version, preparation, help, another time, or stopping.",
    principle: "The parent is part of the conditions; low Lift changes the attempt, not anyone's worth.",
  },
  {
    id: "parent-scene-11",
    title: "Sharing the result",
    situation: "A parent wants to show, post, or narrate a child's form.",
    unhelpfulPattern: "Treat public praise as proof that the activity mattered.",
    groundedResponse:
      "Offer privacy, one person, a specific question, or wider sharing; do not post without agreement.",
    principle: "Return can be real without compulsory publicity; actual effects still receive care.",
  },
] as const satisfies readonly SceneCard[];

const adultSections = [
  {
    id: "invariant",
    eyebrow: "Before any practice",
    title: "Flight is an event, not a kind of person",
    plain:
      "Output, originality, income, visibility, refusal, help, and rest never decide human worth.",
    paragraphs: [
      "A form may succeed, fail, or cause harm. It can be criticised, repaired, or ended. None of those outcomes creates a ladder of more-human and less-human people.",
      "A long season on Ground is not a lesser life, and assistance does not dilute authorship.",
    ],
  },
  {
    id: "purpose",
    eyebrow: "A direction is enough",
    title: "Purpose is a practice, not a hidden assignment",
    plain:
      "Purpose is a way of meeting what is unfinished, not one mission buried inside you.",
    paragraphs: [
      "Notice what asks for attention; decide whether it is yours; choose direction and boundary; give it a form; meet reality; receive what happened; return; and land.",
      "A purpose may last ten minutes or a decade, appear in work or care, remain private, or end honestly as facts and relationships change.",
    ],
  },
  {
    id: "present-life",
    eyebrow: "The available material",
    title: "Begin from the life you already have",
    plain:
      "The present body, ties, skills, obligations, and energy are the starting material, not an obstacle to real life.",
    paragraphs: [
      "This does not make every commitment sacred. It means seeing what is real clearly enough to choose within it, negotiate, ask for help, or responsibly change it.",
      "Maintenance, care, administration, recovery, and sleep are part of Ground. They need no poetic title to deserve respect.",
    ],
  },
  {
    id: "ground-gravity",
    eyebrow: "Two different pulls",
    title: "Ground is not Gravity",
    plain:
      "Ground is the reality that supports and limits an attempt; Gravity is an unexamined route hardened into destiny.",
    paragraphs: [
      "Money, care, craft, work, AI, and rest can each be honest conditions. They become Gravity language when one response is made morally compulsory and alternatives can no longer be discussed.",
      "Some doors are materially locked. The honest movement may be to name the door, find company, seek qualified help, or stop calling it a personal failure.",
    ],
    cards: [
      { id: "money", title: "Money", body: "Reliable income may be necessary now.", detail: "Gravity says serious adults may make only what has a market." },
      { id: "care", title: "Care", body: "Choices affect people who depend on us.", detail: "Gravity says care erases every question of one's own." },
      { id: "craft", title: "Craft", body: "A form may require repetition and skills not yet learned.", detail: "Gravity says not being exceptional immediately proves the question was false." },
      { id: "work", title: "Work", body: "Some tasks belong to an accepted or currently unavoidable agreement.", detail: "Gravity says a role is the whole truth about what one may want." },
      { id: "ai", title: "AI", body: "A tool can make some versions faster.", detail: "Gravity says machine capability makes human attention and judgment worthless." },
      { id: "rest", title: "Rest", body: "Capacity can be low and recovery necessary.", detail: "Gravity says rest must be earned by future output." },
    ],
  },
  {
    id: "maps",
    eyebrow: "Guidance without surrender",
    title: "Maps, scaffolds, and authored direction",
    plain:
      "Outside knowledge can protect and teach; authorship does not require purity from influence.",
    paragraphs: [
      "A borrowed map shows a route. A temporary scaffold supports a named part and can be reviewed. An authored direction is one you can presently choose, explain, revise, and answer for.",
      "Ask who drew the route, what it enables, what it hides, who is affected, and which part to keep, adapt, refuse, or revisit.",
    ],
  },
  {
    id: "adult-cycle",
    eyebrow: "A revisable arc",
    title: "Call → Compass → Lift → Making → Flight → Return → Ground",
    plain:
      "The cycle is a set of questions with doors backward and outward, not a productivity pipeline.",
    paragraphs: [
      "Notice without obeying. Choose without demanding certainty. Size the attempt to real capacity. Make the smallest honest form. Let it meet something beyond intention. Meet effects. Close, care, and restore.",
      "A ten-minute correction, a refusal, a private form, or an intentionally incomplete cycle can be real.",
    ],
  },
  {
    id: "craft",
    eyebrow: "Intention meets resistance",
    title: "Craft, error, repetition, and boredom belong",
    plain:
      "Learning how material behaves does not make imagination less free.",
    paragraphs: [
      "Repetition is not the enemy of originality. Boredom is not proof that a route is wrong. Difficulty is not proof that it is right. Error is information about an encounter, not a maker's verdict.",
      "Ask whether there is a small answerable form, whether contact may change it, who it may affect, and whether you can revise, repair, stop, or keep it private.",
    ],
  },
] as const satisfies readonly PathwaySection[];

const adultPractices = [
  {
    id: "adult-problem-finder",
    title: "Problem Finder",
    summary: "Turn one noticed mismatch into a possible question—or an honest refusal.",
    time: "10 minutes",
    action: "Finish: I notice…, I care because…, A possible question is…. Then answer yes, no, not now, or differently.",
    completion: "The mismatch becomes one possible question or a complete non-answer.",
    guardrail: "Pain, fear, and irritation are not automatically Calls. Safety, rest, or help may come first.",
    atlasExperienceId: "EXP-02",
    href: "/atlas/problem-finder",
  },
  {
    id: "adult-borrowed-map",
    title: "Borrowed Map, Living Compass",
    summary: "Examine one inherited rule without rejecting expertise, care, or commitment by reflex.",
    time: "15 minutes",
    action: "Name who gave the map, what it once carried, what it costs now, then choose keep, adapt, borrow temporarily, or refuse for one situation.",
    completion: "The next use of the map is conscious and revisable.",
    guardrail: "Outside origin alone does not make a map Gravity.",
    atlasExperienceId: "EXP-10",
    href: "/atlas/borrowed-map-living-compass",
  },
  {
    id: "adult-template-escape",
    title: "Template Escape",
    summary: "Change one variable in a recurring task and observe what the variation reveals.",
    time: "20 minutes",
    action: "Change order, material, audience, scale, question, location, or definition of done once.",
    completion: "One reversible variation has met reality.",
    guardrail: "Difference is not automatically improvement, and routine is not automatically Gravity.",
    atlasExperienceId: "EXP-04",
    href: "/atlas/template-escape",
  },
  {
    id: "adult-one-day-form",
    title: "One-Day Form",
    summary: "Give one question a small form that reality can answer.",
    time: "20–60 minutes; never more than one day",
    action: "Choose a note, sketch, repair, request, conversation, arrangement, boundary, small test, or decision; define the stop point first.",
    completion: "The form is encounterable, not perfect.",
    guardrail: "This is not a compulsory first instalment of a large project.",
  },
  {
    id: "adult-boring-hinge",
    title: "The Boring Hinge",
    summary: "Practise the small craft operation on which a larger action turns.",
    time: "15 minutes",
    action: "Practise one hinge slowly, then perform or view the whole action once and keep only what helps it.",
    completion: "Technique has returned to the living form.",
    guardrail: "Mastery is not a moral rank, and exhaustion is not disciplined practice.",
  },
  {
    id: "adult-flight-log",
    title: "Flight Log",
    summary: "Remember one cycle without turning it into a personality label, surveillance record, or productivity report.",
    time: "5 minutes",
    action: "Record any useful parts of Call, Compass, Lift, Making, Flight, feedback, Return, and Ground.",
    completion: "The cycle is legible enough to revisit or release, including an intentionally incomplete page.",
    guardrail: "No scores, streaks, totals, personality profiles, comparisons, or obligation to document every phase.",
    atlasExperienceId: "EXP-06",
    href: "/atlas/flight-log",
  },
  {
    id: "adult-return",
    title: "The Return",
    summary: "Choose the relationship, repair, learning, privacy, value, or ending that fits what happened.",
    time: "10–30 minutes",
    action: "Meet one relevant person, effect, question, influence, repair, lesson, or honest private ending.",
    completion: "The relevant relationship or consequence has been met at a fitting scale.",
    guardrail: "Return does not require publicity, market value, gratitude, or self-disclosure.",
    atlasExperienceId: "EXP-08",
    href: "/atlas/the-return",
  },
  {
    id: "adult-ground-landing",
    title: "Ground Landing",
    summary: "Close or pause the current cycle without creating a future productivity debt.",
    time: "As needed",
    action: "Put away, keep a promise, eat, sleep, move, ask for support, record what remains open, or state that the cycle is finished or paused.",
    completion: "The cycle no longer demands hidden attention.",
    guardrail: "Rest does not need to justify itself through later output.",
    atlasExperienceId: "EXP-09",
    href: "/atlas/ground-landing",
  },
  {
    id: "adult-ask-for-lift",
    title: "Ask for Lift",
    summary: "Name one concrete condition that could make a right-sized attempt possible.",
    time: "10 minutes",
    action: "Ask for time, transport, a witness, translation, childcare, instruction, access, company, assistance, or permission to reduce scope—or decide the request is unsafe or unavailable.",
    completion: "The need and available next step are clearer, even if the answer is no.",
    guardrail: "Help does not cancel authorship, and nobody is obliged to provide what they cannot give.",
  },
  {
    id: "adult-relationship-check",
    title: "Relationship and Obligation Check",
    summary: "Make freedom and responsibility visible before a consequential change.",
    time: "15 minutes",
    action: "List affected people, real promises and dependencies, needed consent, negotiable parts, and what remains yours; plan one conversation or reduce the stakes.",
    completion: "The experiment is responsibly bounded or deliberately paused.",
    guardrail: "Do not call every tie Gravity or every constraint sacred Ground; seek outside help when power makes conversation dangerous.",
  },
  {
    id: "adult-set-the-wind",
    title: "Set the Wind",
    summary: "Give AI one visible role while keeping direction, adoption, consent, and responsibility human.",
    time: "5 minutes before and after AI use",
    action: "Name Call, Compass, one Wind role, decisions not delegated, and private material withheld; then mark output accept, change, reject, or verify.",
    completion: "The tool's role and the human adoption are explicit—or AI is not used.",
    guardrail: "Speed is not direction. Using or refusing AI changes no person's worth.",
    atlasExperienceId: "EXP-05",
    href: "/atlas/set-the-wind",
  },
  {
    id: "adult-honorable-refusal",
    title: "Honorable Refusal",
    summary: "Give no, not now, or differently a real form.",
    time: "5–20 minutes",
    action: "Complete: I will not answer this Call now because…. Communicate, offer another form, name a reconsideration condition, or close privately as needed.",
    completion: "The refusal has closed the relevant loop.",
    guardrail: "Refusal does not erase unavoidable obligations or their effects.",
  },
] as const satisfies readonly PracticeCard[];

const adultScenes = [
  {
    id: "adult-scene-a",
    title: "Too many Calls",
    situation: "Many lively ideas together prevent any one of them from meeting reality.",
    groundedResponse: "Place them on one map without ranking their human importance; choose one question or tiny form that fits present commitments, review the others later, or choose none.",
    principle: "Unchosen ideas are not failed destinies; the aim is one authored encounter or honest Ground.",
    steps: [
      "Map the ideas without turning them into a personal ranking.",
      "Ask which fits present commitments and who is affected.",
      "Choose one, reduce one, place the rest on Ground, or choose none.",
    ],
  },
  {
    id: "adult-scene-b",
    title: "The tired adult",
    situation: "A wanted question appears after work and care when the adult can barely stay awake.",
    unhelpfulPattern: "Call exhaustion fear, prescribe discipline as proof of desire, or allow rest only as fuel for output.",
    groundedResponse: "Treat low Lift as information; choose sleep, food, prescribed care, an ordinary chore, help, one line, a smaller form, or no form.",
    principle: "Ground Landing is complete. One line creates no debt to continue tomorrow. Worth is unchanged in every branch.",
  },
  {
    id: "adult-scene-c",
    title: "AI proposes the destination",
    situation: "AI returns a polished, plausible public project that was not the adult's question before the prompt.",
    unhelpfulPattern: "Treat fluency or predicted demand as purpose, or defend humanity only by claiming the machine is worse.",
    groundedResponse: "Name the proposal as a Wind-shaped map, recover the prior observation, ask whose question it is, then reject, keep as reference, or deliberately transform one part.",
    principle: "Direction, adoption, affected relationships, and Return remain human whether AI is used or refused.",
  },
] as const satisfies readonly SceneCard[];

const adultInvitationDeck = {
  id: "adult-thirty-invitations",
  title: "Thirty invitations, not a challenge",
  introduction:
    "A card may take a day, six months, remain unfinished, be replaced by Ground, or be left unopened.",
  guardrail:
    "No streaks, scores, catch-up days, completion badges, ranking, or requirement to continue.",
  cards: [
    { id: "adult-card-01", number: 1, phase: "Notice", prompt: "Name one ordinary irritation without solving it." },
    { id: "adult-card-02", number: 2, phase: "Notice", prompt: "Name one thing you care for that is not a project." },
    { id: "adult-card-03", number: 3, phase: "Notice", prompt: "Notice one desire that would remain if no audience knew about it." },
    { id: "adult-card-04", number: 4, phase: "Notice", prompt: "Write one recurring ‘a person like me should…’." },
    { id: "adult-card-05", number: 5, phase: "Notice", prompt: "Name one real Ground condition without judging it." },
    { id: "adult-card-06", number: 6, phase: "Notice", prompt: "Take a Ground day; record nothing unless you want to." },
    { id: "adult-card-07", number: 7, phase: "Choose", prompt: "Turn one observation into a possible Call—or decline it." },
    { id: "adult-card-08", number: 8, phase: "Choose", prompt: "Write one sentence about why it matters now." },
    { id: "adult-card-09", number: 9, phase: "Choose", prompt: "Name everyone directly affected by a response." },
    { id: "adult-card-10", number: 10, phase: "Choose", prompt: "Name one boundary of consent, safety, time, or care." },
    { id: "adult-card-11", number: 11, phase: "Choose", prompt: "Name one condition that would make you revise or stop." },
    { id: "adult-card-12", number: 12, phase: "Choose", prompt: "Choose one map to keep, adapt, borrow temporarily, or refuse." },
    { id: "adult-card-13", number: 13, phase: "Give form", prompt: "Check today's Lift without comparing it with yesterday's." },
    { id: "adult-card-14", number: 14, phase: "Give form", prompt: "Ask for one condition or reduce the scope." },
    { id: "adult-card-15", number: 15, phase: "Give form", prompt: "Choose a form possible in one day or less." },
    { id: "adult-card-16", number: 16, phase: "Give form", prompt: "Make a rough version that reality can answer." },
    { id: "adult-card-17", number: 17, phase: "Give form", prompt: "Practise one boring hinge, then return to the whole." },
    { id: "adult-card-18", number: 18, phase: "Give form", prompt: "Put the materials away and rest without earning it." },
    { id: "adult-card-19", number: 19, phase: "Meet and Return", prompt: "Let the form meet one material, fact, place, or consenting witness." },
    { id: "adult-card-20", number: 20, phase: "Meet and Return", prompt: "Receive one response without turning it into a verdict on yourself." },
    { id: "adult-card-21", number: 21, phase: "Meet and Return", prompt: "Separate feedback about the form from worth of the maker." },
    { id: "adult-card-22", number: 22, phase: "Meet and Return", prompt: "Revise, repair, stop, or keep the form private." },
    { id: "adult-card-23", number: 23, phase: "Meet and Return", prompt: "Choose a fitting Return: value, learning, repair, gratitude, or closure." },
    { id: "adult-card-24", number: 24, phase: "Meet and Return", prompt: "Complete that Return at the smallest honest scale." },
    { id: "adult-card-25", number: 25, phase: "Land", prompt: "Name what the cycle changed and what it did not." },
    { id: "adult-card-26", number: 26, phase: "Land", prompt: "Give full attention to one ordinary obligation or act of care." },
    { id: "adult-card-27", number: 27, phase: "Land", prompt: "Use AI in one named Wind role—or consciously do not use it." },
    { id: "adult-card-28", number: 28, phase: "Land", prompt: "Revisit one borrowed map and decide its place for now." },
    { id: "adult-card-29", number: 29, phase: "Land", prompt: "Choose a next small Call, not now, or no next Call." },
    { id: "adult-card-30", number: 30, phase: "Land", prompt: "Read the covenant and rewrite one line in your own words." },
  ],
} as const satisfies CardDeck;

const aiSections = [
  {
    id: "wind-meaning",
    eyebrow: "A human-first relationship with power",
    title: "Wind changes movement; it does not choose a destination",
    plain:
      "AI can change speed, options, resistance, and reach without gaining authority over purpose or consequence.",
    paragraphs: [
      "Wind can lift, resist, redirect, and make some routes easier to see. It is powerful and not neutral, but fluency, novelty, confidence, and speed do not turn output into instruction.",
      "Human-first does not mean human alone. It means purpose, consent, judgment, adoption, and responsibility remain human assignments.",
    ],
  },
  {
    id: "human-assignments",
    eyebrow: "Do not delegate the governing decisions",
    title: "The human assignments",
    plain:
      "AI may contribute material, critique, and craft; it does not receive authority over dignity, purpose, consent, or Return.",
    paragraphs: [
      "Generation is not adoption. A person adopts a form by deciding to use, share, rely on, or act through it with enough understanding to accept, change, reject, or verify it.",
    ],
    cards: [
      { id: "worth", title: "Human worth", body: "No output, speed, originality, market use, rest, refusal, or assistance determines value." },
      { id: "worthy-call", title: "The worthy Call", body: "AI may surface questions; it cannot announce a true purpose, child destiny, or moral mission." },
      { id: "consent", title: "Consent", body: "A simulation cannot consent for a maker, collaborator, child, audience, or represented person." },
      { id: "care", title: "Care", body: "Generated signs of attention do not replace noticing, listening, remaining reachable, and responding." },
      { id: "compass", title: "Compass", body: "AI can supply arguments; values, limits, affected relations, revision, and choice remain human." },
      { id: "adoption", title: "Adoption", body: "An output becomes part of a form only through an explicit human accept, change, reject, or verify decision." },
      { id: "responsibility", title: "Responsibility and Return", body: "The people or institutions that adopt and act remain answerable for effects." },
      { id: "child-identity", title: "A child's identity", body: "AI must not diagnose, score, type, rank, or predict a child's life." },
    ],
  },
  {
    id: "wind-roles",
    eyebrow: "One role at a time",
    title: "Six roles for Wind",
    plain:
      "Naming one bounded role makes the intended relationship visible enough to inspect and reset.",
    paragraphs: [
      "Mirror, Generator, Interlocutor, Critic, Craft aid, and Simulator are contributions, not hidden pilots. If the system begins choosing purpose, criteria, audience, form, and success at once, stop and return those decisions to Compass.",
    ],
  },
  {
    id: "cycle",
    eyebrow: "Wind can enter; it is never an eighth stage",
    title: "AI through the Flight cycle",
    plain:
      "At every stage, AI may assist a bounded operation while a human question closes the gap.",
    paragraphs: [
      "At Call, restate the observation and keep refusal open. At Compass, name values, affected people, consent, and stop conditions. At Lift, choose realistic scale and support. During Making, inspect each adoption. Flight requires real contact. Return requires real effects. Ground includes stopping the system.",
      "A simulated audience is preparation, not Return. An AI-assisted form becomes Flight only when people adopt it and it meets something beyond the generation loop.",
    ],
  },
  {
    id: "human-first-pattern",
    eyebrow: "Where the governing decisions live",
    title: "Human-first does not mean opening the tool last",
    plain:
      "A process may begin with an AI draft and use extensive assistance while remaining human-first.",
    paragraphs: [
      "Human-first keeps the observation, role, criteria, affected relationships, adoption, real contact, Return, and stopping decision visible. AI-first drift hides those decisions inside defaults, fluency, popularity, or machine confidence.",
      "The distinction is not a percentage of words made by hand. It is whether a person can explain what was chosen, what changed, what still needs reality, and who remains answerable.",
    ],
    cards: [
      { id: "pattern-start", title: "Starting", body: "A person names an observation, care, duty, or tentative question.", detail: "Drift asks the system what the person should want." },
      { id: "pattern-role", title: "Role", body: "One contribution is assigned and can be revised.", detail: "Drift lets the system become planner, judge, maker, and approver at once." },
      { id: "pattern-criteria", title: "Criteria", body: "People name or negotiate criteria and affected relationships.", detail: "Drift imports criteria from defaults, popularity, or confidence." },
      { id: "pattern-options", title: "Options", body: "Generated routes remain candidates alongside refusal and delay.", detail: "Drift treats the visible option set as the boundary of imagination." },
      { id: "pattern-making", title: "Making", body: "The adopter understands enough to select, alter, explain, and verify the form.", detail: "Drift accepts polish because it feels difficult to challenge." },
      { id: "pattern-contact", title: "Contact", body: "Simulation prepares for a suitable real encounter.", detail: "Drift treats simulation as audience consent or evidence of effect." },
      { id: "pattern-return", title: "Return", body: "The responsible people meet effects and repair what they adopt.", detail: "Drift assigns responsibility to the instrument afterward." },
      { id: "pattern-stopping", title: "Stopping", body: "No AI, less AI, pause, and Ground remain available.", detail: "Drift makes use compulsory or refusal a badge of purity." },
    ],
  },
  {
    id: "protocol",
    eyebrow: "A voluntary practice",
    title: "Set the Wind",
    plain:
      "Give AI a visible role before fluency becomes direction.",
    paragraphs: [
      "Name the human Call, write a Compass note, assign one role, limit the material, make one inspectable request, run the adoption pass, meet reality at an appropriate scale, then Return and Ground.",
      "The protocol may be skipped, kept as an offline card, or ended at any step. It does not make unsafe use safe or turn output into evidence.",
    ],
    cards: [
      { id: "step-1", title: "1 · Name the Call", body: "Write the observation and possible reason to respond before asking AI. No or not now remains valid." },
      { id: "step-2", title: "2 · Make a Compass note", body: "Name affected people, consent and privacy, revision conditions, decisions kept human, and what is unknown." },
      { id: "step-3", title: "3 · Assign one role", body: "Choose one canonical Wind role and name what it must not decide." },
      { id: "step-4", title: "4 · Set the material boundary", body: "Use the minimum necessary context; prefer generic, fictionalised, or person-created material." },
      { id: "step-5", title: "5 · Make one request", body: "Ask for an output small enough to inspect; if purpose or criteria shift, return to Compass." },
      { id: "step-6", title: "6 · Run the adoption pass", body: "Mark possible material Accept, Change, Reject, or Verify." },
      { id: "step-7", title: "7 · Meet reality", body: "Choose a material test, reliable source, trusted reader, collaborator, affected person, professional review, or real environment suited to the stakes." },
      { id: "step-8", title: "8 · Return and Ground", body: "Name Wind's contribution, human adoption, remaining uncertainty or effect, and whether the cycle is complete, paused, or returned for repair." },
    ],
  },
  {
    id: "direction-test",
    eyebrow: "The hardest case is an attractive route",
    title: "Recover direction from a polished proposal",
    plain:
      "An appealing AI proposal is a candidate map, not a discovered purpose.",
    paragraphs: [
      "Label the proposal as Wind, recover what existed before it, open quieter and no-action alternatives, use Compass, choose explicitly, and own the next real contact.",
    ],
  },
  {
    id: "family-boundary",
    eyebrow: "Keep the child out of the instrument panel",
    title: "Families use AI without profiling a child",
    plain:
      "The adult keeps safety, privacy, time, limits, and care; the child keeps authorship wherever a real choice exists.",
    paragraphs: [
      "Do not ask AI whether a child is creative, gifted, lazy, resistant, mature, diagnosable, risky, or destined for a path. Do not enter private child material merely to obtain a more personal answer.",
      "Legitimate roles include open-ended material ideas, simpler instructions, several demonstrations, reviewed translation of child-authored text, or questions about conditions the adult controls.",
    ],
  },
  {
    id: "drift-repairs",
    eyebrow: "Failures belong to an encounter, not a person",
    title: "Twelve Wind drifts and repairs",
    plain:
      "A drift names where governing judgment moved out of view; its repair restores a concrete human decision.",
    paragraphs: [
      "The repair is not trust yourself instead. Compass may require evidence, collaborators, affected people, expertise, traditions, or rules.",
    ],
    cards: [
      { id: "drift-01", title: "AI proposes the direction", body: "A generated goal feels like discovered purpose.", repair: "Label it a candidate route, recover the prior observation, open alternatives, consult affected people, and choose or defer." },
      { id: "drift-02", title: "A parent asks AI to assess a child", body: "Output assigns talent, motivation, type, diagnosis, or destiny.", repair: "Discard the classification and ask only about adult-controlled conditions or specific artefact criteria without profiling." },
      { id: "drift-03", title: "An unexamined output is published", body: "The publisher cannot explain or defend the polished form.", repair: "Pause; run Accept, Change, Reject, Verify; check sources and relationships; revise, attribute, or do not publish." },
      { id: "drift-04", title: "Options become an avalanche", body: "More generation feels productive while no choice is made.", repair: "Stop, restate the Call, choose two criteria, keep a small set, or return to Ground." },
      { id: "drift-05", title: "The critic becomes a judge", body: "Feedback is read as a verdict on ability or worth.", repair: "Separate fact, ethics, craft, and taste; choose legitimate criteria and reject the rank." },
      { id: "drift-06", title: "Speed outruns consent", body: "Material is shared or transformed before boundaries are checked.", repair: "Stop distribution, identify affected interests, seek real consent where required, limit use, and repair effects." },
      { id: "drift-07", title: "Simulation replaces contact", body: "Plausible reactions are treated as evidence or approval.", repair: "Label hypotheses, meet an appropriate real person or environment, and revise from actual feedback." },
      { id: "drift-08", title: "Completion replaces learning", body: "A craft aid performs the operation the person intended to practise.", repair: "Choose learning or delivery consciously, then narrow assistance or change the aim." },
      { id: "drift-09", title: "One route becomes invisible normality", body: "Repeated outputs narrow style, assumptions, or represented lives.", repair: "Name the pattern, vary sources and constraints, invite affected perspectives, and keep rejection open." },
      { id: "drift-10", title: "Responsibility is laundered", body: "The AI said so is used after harm.", repair: "Name who chose, approved, and acted; meet the effect; repair the form or process." },
      { id: "drift-11", title: "AI use becomes compulsory", body: "Refusal is treated as backwardness or failure.", repair: "Restore a workable non-AI route where choice is real and judge only the relevant form." },
      { id: "drift-12", title: "Purity becomes a badge", body: "Unaided work is treated as morally superior or fully self-created.", repair: "Name teachers, tools, traditions, collaborators, and conditions; choose assistance by purpose and boundary." },
    ],
  },
  {
    id: "adoption-attribution",
    eyebrow: "Generation is not adoption",
    title: "Adopt and attribute in proportion to consequence",
    plain:
      "Attribution says where material came from; adoption says who chose to use it and remains answerable.",
    paragraphs: [
      "Before consequential use, name AI's role and contribution, what people accepted or changed, what was verified, which rights and uncertainties remain, and who will respond if the form is wrong.",
      "Private exploration may need only a short note. Shared or public work requires the relevant source, legal, professional, venue, credit, and trust practices. A fluent claim is not evidence.",
    ],
  },
  {
    id: "craft-scope",
    eyebrow: "No race for human superiority",
    title: "Choose assistance by meaning, learning, access, and responsibility",
    plain:
      "Craft matters because it helps intention meet material honestly, not because it protects a competitive human advantage.",
    paragraphs: [
      "Ask what craft carries meaning, what merely blocks contact, what must be understood to verify the result, what is worth learning even if slower, and which assistance improves access without removing another person's choice.",
      "AI as Wind is a normative open myth, not a diagnosis, forecast, professional rule, or guarantee about a particular system.",
    ],
  },
] as const satisfies readonly PathwaySection[];

const aiPractices = [
  {
    id: "ai-set-the-wind",
    title: "AI as Wind: Set the Wind",
    summary: "Choose one AI role and keep purpose, consent, adoption, judgment, and responsibility visible.",
    time: "A short pass before and after AI use",
    action: "Name the Call and Compass, choose one of six roles, limit material, write one request, inspect output, mark adoption, then meet reality and Return.",
    completion: "Wind's contribution, human choices, unresolved uncertainty, and responsibility can be stated—or AI is not used.",
    guardrail: "No protocol turns generated text into evidence, consent, diagnosis, professional judgment, or transferred responsibility.",
    atlasExperienceId: "EXP-05",
    href: "/atlas/set-the-wind",
  },
  {
    id: "ai-direction-test",
    title: "The Direction Test",
    summary: "Recover human direction when AI proposes an attractive destination.",
    action: "Label the route, recover the original observation, open alternatives, consult Compass, choose explicitly, and own the next contact.",
    completion: "The proposal is rejected, retained as reference, transformed into an authored direction, or left undecided.",
    guardrail: "Predicted demand, fluency, confidence, or scale is not a mandate.",
  },
  {
    id: "ai-adoption-test",
    title: "The Adoption Test",
    summary: "Check whether an AI-assisted form is ready to enter a consequential setting.",
    action: "Answer: What role did AI play? What did it contribute? What was accepted, changed, rejected, or verified? Who and what remain relevant? Who responds if it is wrong?",
    completion: "The adopter can answer—or reduces the stakes, seeks review, revises, or does not adopt yet.",
    guardrail: "Attribution does not transfer responsibility, and disclosure does not make unsafe use safe.",
  },
] as const satisfies readonly PracticeCard[];

const aiScenes = [
  {
    id: "ai-scene-assistance-without-erasure",
    title: "Assistance without self-erasure",
    situation: "An adult asks AI to improve a difficult letter; the result is graceful, decisive, and more certain than the adult feels.",
    unhelpfulPattern: "Send it because it sounds competent—or delete it because any assistance would make the letter false.",
    groundedResponse: "Name Wind as Mirror or Craft aid; mark claims about feeling, promise, fact, and boundary; keep only what can be adopted; restore lived uncertainty; consider the recipient; send, revise, delay, or stop.",
    principle: "Authorship is not a percentage of human-made words. It is a form the person can recognise, explain, and answer for.",
  },
] as const satisfies readonly SceneCard[];

export const pathways = {
  parent: {
    id: "parent",
    route: "/parents",
    eyebrow: "For parents and responsible caregivers",
    title: "Keep the Sky Open",
    lede:
      "A child is not a project. Hold the safety, care, and honest limits that belong to the adult; leave the emerging form genuinely open.",
    plainThesis:
      "A parent is a Keeper of Conditions, not an engineer of the child's future; equal dignity coexists with unequal adult responsibility.",
    readerOutcome:
      "Distinguish direct instruction, a boundary with choice, and a genuine invitation, then rewrite one real family moment without scoring parent or child.",
    nextStep:
      "Begin with Instruction or Invitation?, explore What Grounds Flight?, or simply carry the two-line distinction into tomorrow.",
    sections: parentSections,
    practices: parentPractices,
    sceneCards: parentScenes,
    cardDecks: [],
    guardrails: [
      "The child is never a product, proof of parenting, future labour-market strategy, or data source for a score.",
      "Equal dignity never removes the adult's greater duty for safety, care, privacy, limits, and consequences.",
      "An invitation is genuine only when refusal can survive without relational punishment.",
      "An unavoidable obligation or emergency is named directly; false choice is not creative freedom.",
      "Feedback describes forms, intentions, and effects without assigning creative identity, rank, diagnosis, or destiny.",
      "No practice asks for a child's name, diagnosis, image, school, private history, or identifying work sample.",
      "Public sharing is optional; actual effects on other people still require attention and repair.",
      "The metaphor stops where danger or medical, psychological, educational, legal, or social help is needed.",
    ],
    covenant: [
      "Treat the child as a person now, not a project for later.",
      "Hold safety, care, and consequences without owning the child's inner form.",
      "Name what is required and offer only choices that can be honoured.",
      "Let maps teach without letting them choose the whole sky.",
      "Make room for yes, no, not now, and differently where those answers are real.",
      "Offer feedback about forms and effects without ranking the person.",
      "Count rest, help, repetition, and honest endings as Ground.",
      "Use AI as Wind, never as judge of worth or substitute for consent and responsibility.",
      "Repair when care becomes control and take back burdens that belong to the adult.",
      "No height, originality, achievement, refusal, or future usefulness changes a child's worth.",
    ],
    routeLinks: [
      { label: "Instruction or Invitation?", href: "/atlas/instruction-or-invitation", description: "Rewrite one real adult sentence in its honest mode.", kind: "primary" },
      { label: "What Grounds Flight?", href: "/atlas/what-grounds-flight", description: "Separate adult responsibility from a hidden expected result.", kind: "atlas" },
      { label: "Creative Climate Map", href: "/atlas/creative-climate-map", description: "Inspect conditions for one attempt without profiling a child or family.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Close or pause without a required next project.", kind: "atlas" },
      { label: "Set the Wind", href: "/ai", description: "Set a human-first family boundary around AI.", kind: "cross-path" },
      { label: "Remembering Flight", href: "/adults", description: "Apply the same philosophy to your own present life.", kind: "cross-path" },
      { label: "The Return", href: "/manifesto/M10", description: "Read the article on consequence, repair, privacy, and honest endings.", kind: "reference" },
      { label: "Read the Manifesto", href: "/manifesto", description: "See the full worldview behind the parent path.", kind: "reference" },
    ],
  },
  adult: {
    id: "adult",
    route: "/adults",
    eyebrow: "For adults beginning from the life already here",
    title: "Remembering Flight",
    lede:
      "You do not have to abandon your life, discover one true calling, or condemn your past in order to author one responsible next form.",
    plainThesis:
      "An adult can resume authorship from present life through small, revisable cycles without finding one hidden purpose.",
    readerOutcome:
      "Distinguish Ground from Gravity and name one possible Call, honest refusal, request for help, or right-sized form.",
    nextStep:
      "Begin with Problem Finder, choose any voluntary practice or invitation card, or remain on Ground with nothing to prove.",
    sections: adultSections,
    practices: adultPractices,
    sceneCards: adultScenes,
    cardDecks: [adultInvitationDeck],
    guardrails: [
      "Flight names an event, never a human type, rank, identity, or obligation to produce.",
      "Present-life purpose does not require one destiny, a dramatic reinvention, or condemnation of the past.",
      "Ground includes body, money, facts, relationships, craft, care, obligations, maintenance, and rest; naming it is not approving injustice.",
      "A borrowed map is not automatically Gravity, and every commitment is not automatically sacred Ground.",
      "No practice creates a score, streak, diagnosis, forecast, personality result, or comparative measure.",
      "No, not now, differently, ask for help, keep private, and end are complete authored branches.",
      "Consequential choices attend to consent, affected relationships, real expertise, evidence, and repair.",
      "This is speculative philosophy and voluntary practice, not treatment, diagnosis, professional advice, or a forecast.",
    ],
    covenant: [
      "Begin with this life, not an imaginary life without limits or ties.",
      "Treat a Call as an invitation, never proof of destiny.",
      "Use maps without mistaking them for the sky.",
      "Choose a form small enough for the Lift actually present.",
      "Let craft, care, repetition, limits, and rest belong to Ground.",
      "Meet what actions change and make a fitting Return.",
      "Ask for help, change direction, refuse, pause, or end a cycle.",
      "Use Wind without asking speed to choose what is worthy.",
      "Never measure a person by height, output, usefulness, or originality.",
      "There is nothing to prove; author the next responsible form only if and when one is possible.",
    ],
    routeLinks: [
      { label: "Problem Finder", href: "/atlas/problem-finder", description: "Turn one observation into a possible Call or honest non-answer.", kind: "primary" },
      { label: "Borrowed Map, Living Compass", href: "/atlas/borrowed-map-living-compass", description: "Choose the present place of one inherited route.", kind: "atlas" },
      { label: "Template Escape", href: "/atlas/template-escape", description: "Try one reversible variation without worshipping novelty.", kind: "atlas" },
      { label: "Flight Log", href: "/atlas/flight-log", description: "Remember one complete or incomplete cycle without tracking a life.", kind: "atlas" },
      { label: "The Return", href: "/atlas/the-return", description: "Meet an effect through learning, repair, privacy, value, or ending.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Close or pause without debt to continue.", kind: "atlas" },
      { label: "Set the Wind", href: "/ai", description: "Choose a bounded role for AI and review adoption.", kind: "cross-path" },
      { label: "Keep the Sky Open", href: "/parents", description: "Carry the framework into unequal adult responsibility with a child.", kind: "cross-path" },
      { label: "Read the Manifesto", href: "/manifesto", description: "Read the twelve governing articles.", kind: "reference" },
    ],
  },
  ai: {
    id: "ai",
    route: "/ai",
    eyebrow: "A human-first practice of amplified making",
    title: "Set the Wind",
    lede:
      "AI can widen options, accelerate craft, resist a draft, and simulate contact. These are powers, not a purpose.",
    plainThesis:
      "AI changes what is easy, visible, and fast, while purpose, consent, adoption, judgment, and responsibility remain human assignments.",
    readerOutcome:
      "Name the human question, one bounded Wind role, decisions not delegated, material kept private, and responsibility for anything adopted.",
    nextStep:
      "Read Set the Wind as a planning note, or follow the complete no-AI route, then continue with the Parent or Adult chapter.",
    sections: aiSections,
    practices: aiPractices,
    sceneCards: aiScenes,
    cardDecks: [],
    guardrails: [
      "Human worth does not depend on using AI, refusing it, outperforming it, or producing anything.",
      "AI is influential and not neutral, but it is not an oracle, moral authority, Compass, hidden pilot, or bearer of Return.",
      "No output supplies consent, evidence, factual verification, professional judgment, or lived feedback by itself.",
      "Children are never profiled, diagnosed, ranked, forecast, or used as private data sources for personalised inference.",
      "Use only necessary material and check the actual system, venue, source, legal, privacy, and professional conditions that apply.",
      "Simulation is preparation, not relationship; generation is material, not adoption.",
      "A no-AI route, human help, pause, Ground, and an unanswered Call remain valid.",
      "The Wind metaphor is a practical open myth, not a technical capability claim or labour-market forecast.",
    ],
    covenant: [
      "Worth is invariant.",
      "Wind receives one visible role.",
      "An offered route is not a destiny or mandate.",
      "Compass remains human.",
      "Wind's non-neutral pulls remain visible and reviewable.",
      "Children are not profiles.",
      "Adoption is explicit: accept, change, reject, or verify.",
      "Simulation is not consent, evidence, or relationship.",
      "Return cannot be outsourced.",
      "Ground remains open: pause, work without AI, ask for human help, or leave the Call unanswered.",
    ],
    routeLinks: [
      { label: "Set the Wind", href: "/atlas/set-the-wind", description: "Create a bounded Wind agreement and human adoption note.", kind: "primary" },
      { label: "Keep the Sky Open", href: "/parents", description: "Apply the family boundary while retaining unequal adult responsibility.", kind: "cross-path" },
      { label: "Remembering Flight", href: "/adults", description: "Return the tool boundary to a present-life human direction.", kind: "cross-path" },
      { label: "The Return", href: "/atlas/the-return", description: "Meet the effects of an adopted form in a real relationship.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Stop the system and close the cycle without promising another.", kind: "atlas" },
      { label: "Read the Manifesto", href: "/manifesto", description: "See why Wind remains one part of a larger ethical world.", kind: "reference" },
    ],
  },
} as const satisfies Record<PathwayId, PathwayDefinition>;

export const pathwayList = [pathways.parent, pathways.adult, pathways.ai] as const;

export function getPathway(pathwayId: PathwayId): PathwayDefinition {
  return pathways[pathwayId];
}

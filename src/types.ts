import type { ReactNode } from "react";

export type VisualRegister = "quiet" | "night" | "atlas";

export type SceneKind =
  | "home"
  | "route"
  | "manifesto"
  | "final";

export type MechanismId =
  | "map-sky"
  | "metric-veil"
  | "question-fold"
  | "map-wall"
  | "provisional-form"
  | "ground-supports"
  | "compass"
  | "keeper-table"
  | "living-map"
  | "wind"
  | "adoption-folds"
  | "candidate-map"
  | "return-threshold"
  | "honest-mode-rail"
  | "ground-or-gravity"
  | "return-tray"
  | "refusal-brace"
  | "open-binding"
  | "equal-lenses"
  | "template-hinge"
  | "cycle-sheet"
  | "climate-tabs"
  | "open-sky"
  | "open-horizon";

export interface SceneDefinition {
  id: string;
  kind: SceneKind;
  register: VisualRegister;
  mechanism: MechanismId;
  title: string;
  plainMeaning: string;
  description: string;
  accent?: "rust" | "ochre" | "blue" | "graphite";
}

export interface ManifestoArticle {
  id: string;
  number: number;
  title: string;
  kicker: string;
  paragraphs: readonly string[];
  scene: SceneDefinition;
  landing: string;
}

export interface RouteCardDefinition {
  title: string;
  eyebrow: string;
  body: string;
  href: string;
  icon?: ReactNode;
}

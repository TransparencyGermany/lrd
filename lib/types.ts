export type CategoryName =
  | "Lobbyregister"
  | "Legislativer Fußabdruck"
  | "Karenzzeit"
  | "Verhaltensregeln";

export interface Indicator {
  kategorie: CategoryName;
  bezeichnung: string;
  hintergrund: string;
  erklaerung: string;
  erreichte_punkte: number;
  maximalpunkte: number;
}

export interface RankingData {
  categories: Record<CategoryName, string>;
  states: Record<string, Indicator[]>;
}

export interface BarChartDatum {
  name: string;
  slug: string;
  value: number;
}

export interface CategoryOverview {
  points: number;
  max: number;
}

export interface StateMeta {
  name: string;
  slug: string;
  title?: string;
  ifgYear?: string;
  ifgType?: "ifg" | "tg";
  ifgLink?: string;
  status: "complete" | "draft";
  bodyHtml: string;
}

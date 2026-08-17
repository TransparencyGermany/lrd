import type { CategoryName, Year } from "@/lib/types";

export const SITE_URL = "https://lobbyranking.de";

export const YEARS: Year[] = ["2024", "2026"];

export const DEFAULT_YEAR: Year = "2026";

export const CATEGORY_ORDER: CategoryName[] = [
  "Lobbyregister",
  "Legislativer Fußabdruck",
  "Karenzzeit",
  "Verhaltensregeln",
];

export const CATEGORY_COLORS: Record<CategoryName, string> = {
  Lobbyregister: "#D6B32C",
  "Legislativer Fußabdruck": "#D97B2C",
  Karenzzeit: "#30B565",
  Verhaltensregeln: "#8C42CD",
};

export const CATEGORY_TINTS: Record<CategoryName, string> = {
  Lobbyregister: "#FBF4D6",
  "Legislativer Fußabdruck": "#FBE7D6",
  Karenzzeit: "#E4F1E9",
  Verhaltensregeln: "#EEE5F5",
};

export const OVERVIEW_COLOR = "#3795D9";
export const OVERVIEW_TINT = "#E1EAF5";

export const BUND_NAME = "Bund";

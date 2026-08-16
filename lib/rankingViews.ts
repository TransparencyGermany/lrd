import { CATEGORY_COLORS, OVERVIEW_COLOR } from "@/lib/constants";
import {
  getCategoryNames,
  getCategoryValues,
  getOverviewValues,
  getRankedStateNames,
} from "@/lib/scoring";
import type { BarChartDatum, RankingData, StateMeta } from "@/lib/types";

export interface RankingView {
  category: string;
  label: string;
  color: string | string[];
  info?: string;
  data: BarChartDatum[];
}

// Builds one ranked BarChartDatum[] per view (overall + each category), all sharing the
// same state display order — ported from BarchartCtrl.loadOverview/catClick, where
// clicking a category swaps in that category's values without re-sorting the rows.
export function buildRankingViews(data: RankingData, states: StateMeta[]): RankingView[] {
  const nameToSlug = new Map(states.map((s) => [s.name, s.slug]));
  const order = getRankedStateNames(data);
  const categories = getCategoryNames(data);

  const toRows = (values: Record<string, number>): BarChartDatum[] =>
    order.map((name) => ({
      name,
      slug: nameToSlug.get(name) ?? "",
      value: values[name],
    }));

  const views: RankingView[] = [
    {
      category: "Gesamt",
      label: "Gesamt",
      color: OVERVIEW_COLOR,
      info: "zeigt das Gesamtergebnis aus allen vier Kategorien: Lobbyregister, legislativer Fußabdruck, Karenzzeit und Verhaltensregeln.",
      data: toRows(getOverviewValues(data)),
    },
  ];

  for (const category of categories) {
    views.push({
      category,
      label: category,
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
      info: data.categories[category as keyof typeof data.categories],
      data: toRows(getCategoryValues(data, category)),
    });
  }

  return views;
}

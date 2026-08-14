import { BUND_NAME, CATEGORY_ORDER } from "@/lib/constants";
import type { CategoryOverview, Indicator, RankingData } from "@/lib/types";

export function getMaxFor(category: string, items: Indicator[]): number {
  return items
    .filter((item) => item.kategorie === category)
    .reduce((sum, item) => sum + item.maximalpunkte, 0);
}

// Ported 1:1 from static/js/app.js's getTotalFor: each category's percentage is
// rounded first, then the four rounded percentages are averaged and rounded again.
// This is intentionally not a plain points-ratio calculation.
export function getTotalFor(data: RankingData, name: string): number {
  const categories = Object.keys(data.categories);
  const total = categories.reduce((sum, category) => {
    const items = data.states[name].filter((i) => i.kategorie === category);
    const achieved = items.reduce((prev, item) => prev + item.erreichte_punkte, 0);
    const max = getMaxFor(category, data.states[name]);
    return sum + Math.round((achieved * 100) / max);
  }, 0);
  return Math.round(total / categories.length);
}

export function getOverviewForState(
  data: RankingData,
  state: string
): Record<string, CategoryOverview> {
  const categories = Object.keys(data.categories).reduce<Record<string, CategoryOverview>>(
    (prev, category) => {
      const items = data.states[state].filter((item) => item.kategorie === category);
      prev[category] = items.reduce(
        (acc, item) => ({
          points: acc.points + item.erreichte_punkte,
          max: acc.max + item.maximalpunkte,
        }),
        { points: 0, max: 0 }
      );
      return prev;
    },
    {}
  );
  categories["Gesamt"] = { points: getTotalFor(data, state), max: 100 };
  return categories;
}

// Ported from BarchartCtrl.loadOverview: sort ascending by (name !== 'Bund', sum),
// then reverse — the net effect is states ranked highest-to-lowest score, with Bund
// appended last regardless of its own score.
export function getRankedStateNames(data: RankingData): string[] {
  const entries = Object.keys(data.states)
    .sort()
    .map((name) => ({ name, sum: getTotalFor(data, name) }));

  entries.sort((a, b) => {
    const aKey = a.name !== BUND_NAME ? 1 : 0;
    const bKey = b.name !== BUND_NAME ? 1 : 0;
    if (aKey !== bKey) return aKey - bKey;
    return a.sum - b.sum;
  });
  entries.reverse();

  return entries.map((e) => e.name);
}

export function getOverviewValues(data: RankingData): Record<string, number> {
  const values: Record<string, number> = {};
  for (const name of Object.keys(data.states)) {
    values[name] = getTotalFor(data, name);
  }
  return values;
}

// Ported from BarchartCtrl.catClick: percentage achieved for a single category,
// per state (display order is supplied separately and stays fixed to the overview order).
export function getCategoryValues(data: RankingData, category: string): Record<string, number> {
  const values: Record<string, number> = {};
  for (const [name, items] of Object.entries(data.states)) {
    const achieved = items
      .filter((i) => i.kategorie === category)
      .reduce((sum, i) => sum + i.erreichte_punkte, 0);
    values[name] = Math.round((achieved * 100) / getMaxFor(category, items));
  }
  return values;
}

export function getCategoryNames(data: RankingData): string[] {
  return CATEGORY_ORDER.filter((c) => c in data.categories);
}

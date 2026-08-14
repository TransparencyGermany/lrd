import YearlyRankingExplorer from "@/components/YearlyRankingExplorer";
import { YEARS } from "@/lib/constants";
import { rankingDataByYear } from "@/lib/data";
import { buildRankingViews, type RankingView } from "@/lib/rankingViews";
import { getAllStates } from "@/lib/states";
import type { Year } from "@/lib/types";

export default function EmbedPage() {
  const states = getAllStates();
  const viewsByYear = Object.fromEntries(
    YEARS.map((year) => [year, buildRankingViews(rankingDataByYear[year], states)])
  ) as Record<Year, RankingView[]>;

  return (
    <div className="container">
      <YearlyRankingExplorer viewsByYear={viewsByYear} />
    </div>
  );
}

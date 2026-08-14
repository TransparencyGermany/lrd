import RankingExplorer from "@/components/RankingExplorer";
import { rankingData } from "@/lib/data";
import { buildRankingViews } from "@/lib/rankingViews";
import { getAllStates } from "@/lib/states";

export default function EmbedPage() {
  const states = getAllStates();
  const views = buildRankingViews(rankingData, states);

  return (
    <div className="container">
      <RankingExplorer views={views} />
    </div>
  );
}

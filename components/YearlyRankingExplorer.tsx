"use client";

import { useState } from "react";
import RankingExplorer from "@/components/RankingExplorer";
import { DEFAULT_YEAR } from "@/lib/constants";
import type { RankingView } from "@/lib/rankingViews";
import type { Year } from "@/lib/types";

type YearlyRankingExplorerProps = {
  viewsByYear: Record<Year, RankingView[]>;
  initialYear?: Year;
};

// Adds a year dimension on top of RankingExplorer (left unchanged). Remounting
// RankingExplorer via `key={year}` on year change reuses the same "remount to
// replay the grow-in animation" trick already used there for category switches.
export default function YearlyRankingExplorer({
  viewsByYear,
  initialYear = DEFAULT_YEAR,
}: YearlyRankingExplorerProps) {
  const [year, setYear] = useState<Year>(initialYear);

  return (
    <RankingExplorer
      key={year}
      views={viewsByYear[year]}
      year={year}
      onYearChange={setYear}
    />
  );
}

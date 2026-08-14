"use client";

import { useState, type ReactNode } from "react";
import RankingExplorer from "@/components/RankingExplorer";
import YearToggle from "@/components/YearToggle";
import { DEFAULT_YEAR } from "@/lib/constants";
import type { RankingView } from "@/lib/rankingViews";
import type { Year } from "@/lib/types";

type YearlyRankingExplorerProps = {
  viewsByYear: Record<Year, RankingView[]>;
  children?: ReactNode;
};

// Adds a year dimension on top of RankingExplorer (left unchanged). Remounting
// RankingExplorer via `key={year}` on year change reuses the same "remount to
// replay the grow-in animation" trick already used there for category switches.
export default function YearlyRankingExplorer({ viewsByYear, children }: YearlyRankingExplorerProps) {
  const [year, setYear] = useState<Year>(DEFAULT_YEAR);

  return (
    <div>
      <YearToggle value={year} onChange={setYear} />
      <RankingExplorer key={year} views={viewsByYear[year]}>
        {children}
      </RankingExplorer>
    </div>
  );
}

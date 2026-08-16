"use client";

import { useSearchParams } from "next/navigation";
import YearlyRankingExplorer from "@/components/YearlyRankingExplorer";
import { DEFAULT_YEAR, YEARS } from "@/lib/constants";
import type { RankingView } from "@/lib/rankingViews";
import type { Year } from "@/lib/types";

type EmbedExplorerProps = {
  viewsByYear: Record<Year, RankingView[]>;
};

function isYear(value: string | null): value is Year {
  return YEARS.includes(value as Year);
}

// Static export has no server-side searchParams, so the ?year= override (used by the
// homepage's "Als iFrame einbetten" snippet) is read client-side instead.
export default function EmbedExplorer({ viewsByYear }: EmbedExplorerProps) {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get("year");
  const initialYear = isYear(yearParam) ? yearParam : DEFAULT_YEAR;

  return <YearlyRankingExplorer viewsByYear={viewsByYear} initialYear={initialYear} />;
}

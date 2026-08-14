import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StateYearView from "@/components/StateYearView";
import { YEARS } from "@/lib/constants";
import { rankingDataByYear } from "@/lib/data";
import { getOverviewForState } from "@/lib/scoring";
import { getAllStateSlugs, getStateBySlug } from "@/lib/states";
import type { StateYearData, Year } from "@/lib/types";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};

  return {
    title: state.status === "draft" ? `${state.title ?? state.name} (Entwurf)` : state.name,
  };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const dataByYear = Object.fromEntries(
    YEARS.map((year) => {
      const data = rankingDataByYear[year];
      return [
        year,
        {
          overview: getOverviewForState(data, state.name),
          indicators: data.states[state.name],
        },
      ];
    })
  ) as Record<Year, StateYearData>;

  return (
    <div className="container">
      {state.status === "draft" ? (
        <h1 style={{ color: "red" }} className="text-center">
          {state.title ? `${state.title} (Entwurf)` : state.name}
        </h1>
      ) : (
        <h1 className="text-center">{state.name}</h1>
      )}

      <StateYearView dataByYear={dataByYear}>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: state.bodyHtml }} />
      </StateYearView>
    </div>
  );
}

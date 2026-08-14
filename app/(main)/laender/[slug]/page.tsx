import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Bar from "@/components/Bar";
import IndicatorRow from "@/components/IndicatorRow";
import { CATEGORY_COLORS, CATEGORY_ORDER, OVERVIEW_COLOR } from "@/lib/constants";
import { rankingData } from "@/lib/data";
import { getOverviewForState } from "@/lib/scoring";
import { getAllStateSlugs, getStateBySlug } from "@/lib/states";
import type { CategoryName } from "@/lib/types";
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

  const overview = getOverviewForState(rankingData, state.name);
  const gesamt = overview["Gesamt"];
  const indicators = rankingData.states[state.name];

  return (
    <div className="container">
      {state.status === "draft" ? (
        <h1 style={{ color: "red" }} className="text-center">
          {state.title ? `${state.title} (Entwurf)` : state.name}
        </h1>
      ) : (
        <h1 className="text-center">{state.name}</h1>
      )}

      <p className={styles.overviewLabel}>Gesamt {gesamt.points}</p>
      <div className={styles.overviewBar}>
        <Bar value={gesamt.points} max={100} color={OVERVIEW_COLOR} label={`${gesamt.points}%`} />
      </div>

      <div className={styles.catWrapper}>
        {CATEGORY_ORDER.map((category) => {
          const cat = overview[category];
          const value = Math.round((cat.points * 100) / cat.max);
          return (
            <div className={styles.catRow} key={category}>
              <div>{category}</div>
              <Bar
                value={cat.points}
                max={cat.max}
                color={CATEGORY_COLORS[category]}
                label={`${value}%`}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: state.bodyHtml }} />

      {CATEGORY_ORDER.map((category) => {
        const categoryIndicators = indicators.filter((i) => i.kategorie === category);
        if (categoryIndicators.length === 0) return null;

        const achieved = categoryIndicators.reduce((sum, i) => sum + i.erreichte_punkte, 0);
        const max = categoryIndicators.reduce((sum, i) => sum + i.maximalpunkte, 0);

        return (
          <div className={styles.categorySection} key={category}>
            <h2>{category}</h2>
            <p className={styles.subinfo}>
              {achieved} von {max} Punkten
            </p>
            {categoryIndicators.map((indicator) => (
              <IndicatorRow
                key={indicator.bezeichnung}
                indicator={indicator}
                color={CATEGORY_COLORS[category as CategoryName]}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

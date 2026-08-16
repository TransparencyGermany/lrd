"use client";

import { useState } from "react";
import Link from "next/link";
import { STATE_PATHS } from "@/lib/statePaths";
import styles from "./GermanyMap.module.css";

export type MapStateDatum = {
  name: string;
  slug: string;
  rank: number;
  score: number;
};

type GermanyMapProps = {
  data: MapStateDatum[];
};

// Uses the site's existing baked-in state path geometry (no runtime GeoJSON fetch, no
// d3/topojson dependency) but adds the redesign's hover interactivity: fill states with
// real data, show a rank/score card below on hover, click through to the state page.
export default function GermanyMap({ data }: GermanyMapProps) {
  const [hover, setHover] = useState<string | null>(null);
  const byName = new Map(data.map((d) => [d.name, d]));
  const hovered = hover ? byName.get(hover) : undefined;

  return (
    <div className={styles.wrapper}>
      <p className={styles.helper}>
        Über einen Klick gelangen Sie auf die Detailansicht des jeweiligen Bundeslandes.
      </p>
      <svg
        className={styles.map}
        width="100%"
        viewBox="100 0 700 550"
        style={{ display: "block", margin: "0 auto" }}
      >
        <g>
          {STATE_PATHS.map((state) => {
            const matched = byName.get(state.name);
            const isHover = hover === state.name;
            return (
              <Link
                key={state.slug}
                href={`/laender/${state.slug}/`}
                className={matched ? styles.feature : styles.featureUnmatched}
                onMouseEnter={() => matched && setHover(state.name)}
                onMouseLeave={() => setHover(null)}
              >
                <path
                  transform={state.pathTransform}
                  d={state.d}
                  className={isHover ? styles.pathHover : styles.path}
                />
              </Link>
            );
          })}
        </g>
      </svg>
      <div className={styles.info}>
        {hovered ? (
          <>
            <div className={styles.infoTop}>
              <span className={styles.rankBadge}>Platz {hovered.rank}</span>
              <span className={styles.stateName}>{hovered.name}</span>
            </div>
            <span className={styles.score}>{hovered.score}%</span>
            <span className={styles.scoreLabel}>der erreichbaren Punkte</span>
          </>
        ) : (
          <p className={styles.placeholder}>
            Bewegen Sie die Maus über ein Bundesland, um Rang und Ergebnis zu sehen.
          </p>
        )}
      </div>
    </div>
  );
}

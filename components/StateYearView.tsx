"use client";

import { useState, type ReactNode } from "react";
import Bar from "@/components/Bar";
import IndicatorRow from "@/components/IndicatorRow";
import StateShape from "@/components/StateShape";
import YearToggle from "@/components/YearToggle";
import {
  CATEGORY_COLORS,
  CATEGORY_ORDER,
  CATEGORY_TINTS,
  DEFAULT_YEAR,
  OVERVIEW_COLOR,
} from "@/lib/constants";
import type { CategoryName, StateYearData, Year } from "@/lib/types";
import styles from "./StateYearView.module.css";

type StateYearViewProps = {
  stateName: string;
  displayName?: string;
  draft?: boolean;
  dataByYear: Record<Year, StateYearData>;
  children?: ReactNode;
};

function scrollToIndicators() {
  setTimeout(() => {
    const el = document.getElementById("indicators-section");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, 50);
}

// Owns both the year toggle (existing feature) and the active category — the land
// header's tint/watermark color, the overview category rows, and the indicators section
// all follow the same `cat` state, matching the redesign's "whole page follows the
// active category" behaviour.
export default function StateYearView({
  stateName,
  displayName,
  draft,
  dataByYear,
  children,
}: StateYearViewProps) {
  const [year, setYear] = useState<Year>(DEFAULT_YEAR);
  const [cat, setCat] = useState<CategoryName>(CATEGORY_ORDER[0]);
  const [openIndicators, setOpenIndicators] = useState<Record<number, boolean>>({ 0: true });

  const { overview, indicators } = dataByYear[year];
  const gesamt = overview["Gesamt"];
  const activeColor = CATEGORY_COLORS[cat];
  const activeTint = CATEGORY_TINTS[cat];
  const categoryIndicators = indicators.filter((i) => i.kategorie === cat);

  function selectTab(next: CategoryName) {
    setCat(next);
    setOpenIndicators({ 0: true });
  }

  function selectFromSummary(next: CategoryName, count: number) {
    setCat(next);
    setOpenIndicators(Object.fromEntries(Array.from({ length: count }, (_, i) => [i, true])));
    scrollToIndicators();
  }

  return (
    <div key={year}>
      <div className={styles.landHeader} style={{ background: activeTint }}>
        <div className={styles.watermark}>
          <StateShape name={stateName} color={activeColor} />
        </div>
        <p className={styles.kicker} style={{ color: activeColor }}>
          Lobbyranking {year} · Bundesland im Detail
        </p>
        <h1 className={styles.title} style={{ color: draft ? "#c0392b" : undefined }}>
          {displayName ?? stateName}
        </h1>
      </div>

      <div className={styles.overview}>
        <div className={styles.yearToggle}>
          <YearToggle value={year} onChange={setYear} />
        </div>
        <div className={styles.bigScore}>
          <span className={styles.bigNumber}>{gesamt.points}%</span>
          <span className={styles.bigLabel}>Gesamtergebnis im Lobbyranking {year}</span>
        </div>
        <div className={styles.overallBar}>
          <Bar value={gesamt.points} max={100} color={OVERVIEW_COLOR} height={12} />
        </div>

        <div className={styles.catSummaries}>
          <p className={styles.summaryLabel}>setzt sich zusammen aus</p>
          {CATEGORY_ORDER.map((category) => {
            const c = overview[category];
            const isActive = category === cat;
            const count = indicators.filter((i) => i.kategorie === category).length;
            return (
              <button
                type="button"
                key={category}
                className={styles.catRow}
                style={{ background: isActive ? CATEGORY_TINTS[category] : undefined }}
                onClick={() => selectFromSummary(category, count)}
              >
                <span
                  className={styles.catLabel}
                  style={{ fontWeight: isActive ? 800 : 600 }}
                >
                  {category}
                </span>
                <Bar
                  value={c.points}
                  max={c.max}
                  color={CATEGORY_COLORS[category]}
                  height={isActive ? 13 : 9}
                />
                <span className={styles.catScore}>
                  {c.points} / {c.max}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="indicators-section" className={styles.indicators}>
        <h2 className={styles.indicatorsHeading}>Bewertete Indikatoren</h2>

        <div className={styles.tabs}>
          {CATEGORY_ORDER.map((category) => {
            const isActive = category === cat;
            const color = CATEGORY_COLORS[category];
            return (
              <button
                key={category}
                type="button"
                className={styles.tab}
                style={{
                  color: isActive ? color : undefined,
                  borderBottomColor: isActive ? color : "transparent",
                  fontWeight: isActive ? 700 : 500,
                }}
                onClick={() => selectTab(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        {children && <div className={styles.narrative}>{children}</div>}

        <div className={styles.indicatorList} key={cat}>
          {categoryIndicators.map((indicator, index) => (
            <IndicatorRow
              key={indicator.bezeichnung}
              indicator={indicator}
              color={activeColor}
              tint={activeTint}
              open={!!openIndicators[index]}
              onToggle={() =>
                setOpenIndicators((prev) => ({ ...prev, [index]: !prev[index] }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

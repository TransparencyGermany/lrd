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
import type { CategoryOverview, CategoryName, StateYearData, Year } from "@/lib/types";
import styles from "./StateYearView.module.css";

type StateYearViewProps = {
  stateName: string;
  displayName?: string;
  draft?: boolean;
  dataByYear: Record<Year, StateYearData>;
  children?: ReactNode;
};

// Mirrors RankingExplorer's buildRankingSvg: Gesamt + one row per category, no
// "active tab" shading — the export always shows every row in its neutral state.
function buildStateSvg(gesamtPoints: number, overview: Record<string, CategoryOverview>): string {
  const rows = [
    { name: "Gesamt", value: gesamtPoints, color: OVERVIEW_COLOR, bold: true },
    ...CATEGORY_ORDER.map((category) => {
      const c = overview[category];
      return {
        name: category,
        value: c.max > 0 ? Math.round((c.points / c.max) * 100) : 0,
        color: CATEGORY_COLORS[category],
        bold: false,
      };
    }),
  ];

  const rowHeight = 34;
  const width = 660;
  const height = rows.length * rowHeight + 20;
  const barX = 330;
  const barWidthMax = 250;
  const svgRows = rows
    .map((r, i) => {
      const y = i * rowHeight + 10;
      const barWidth = (r.value / 100) * barWidthMax;
      return (
        `<text x="10" y="${y + 15}" font-family="Inter,sans-serif" font-size="15" font-weight="${r.bold ? 700 : 400}" fill="#2B2523">${r.name}</text>` +
        `<rect x="${barX}" y="${y}" width="${barWidthMax}" height="14" rx="7" fill="#EDE8DF"/>` +
        `<rect x="${barX}" y="${y}" width="${barWidth}" height="14" rx="7" fill="${r.color}"/>` +
        `<text x="650" y="${y + 15}" font-family="Inter,sans-serif" font-size="14" fill="#5A5450" text-anchor="end">${r.value}%</text>`
      );
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${svgRows}</svg>`;
}

function downloadStateSvg(stateName: string, year: Year, gesamtPoints: number, overview: Record<string, CategoryOverview>) {
  const svg = buildStateSvg(gesamtPoints, overview);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lobbyranking-${stateName.toLowerCase().replace(/\s+/g, "-")}-${year}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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

  function selectFromSummary(next: CategoryName) {
    setCat(next);
    setOpenIndicators({ 0: true });
    scrollToIndicators();
  }

  return (
    <div key={year}>
      <div className={styles.landHeader} style={{ background: activeTint }}>
        <div className={styles.landHeaderInner}>
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
            return (
              <button
                type="button"
                key={category}
                className={styles.catRow}
                style={{ background: isActive ? CATEGORY_TINTS[category] : undefined }}
                onClick={() => selectFromSummary(category)}
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
                  {c.max > 0 ? Math.round((c.points / c.max) * 100) : 0}%
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => downloadStateSvg(stateName, year, gesamt.points, overview)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
            </svg>
            SVG herunterladen
          </button>
        </div>
      </div>

      {children && (
        <div className={styles.descriptionSection}>
          <div className={styles.narrative}>
            <h2 className={styles.indicatorsHeading}>Beschreibung</h2>
            {children}
          </div>
        </div>
      )}

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

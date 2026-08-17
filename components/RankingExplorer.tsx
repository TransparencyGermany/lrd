"use client";

import { useState } from "react";
import Link from "next/link";
import Bar from "@/components/Bar";
import YearToggle from "@/components/YearToggle";
import { BUND_NAME, CATEGORY_TINTS, OVERVIEW_TINT } from "@/lib/constants";
import type { RankingView } from "@/lib/rankingViews";
import type { Year } from "@/lib/types";
import styles from "./RankingExplorer.module.css";

const TINTS: Record<string, string> = {
  Gesamt: OVERVIEW_TINT,
  ...CATEGORY_TINTS,
};

type RankingExplorerProps = {
  views: RankingView[];
  year: Year;
  onYearChange: (year: Year) => void;
};

function buildRankingSvg(view: RankingView): string {
  const rowHeight = 28;
  const width = 640;
  const height = view.data.length * rowHeight + 20;
  const color = Array.isArray(view.color) ? view.color[0] : view.color;
  const rows = view.data
    .map((d, i) => {
      const y = i * rowHeight + 10;
      const barWidth = (d.value / 100) * 380;
      return (
        `<text x="0" y="${y + 14}" font-family="Inter,sans-serif" font-size="12" fill="#2B2523">${d.name}</text>` +
        `<rect x="200" y="${y}" width="380" height="14" rx="7" fill="#EDE8DF"/>` +
        `<rect x="200" y="${y}" width="${barWidth}" height="14" rx="7" fill="${color}"/>` +
        `<text x="590" y="${y + 14}" font-family="Inter,sans-serif" font-size="12" fill="#5A5450" text-anchor="end">${d.value}%</text>`
      );
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#FAF8F4"/>${rows}</svg>`;
}

function downloadSvg(view: RankingView, year: Year) {
  const svg = buildRankingSvg(view);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lobbyranking-${year}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Ports BarchartCtrl: holds only which view (Gesamt or a category) is active. Every
// view's row order was already fixed server-side in lib/rankingViews.ts, matching the
// original's behaviour where clicking a category swaps values but never re-sorts rows.
export default function RankingExplorer({ views, year, onYearChange }: RankingExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = views[activeIndex];
  const activeColor = Array.isArray(active.color) ? active.color[0] : active.color;

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs}>
        {views.map((view, index) => {
          const color = Array.isArray(view.color) ? view.color[0] : view.color;
          const isActive = index === activeIndex;
          return (
            <button
              key={view.category}
              type="button"
              className={styles.tab}
              style={{
                color: isActive ? color : undefined,
                borderBottomColor: isActive ? color : "transparent",
                fontWeight: isActive ? 700 : 500,
              }}
              onClick={() => setActiveIndex(index)}
            >
              {view.label}
            </button>
          );
        })}
      </div>

      {active.info && (
        <div className={styles.description} style={{ background: TINTS[active.category] }}>
          <p>
            <strong style={{ color: activeColor }}>{active.label}</strong> {active.info}
          </p>
        </div>
      )}

      <div className={styles.chartHeader}>
        <p className={styles.chartLabel}>Balkendiagramm nach Gesamtergebnis sortiert</p>
        <YearToggle value={year} onChange={onYearChange} />
      </div>

      <div className={styles.rows} key={active.category}>
        {active.data.map((d, index) => {
          const rank = d.name === BUND_NAME ? "—" : `${index + 1}.`;
          return (
            <Link key={d.slug} href={`/laender/${d.slug}/`} className={styles.row}>
              <span className={styles.rank}>{rank}</span>
              <span className={styles.name} style={{ fontWeight: d.name === BUND_NAME ? 700 : 500 }}>
                {d.name}
              </span>
              <Bar value={d.value} max={100} color={activeColor} height={14} />
              <span className={styles.value}>{d.value}%</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} onClick={() => downloadSvg(active, year)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
          </svg>
          SVG herunterladen
        </button>
      </div>
    </div>
  );
}

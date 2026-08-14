"use client";

import { useState, type ReactNode } from "react";
import BarChart from "@/components/BarChart";
import type { RankingView } from "@/lib/rankingViews";
import styles from "./RankingExplorer.module.css";

type RankingExplorerProps = {
  views: RankingView[];
  children?: ReactNode;
};

// Ports BarchartCtrl: holds only which view (Gesamt or a category) is active. Every
// view's row order was already fixed server-side in lib/rankingViews.ts, matching the
// original's behaviour where clicking a category swaps values but never re-sorts rows.
export default function RankingExplorer({ views, children }: RankingExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = views[activeIndex];

  return (
    <div className={styles.explorer}>
      <div className={styles.buttons}>
        {views.map((view, index) => (
          <button
            key={view.category}
            type="button"
            className={styles.button}
            style={{ borderLeft: `3px solid ${Array.isArray(view.color) ? view.color[0] : view.color}` }}
            onClick={() => setActiveIndex(index)}
          >
            {view.label}
          </button>
        ))}
        {active.info && (
          <div className={styles.info}>
            <strong>{active.label}</strong> {active.info}
          </div>
        )}
      </div>
      <div>
        <BarChart key={active.category} data={active.data} colors={active.color} max={100} />
        {children}
      </div>
    </div>
  );
}

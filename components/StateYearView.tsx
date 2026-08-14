"use client";

import { useState, type ReactNode } from "react";
import Bar from "@/components/Bar";
import IndicatorRow from "@/components/IndicatorRow";
import YearToggle from "@/components/YearToggle";
import { CATEGORY_COLORS, CATEGORY_ORDER, DEFAULT_YEAR, OVERVIEW_COLOR } from "@/lib/constants";
import type { CategoryName, StateYearData, Year } from "@/lib/types";
import styles from "./StateYearView.module.css";

type StateYearViewProps = {
  dataByYear: Record<Year, StateYearData>;
  children?: ReactNode;
};

// Holds the year toggle for a state page. Everything year-independent (the h1 and the
// markdown body, passed in as children so it renders between the category bars and the
// indicator sections — matching the original layout order) stays server-rendered in
// page.tsx; this covers the overview bar, the four category bars, and the indicator
// accordions, all of which vary by year.
export default function StateYearView({ dataByYear, children }: StateYearViewProps) {
  const [year, setYear] = useState<Year>(DEFAULT_YEAR);
  const { overview, indicators } = dataByYear[year];
  const gesamt = overview["Gesamt"];

  return (
    <div key={year}>
      <div className={styles.yearToggle}>
        <YearToggle value={year} onChange={setYear} />
      </div>

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

      {children}

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

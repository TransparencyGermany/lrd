"use client";

import { YEARS } from "@/lib/constants";
import type { Year } from "@/lib/types";
import styles from "./YearToggle.module.css";

type YearToggleProps = {
  value: Year;
  onChange: (year: Year) => void;
};

export default function YearToggle({ value, onChange }: YearToggleProps) {
  return (
    <div className={styles.toggle}>
      {YEARS.map((year) => (
        <button
          key={year}
          type="button"
          className={`${styles.button} ${year === value ? styles.active : ""}`}
          onClick={() => onChange(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

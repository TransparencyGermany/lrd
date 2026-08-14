"use client";

import { useState } from "react";
import CaretIcon from "@/components/icons/CaretIcon";
import PointsGrid from "@/components/PointsGrid";
import type { Indicator } from "@/lib/types";
import styles from "./IndicatorRow.module.css";

type IndicatorRowProps = {
  indicator: Indicator;
  color: string;
};

// Ports the per-indicator accordion row from _layouts/state.html. Replaces jQuery's
// slideToggle with a CSS grid-rows (0fr -> 1fr) transition, so no JS height measurement
// is needed.
export default function IndicatorRow({ indicator, color }: IndicatorRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.row}>
      <div>
        <dt className={styles.term} onClick={() => setOpen((o) => !o)}>
          {indicator.bezeichnung}
          <CaretIcon direction={open ? "down" : "right"} />
        </dt>
        <div className={`${styles.ddWrapper} ${open ? styles.open : ""}`}>
          <dd className={styles.dd}>
            <strong>Erklärung: </strong>
            {indicator.hintergrund}
            {indicator.erklaerung && (
              <>
                <br />
                <br />
                <strong>Ergebnis: </strong>
                {indicator.erklaerung}
              </>
            )}
          </dd>
        </div>
      </div>
      <div className={styles.points}>
        {indicator.erreichte_punkte} von {indicator.maximalpunkte}
      </div>
      <PointsGrid achieved={indicator.erreichte_punkte} max={indicator.maximalpunkte} color={color} />
    </div>
  );
}

import PointsGrid from "@/components/PointsGrid";
import type { Indicator } from "@/lib/types";
import styles from "./IndicatorRow.module.css";

type IndicatorRowProps = {
  indicator: Indicator;
  color: string;
  tint: string;
  open: boolean;
  onToggle: () => void;
};

// Ports the per-indicator accordion row from _layouts/state.html. Collapsed row shows
// just the title + a point-pill badge; squares/Erklärung/Ergebnis only render once
// expanded (previously the point-squares were always visible in the row).
export default function IndicatorRow({ indicator, color, tint, open, onToggle }: IndicatorRowProps) {
  return (
    <div className={styles.row}>
      <button type="button" className={styles.header} onClick={onToggle}>
        <h3 className={styles.title}>{indicator.bezeichnung}</h3>
        <div className={styles.meta}>
          <span className={styles.pointsBadge} style={{ color, background: tint }}>
            {indicator.erreichte_punkte} / {indicator.maximalpunkte}
          </span>
          <span className={styles.icon}>{open ? "−" : "+"}</span>
        </div>
      </button>
      {open && (
        <div className={styles.body}>
          <PointsGrid
            achieved={indicator.erreichte_punkte}
            max={indicator.maximalpunkte}
            color={color}
          />
          <div>
            <p className={styles.label} style={{ color }}>
              Erklärung
            </p>
            <p className={styles.text}>{indicator.hintergrund}</p>
          </div>
          {indicator.erklaerung && (
            <div>
              <p className={styles.label} style={{ color }}>
                Ergebnis
              </p>
              <p className={styles.text}>{indicator.erklaerung}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

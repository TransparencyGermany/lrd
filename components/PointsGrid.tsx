import styles from "./PointsGrid.module.css";

type PointsGridProps = {
  achieved: number;
  max: number;
  color: string;
};

// Small point-squares, capped at 10 even when maximalpunkte is higher — the squares are
// a proportional visual, not a literal one-per-point tally.
export default function PointsGrid({ achieved, max, color }: PointsGridProps) {
  if (max <= 0) return null;
  const squareCount = Math.min(max, 10);
  const filledCount = Math.round((achieved / max) * squareCount);

  return (
    <div className={styles.grid}>
      {Array.from({ length: squareCount }, (_, i) => (
        <span
          key={i}
          className={styles.square}
          style={{ background: i < filledCount ? color : "var(--point-empty)" }}
        />
      ))}
    </div>
  );
}

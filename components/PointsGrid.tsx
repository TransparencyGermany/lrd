type PointsGridProps = {
  achieved: number;
  max: number;
  color: string;
};

// Ports the dot-grid from _layouts/state.html: achieved squares are 1-indexed with a
// 14px left gutter (x = i*14 for i in 1..achieved), and the grey squares continue
// seamlessly from there (x = (i+1)*14 for i in achieved..max-1). No width/viewBox is
// set on the <svg>, matching the original exactly (it relies on the browser default).
export default function PointsGrid({ achieved, max, color }: PointsGridProps) {
  const achievedSquares = Array.from({ length: Math.max(achieved, 0) }, (_, idx) => idx + 1);
  const greySquares = Array.from({ length: Math.max(max - achieved, 0) }, (_, idx) => achieved + idx);

  return (
    <svg height={20}>
      <g>
        {achievedSquares.map((i) => (
          <rect key={`a-${i}`} width={10} height={10} x={i * 14} fill={color} />
        ))}
      </g>
      <g>
        {greySquares.map((i) => (
          <rect key={`g-${i}`} width={10} height={10} x={(i + 1) * 14} fill="grey" />
        ))}
      </g>
    </svg>
  );
}

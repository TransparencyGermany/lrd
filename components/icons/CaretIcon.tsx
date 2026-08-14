type CaretIconProps = {
  direction?: "right" | "down";
  className?: string;
};

// Replaces Font Awesome's fa-caret-right/fa-caret-down (the only two Font Awesome
// glyphs actually used on the site) with a small inline SVG — no icon-library dependency.
export default function CaretIcon({ direction = "right", className }: CaretIconProps) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={className}
      style={{
        display: "inline-block",
        marginLeft: "10px",
        transform: direction === "down" ? "rotate(90deg)" : undefined,
        transition: "transform 0.2s ease",
      }}
      aria-hidden="true"
    >
      <path d="M1 0 L9 5 L1 10 Z" fill="currentColor" />
    </svg>
  );
}

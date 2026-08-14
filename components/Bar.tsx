"use client";

import { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import styles from "./Bar.module.css";

type BarProps = {
  value: number;
  max?: number;
  color: string;
  label: string;
};

const HEIGHT = 26;

// Ports static/js/directives/bar.js's single progress bar. D3 is used only for the
// scaleLinear math; React owns every DOM node (no D3-driven .enter()/.transition()).
export default function Bar({ value, max = 100, color, label }: BarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Matches the original's d3 .transition() from width 0 to the real value on load.
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const xscale = scaleLinear().domain([0, max]).range([0, width]);
  const barWidth = grown ? xscale(value) : 0;
  const remaining = xscale(max) - barWidth;
  const textX = remaining > 50 ? barWidth + 10.5 : barWidth - 35;

  return (
    <div ref={containerRef} className={styles.barContainer}>
      <svg width={width} height={HEIGHT}>
        <rect className={styles.track} x={0} y={0} width={width} height={HEIGHT} />
        <rect className={styles.cap} x={Math.max(width - 2, 0)} y={0} width={2} height={HEIGHT} />
        <rect
          className={styles.value}
          x={0}
          y={0}
          width={barWidth}
          height={HEIGHT}
          style={{ fill: color }}
        />
        <text className={styles.text} x={textX} y={18}>
          {label}
        </text>
      </svg>
    </div>
  );
}

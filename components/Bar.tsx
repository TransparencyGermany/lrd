"use client";

import { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import styles from "./Bar.module.css";

type BarProps = {
  value: number;
  max?: number;
  color: string;
  height?: number;
};

// Ports static/js/directives/bar.js's single progress bar as a plain pill (track +
// filled div) instead of an <svg> — the redesign draws bar labels as separate DOM
// text next to the bar, so the bar itself no longer needs to lay out text internally.
export default function Bar({ value, max = 100, color, height = 12 }: BarProps) {
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

  return (
    <div ref={containerRef} className={styles.track} style={{ height }}>
      <div className={styles.value} style={{ width: barWidth, background: color }} />
    </div>
  );
}

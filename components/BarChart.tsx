"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { scaleLinear } from "d3-scale";
import type { BarChartDatum } from "@/lib/types";
import styles from "./BarChart.module.css";

type BarChartProps = {
  data: BarChartDatum[];
  colors: string | string[];
  max?: number;
};

const HEIGHT = 400;
const MARGIN = 100;
const BAR_PADDING = 70;
const ROW_HEIGHT = 20;

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWidthSnapshot(): number {
  return window.innerWidth > 600 ? 600 : 400;
}

// Server has no window, so it always renders at the mobile width; the client then
// syncs to the real width via useSyncExternalStore — the React-native way to read a
// browser-only value without a hydration mismatch or an effect-based setState.
function getServerWidthSnapshot(): number {
  return 400;
}

// Ports static/js/directives/barchart.js's ranked bar list. D3 is used only for the
// scaleLinear row/width math; React owns every DOM node.
export default function BarChart({ data, colors, max = 100 }: BarChartProps) {
  const width = useSyncExternalStore(subscribeToResize, getWidthSnapshot, getServerWidthSnapshot);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const xmax = max || Math.max(...data.map((d) => d.value));
  const barWidth = width - MARGIN;

  const yMargin = (i: number) => (i === data.length - 1 ? 20 : 0);
  const yscale = scaleLinear().domain([0, data.length]).range([0, HEIGHT]);
  const xscale = scaleLinear().domain([0, xmax]).range([0, barWidth - BAR_PADDING]);

  const trackWidth = xscale(xmax);

  return (
    <div className={styles.svgContainer}>
      <svg
        className={styles.svgContentResponsive}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${HEIGHT + 30}`}
      >
        {data.map((d, i) => {
          const y = yscale(i) + yMargin(i);
          const color = Array.isArray(colors) ? colors[i % colors.length] : colors;
          const valueWidth = grown ? xscale(d.value) : 0;
          const textX = trackWidth - valueWidth > 50 ? valueWidth + 10.5 : valueWidth - 35;

          return (
            <g key={d.slug}>
              <rect x={0} y={y} width={trackWidth} height={ROW_HEIGHT} fill="#e9eaee" />
              <a href={`/laender/${d.slug}/`} className={styles.rowLink}>
                <text x={trackWidth + 5} y={y + 15} className={styles.rowLabel}>
                  {d.name}
                </text>
              </a>
              <rect x={trackWidth - 2} y={y} width={2} height={ROW_HEIGHT} fill="#9aa9b8" />
              <rect
                x={0}
                y={y}
                width={valueWidth}
                height={ROW_HEIGHT}
                fill={color}
                className={styles.barValue}
              />
              <text x={textX} y={y + 14} className={styles.barText}>
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

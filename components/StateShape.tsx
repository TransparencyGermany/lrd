"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { STATE_PATHS } from "@/lib/statePaths";

type StateShapeProps = {
  name: string;
  color: string;
};

// The shared STATE_PATHS geometry was authored for the multi-state map's shared canvas,
// so an isolated single shape needs its own tight viewBox. SVGGraphicsElement.getBBox()
// ignores an element's own `transform`, so measuring the raw (untransformed) <path> gives
// exactly that — translate doesn't change width/height, only position, which we don't
// need here since we render the shape alone.
export default function StateShape({ name, color }: StateShapeProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);

  const state = STATE_PATHS.find((s) => s.name === name);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const box = el.getBBox();
    if (box.width && box.height) {
      const pad = Math.max(box.width, box.height) * 0.04;
      setViewBox(`${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`);
    }
  }, [name]);

  if (!state) return null;

  return (
    <svg
      viewBox={viewBox ?? "0 0 1 1"}
      style={{ width: "100%", height: "100%", opacity: viewBox ? 1 : 0 }}
      aria-hidden="true"
    >
      <path ref={pathRef} d={state.d} fill={color} />
    </svg>
  );
}

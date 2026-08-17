"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import CaretIcon from "@/components/icons/CaretIcon";
import { BUND_NAME } from "@/lib/constants";
import type { StateMeta } from "@/lib/types";
import styles from "./StatePicker.module.css";

type StatePickerProps = {
  states: StateMeta[];
  label?: string;
  menuAlign?: "left" | "right";
  variant?: "light" | "dark";
};

export default function StatePicker({
  states,
  label = "Bundesland wählen",
  menuAlign = "right",
  variant = "light",
}: StatePickerProps) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useLayoutEffect(() => {
    if (!open || !menuRef.current || !containerRef.current) return;
    const menuHeight = menuRef.current.getBoundingClientRect().height;
    const containerRect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;
    setOpenUpward(spaceBelow < menuHeight && spaceAbove > spaceBelow);
  }, [open]);

  const bund = states.find((s) => s.name === BUND_NAME);
  const rest = states
    .filter((s) => s.name !== BUND_NAME)
    .sort((a, b) => a.name.localeCompare(b.name, "de"));

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <button
        type="button"
        className={variant === "dark" ? `${styles.toggle} ${styles.toggleDark}` : styles.toggle}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <CaretIcon direction={open ? "down" : "right"} />
      </button>
      {open && (
        <ul
          ref={menuRef}
          className={openUpward ? `${styles.menu} ${styles.menuUp}` : styles.menu}
          style={menuAlign === "left" ? { right: "auto", left: 0 } : undefined}
        >
          {bund && (
            <li>
              <Link href={`/laender/${bund.slug}/`}>{bund.name}</Link>
            </li>
          )}
          <li className={styles.divider} role="separator" />
          {rest.map((state) => (
            <li key={state.slug}>
              <Link href={`/laender/${state.slug}/`}>{state.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

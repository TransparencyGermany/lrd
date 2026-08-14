"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUND_NAME } from "@/lib/constants";
import type { StateMeta } from "@/lib/types";
import styles from "./Header.module.css";

type HeaderProps = {
  states: StateMeta[];
};

// Replaces Bootstrap's data-toggle="dropdown" with local state + a click-outside-close
// listener. States list matches header.html: Bund pinned first, then the rest.
export default function Header({ states }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const bund = states.find((s) => s.name === BUND_NAME);
  const rest = states.filter((s) => s.name !== BUND_NAME);

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/img/logo.png"
          alt="Transparency International Deutschland e.V."
          width={294}
          height={85}
        />
      </Link>
      <div className={styles.dropdown} ref={containerRef}>
        <button
          type="button"
          className={styles.toggle}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Bundesland wählen
          <span className={styles.caret} />
        </button>
        {open && (
          <ul className={styles.menu}>
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
    </header>
  );
}

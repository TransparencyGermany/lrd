"use client";

import { useEffect, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionItem = {
  title: string;
  body: string;
};

type AccordionProps = {
  id?: string;
  items: AccordionItem[];
};

// Plain expand/collapse — multiple items can be open at once, matching the design's
// methodology accordion. When `id` matches the page's #hash on mount, force every item
// open and smooth-scroll here, so Header's cross-page "Methodik" link works from any page.
export default function Accordion({ id, items }: AccordionProps) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  useEffect(() => {
    if (!id || window.location.hash !== `#${id}`) return;
    // Syncing from the browser's URL fragment on mount — not derivable during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(Object.fromEntries(items.map((_, i) => [i, true])));
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div id={id} className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = !!open[index];
        return (
          <div key={item.title} className={styles.row}>
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setOpen((prev) => ({ ...prev, [index]: !prev[index] }))}
            >
              <h3
                className={styles.title}
                style={{ color: isOpen ? "var(--color-blue)" : "var(--text-heading)" }}
              >
                {item.title}
              </h3>
              <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <p className={styles.body}>{item.body}</p>}
          </div>
        );
      })}
    </div>
  );
}

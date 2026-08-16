"use client";

import { useRouter } from "next/navigation";
import { BUND_NAME, DEFAULT_YEAR } from "@/lib/constants";
import type { StateMeta } from "@/lib/types";
import styles from "./Hero.module.css";

type HeroProps = {
  states: StateMeta[];
};

export default function Hero({ states }: HeroProps) {
  const router = useRouter();
  const sortedStates = [...states]
    .filter((s) => s.name !== BUND_NAME)
    .sort((a, b) => a.name.localeCompare(b.name, "de"));

  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.badge}>Lobbyranking {DEFAULT_YEAR}</span>
        <h1 className={styles.heading}>Lobbyranking der Bundesländer {DEFAULT_YEAR}</h1>
        <p className={styles.intro}>
          Für unsere Demokratie ist die Transparenz und damit Nachvollziehbarkeit politischen
          Handelns unerlässlich. Um das Vertrauen in die demokratischen Institutionen und die
          Integrität der handelnden Personen zu stärken, sind moderne Regeln nötig.
          <br />
          <br />
          Das Ranking von Transparency Deutschland bietet einen übersichtlichen Vergleich der
          Transparenz- und Integritätsregeln in Deutschland. Wir bewerten, ob ein Lobbyregister,
          ein legislativer Fußabdruck, eine Karenzzeit für Regierungsmitglieder und eine
          Offenlegung von Nebentätigkeiten vorhanden sind – und wenn ja, in welcher Form. Auf
          dieser Grundlage entsteht das Lobbyranking.
          <br />
          <br />
          Unsere interaktive Webseite ermöglicht Ihnen, nach den Themenfeldern sowie nach den
          Bundesländern zu filtern und sich mit den Details der Regelungen vertraut zu machen.
        </p>
        <select
          className={styles.select}
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) router.push(`/laender/${e.target.value}/`);
          }}
        >
          <option value="" disabled>
            Bundesland wählen …
          </option>
          {sortedStates.map((state) => (
            <option key={state.slug} value={state.slug}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

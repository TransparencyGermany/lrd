import Accordion from "@/components/Accordion";
import DonateCta from "@/components/DonateCta";
import GermanyMap from "@/components/GermanyMap";
import Hero from "@/components/Hero";
import YearlyRankingExplorer from "@/components/YearlyRankingExplorer";
import { BUND_NAME, DEFAULT_YEAR, YEARS } from "@/lib/constants";
import { rankingDataByYear } from "@/lib/data";
import { buildRankingViews, type RankingView } from "@/lib/rankingViews";
import { getOverviewValues, getRankedStateNames } from "@/lib/scoring";
import { getAllStates } from "@/lib/states";
import type { Year } from "@/lib/types";
import styles from "./page.module.css";

export default function HomePage() {
  const states = getAllStates();
  const viewsByYear = Object.fromEntries(
    YEARS.map((year) => [year, buildRankingViews(rankingDataByYear[year], states)])
  ) as Record<Year, RankingView[]>;

  const defaultData = rankingDataByYear[DEFAULT_YEAR];
  const overviewValues = getOverviewValues(defaultData);
  const nameToSlug = new Map(states.map((s) => [s.name, s.slug]));
  const mapData = getRankedStateNames(defaultData)
    .filter((name) => name !== BUND_NAME)
    .map((name, index) => ({
      name,
      slug: nameToSlug.get(name) ?? "",
      rank: index + 1,
      score: overviewValues[name],
    }))
    .filter((d) => d.slug);

  return (
    <div>
      <Hero states={states} />

      <YearlyRankingExplorer viewsByYear={viewsByYear} />

      <DonateCta />

      <section className={styles.narrative}>
        <p className={styles.narrativeIntro}>
          Sowohl im Bund als auch in einigen Ländern haben sich in den vergangenen Jahren – auch
          ausgelöst durch Skandale wie die Aserbaidschanaffäre, den Maskenskandal, Wirecard und
          Cum-Ex – die Transparenz- und Integritätsregeln spürbar verbessert. Im Lobbyranking 2026 
          haben 12 der 16 Bundesländer gegenüber 2024 ihre Transparenz- und Integritätsregeln verbessert 
          – überwiegend jedoch nur in kleinen Schritten.
        </p>
        <div className={styles.kickerGrid}>
          <div>
            <h3 className={styles.kicker}>Große Lücken bleiben</h3>
            <p className={styles.kickerBody}>
              Wie schon im Jahre 2024 erreichen 13 Bundesländer auch im Lobbyranking 2026 nicht einmal die Hälfte
              der möglichen Transparency-Kriterien. Die Spanne zwischen dem besten Bundesland
              Bayern (59 % der erreichbaren Punkte) und am schwächsten abschneidenden
              Bundesland Bremen (9 % der erreichbaren Punkte) ist enorm. Trotz einzelner Verbesserungen bei den Verhaltensregeln
              bietet ein Großteil der Bundesländer noch immer zu wenig Nachvollziehbarkeit von politischen
              Entscheidungen für die Bürgerinnen und Bürger und zu viele Möglichkeiten für
              potenzielle illegitime Lobby-Einflussnahme.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Wechsel an der Spitze</h3>
            <p className={styles.kickerBody}>
              Baden-Württemberg übernimmt mit 59 % der erfüllten Kriterien die Spitzenposition 
              im Lobbyranking 2026. Bayern (56 %) verteidigt den zweiten Platz und baut seinen 
              Vorsprung auf das Mittelfeld weiter aus. Thüringen fällt aufgrund der anhaltenden 
              Vollzugsdefizite bei Lobbyregister und legislativem Fußabdruck trotz seiner auf 
              dem Papier weiterhin vorbildlichen Regelungen auf Platz 4 zurück. Newcomer ist Hamburg, 
              das mit seinem neu verabschiedeten Lobbyregister, das auch Elemente eines legislativen 
              Fußabdrucks enthält, direkt in die Spitzengruppe aufrückt. In der Gesamtschau 
              schneidet der Bund dank seiner Lobby- und Transparenzregeln mit 71 % 
              weiterhin besser ab als alle Bundesländer - auch wenn insbesondere beim exekutiven Fußabdruck
              Vollzugsdefizite bestehen bleiben.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Bewegung im Mittelfeld</h3>
            <p className={styles.kickerBody}>
              Rheinland-Pfalz verbessert sich durch strengere Karenzzeitregelungen sowie überarbeitete 
              Verhaltensregeln für Abgeordnete und steigt im Lobbyranking 2026 auf Platz 9. Hessen, Berlin 
              und Sachsen fallen dagegen im Ranking zurück, da sie im Vergleich zu anderen Ländern zuletzt 
              kaum Fortschritte bei Lobbytransparenz und Integritätsregeln erzielt haben.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Rote Laterne für Bremen</h3>
            <p className={styles.kickerBody}>
              An den hinteren Plätzen gibt es dagegen kaum Veränderungen. 
              Trotz leichter Verbesserungen bei den Verhaltensregeln bleiben Niedersachsen 
              und Sachsen-Anhalt im unteren Tabellenbereich. Bremen bildet mit 9 % der erfüllten 
              Kriterien weiterhin das Schlusslicht des Lobbyrankings.
            </p>
          </div>
        </div>
        <div className={styles.oldResults}>
          <p className={styles.oldResultsLabel}>Frühere Rankings zum Vergleich</p>
          <div className={styles.oldResultsLinks}>
            <a
              className={styles.oldResultLink}
              href={encodeURI("/files/Ergebnisse_Lobbyranking_2022 1.pdf")}
            >
              <DocIcon />
              Lobbyranking 2022
            </a>
            <a
              className={styles.oldResultLink}
              href={encodeURI("/files/Ergebnisse Lobbyranking 2021-zusammengefügt.pdf")}
            >
              <DocIcon />
              Lobbyranking 2021
            </a>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <h2 className={styles.mapHeading}>Wählen Sie für Details ein Bundesland aus</h2>
        <div className={styles.mapInner}>
          <GermanyMap data={mapData} />
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.whyIntro}>
          <h2>Warum haben wir das Lobbyranking erstellt?</h2>
          <p className={styles.body}>
            Auf Länderebene hatte sich bis 2021 bei den Integritätsregeln wenig getan. Die
            Arbeitsgruppe Politik von Transparency Deutschland sah sich daher in der Verantwortung,
            eine umfassende vergleichende Untersuchung durchzuführen und die Ergebnisse zu
            veröffentlichen. Ziel der Untersuchung war und ist es, die Öffentlichkeit für 
            diese für das Gemeinwohl bedeutsame Thematik zu sensibilisieren und bei den verantwortlichen 
            politischen Entscheidungstragenden das Bewusstsein für die Notwendigkeit möglichst schneller 
            und einheitlicher regulatorischer Änderungen zu stärken.
          </p>
          <div className={styles.kickerGrid2}>
            <div>
              <h3 className={styles.kicker}>Seit 2021 im Einsatz</h3>
              <p className={styles.kickerBody}>
                Mit dem Lobbyranking 2021 hat Transparency Deutschland erstmals die Transparenz- 
                und Integritätsregeln aller 16 Bundesländer in leicht verständlicher und transparenter
                 Form vergleichend erfasst und bewertet. Untersucht wurde, ob und in welchem Umfang in
                  den vier Bewertungsbereichen Regeln bestehen und wie diese konkret ausgestaltet sind. 
                  Gerade vor dem Hintergrund aktueller Entwicklungen – von schwindendem Vertrauen in
                   demokratische Institutionen bis hin zu Radikalisierungstendenzen – gewinnen moderne
                    Transparenz- und Integritätsregeln weiter an Bedeutung.
              </p>
            </div>
            <div>
              <h3 className={styles.kicker}>Aktualisierungen</h3>
              <p className={styles.kickerBody}>
                Seit der Erstveröffentlichung am 11. März 2021 aktualisiert Transparency Deutschland das
                 Lobbyranking regelmäßig, um die Entwicklungen der Transparenz- und Integritätsregeln in
                  den Bundesländern nachzuverfolgen und sichtbar zu machen. Die bisherigen Aktualisierungen
                   erfolgten am 10. März 2022 sowie am 13. August 2024.
              </p>
            </div>
          </div>
        </div>

        <Accordion
          id="methodik"
          items={[
            {
              title: "So haben wir getestet",
              body: "In allen 16 deutschen Bundesländern wurden die Regeln zur Sicherstellung von Transparenz und Integrität überprüft. Dabei wurde zwischen den Vorschriften zum Lobbyregister, zum legislativen Fußabdruck, zu den Karenzzeiten beim Ausscheiden aus dem Regierungsamt sowie zu den parlamentarischen Verhaltensregeln unterschieden. Für jedes Bundesland haben wir die entsprechenden gesetzlichen und innerparlamentarischen Regeln getrennt betrachtet und anhand fester Kriterien gewichtet. Zu Vergleichszwecken sind die Regelungen des Bundes in das Ranking mit einbezogen.",
            },
            {
              title: "So wurde gewichtet",
              body: "Die vier Variablen flossen zu je einem Viertel in die Bewertung ein und haben jeweils eine Maximalpunktzahl von 50 Punkten. Die Variablen selbst bestehen aus verschiedenen Unterkategorien mit teils unterschiedlicher Gewichtung. Anhand fester Kriterien wurden die Unterkategorien der vier Bereiche bewertet. Die Bewertungsschemata für die einzelnen Unterkategorien finden Sie in der verlinkten Excel im Footer. Die Ergebnisse der einzelnen Kategorien können grafisch im Detail für jedes einzelne Bundesland auf den Länderseiten nachvollzogen werden. Weitere Informationen sowie den Datensatz mit den Rohdaten finden Sie im Footer verlinkt.",
            },
          ]}
        />
      </section>
    </div>
  );
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
    </svg>
  );
}

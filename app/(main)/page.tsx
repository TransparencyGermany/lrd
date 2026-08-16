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
          Cum-Ex – die Transparenz- und Integritätsregeln spürbar verbessert. Im Lobbyranking 2024
          haben sich 12 der 16 Bundesländer gegenüber dem Lobbyranking 2022 leicht verbessert.
        </p>
        <div className={styles.kickerGrid}>
          <div>
            <h3 className={styles.kicker}>Große Lücken bleiben</h3>
            <p className={styles.kickerBody}>
              Dennoch erreichen 13 Bundesländer auch im Lobbyranking 2024 nicht einmal die Hälfte
              der möglichen Transparency-Kriterien. Die Spanne zwischen dem besten Bundesland
              Thüringen (69 % der erreichbaren Punkte) und am schwächsten abschneidenden
              Bundesland Bremen (9 % der erreichbaren Punkte) ist enorm. Ein Großteil der
              Bundesländer bietet damit noch immer zu wenig Nachvollziehbarkeit von politischen
              Entscheidungen für die Bürgerinnen und Bürger und zu viele Möglichkeiten für
              potenzielle illegitime Lobby-Einflussnahme.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Spitze baut Vorsprung aus</h3>
            <p className={styles.kickerBody}>
              Thüringen, das 69% der Kriterien erfüllt, konnte dank des im Juni 2024 vorgelegten
              Lobbyregisters seinen Spitzenplatz im Ranking souverän behaupten. Auf den folgenden
              Plätzen vergrößern Bayern (54%) und Baden-Württemberg (53%) dank neuer
              Karenzzeitregeln ihren Abstand zum Mittelfeld. In der Gesamtschau schneidet der Bund
              dank mittlerweile insgesamt recht guter Lobby- und Transparenzregeln mit 71% besser
              ab als alle Bundesländer.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Bewegung im Mittelfeld</h3>
            <p className={styles.kickerBody}>
              In der unteren Hälfte steigt Sachsen (24%) durch die Einführung von Karenzzeiten für
              ausscheidende Regierungsmitglieder um fünf Plätze auf und landet auf Platz 10 des
              Lobbyrankings 2024.
            </p>
          </div>
          <div>
            <h3 className={styles.kicker}>Rote Laterne für Bremen</h3>
            <p className={styles.kickerBody}>
              Andererseits verlieren Rheinland-Pfalz (19%), Niedersachsen (19%) und
              Sachsen-Anhalt (18%) aufgrund von Inaktivität vier bzw. drei Plätze und befinden
              sich auf den Rängen 13, 14 sowie 15. Die „rote Laterne“ behält Bremen (9%).
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
            veröffentlichen. Zweck der Bemühungen war und ist es, die Öffentlichkeit in dieser für
            das Gemeinwohl sehr bedeutsamen Angelegenheit zu sensibilisieren sowie bei den
            verantwortlichen politischen Entscheidungstragenden ein Bewusstsein für die
            Notwendigkeit möglichst schneller und einheitlicher regulatorischer Änderungen zu
            schaffen.
          </p>
          <div className={styles.kickerGrid2}>
            <div>
              <h3 className={styles.kicker}>Seit 2021 im Einsatz</h3>
              <p className={styles.kickerBody}>
                Erstmalig wurde mit dem Lobbyranking 2021 am 11. März 2021 in leicht
                verständlicher und transparenter Form für jedes einzelne Bundesland ermittelt, ob
                und falls ja, in welchem Umfang in den vier genannten Gebieten Regeln existieren
                und welchen genauen Inhalt sie haben. Gerade auf dem Hintergrund aktueller
                Entwicklungen, die von bröckelndem Vertrauen in die demokratischen Institutionen
                bis hin zu Radikalisierungstendenzen reichen, gewinnen moderne Transparenz- und
                Integritätsregeln weiter zunehmend an Bedeutung.
              </p>
            </div>
            <div>
              <h3 className={styles.kicker}>Aktualisierungen</h3>
              <p className={styles.kickerBody}>
                Die Webseite www.lobbyranking.de wurde am 11. März 2021 erstmals veröffentlicht
                und am 10. März 2022 sowie am 13. August 2024 aktualisiert.
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

import DownloadIcon from "@/components/icons/DownloadIcon";
import GermanyMap from "@/components/GermanyMap";
import YearlyRankingExplorer from "@/components/YearlyRankingExplorer";
import { YEARS } from "@/lib/constants";
import { rankingDataByYear } from "@/lib/data";
import { buildRankingViews, type RankingView } from "@/lib/rankingViews";
import { getAllStates } from "@/lib/states";
import type { Year } from "@/lib/types";
import styles from "./page.module.css";

export default function HomePage() {
  const states = getAllStates();
  const viewsByYear = Object.fromEntries(
    YEARS.map((year) => [year, buildRankingViews(rankingDataByYear[year], states)])
  ) as Record<Year, RankingView[]>;

  return (
    <div className="container">
      <div className={styles.intro}>
        <h1>Lobbyranking der Bundesländer 2026</h1>
        <p>
          Für unsere Demokratie ist die Transparenz und damit Nachvollziehbarkeit politischen
          Handelns unerlässlich. Um das Vertrauen in die demokratischen Institutionen und die
          Integrität der handelnden Personen zu stärken, sind moderne Regeln nötig.
          <br />
          <br />
          Das Ranking von Transparency Deutschland bietet einen übersichtlichen Vergleich der
          Transparenz- und Integritätsregeln in Deutschland. Wir bewerten, ob ein Lobbyregister, ein
          legislativer Fußabdruck, eine Karenzzeit für Regierungsmitglieder und eine Offenlegung von
          Nebentätigkeiten vorhanden sind – und wenn ja, in welcher Form. Auf dieser Grundlage
          entsteht das Lobbyranking.
          <br />
          <br />
          Unsere interaktive Webseite ermöglicht Ihnen, nach den Themenfeldern sowie nach den
          Bundesländern zu filtern und sich mit den Details der Regelungen vertraut zu machen.
        </p>
      </div>

      <YearlyRankingExplorer viewsByYear={viewsByYear}>
        <p className={styles.caption}>
          Balkendiagramm nach Gesamtergebnis sortiert. Stand der Erhebung: August 2024
        </p>
        <div className={styles.oldResults}>
          <p>Die Ergebnisse des Rankings von 2022 finden Sie zum Vergleich hier:</p>
          <a href={encodeURI("/files/Ergebnisse_Lobbyranking_2022 1.pdf")}>
            <DownloadIcon />
            Ergebnisse Lobbyranking 2022
            <br /> pdf | &lt;1MB
          </a>
          <p>Die Ergebnisse des Rankings von 2021 finden Sie zum Vergleich hier:</p>
          <a href={encodeURI("/files/Ergebnisse Lobbyranking 2021-zusammengefügt.pdf")}>
            <DownloadIcon />
            Ergebnisse Lobbyranking 2021
            <br /> pdf | &lt;1MB
          </a>
        </div>
      </YearlyRankingExplorer>

      <div className={styles.analysis}>
        <p>
          Sowohl im Bund als auch in einigen Ländern haben sich in den vergangenen Jahren – auch
          ausgelöst durch Skandale wie die Aserbaidschanaffäre, den Maskenskandal, Wirecard und
          Cum-Ex – die Transparenz- und Integritätsregeln spürbar verbessert. Im Lobbyranking 2024
          haben sich 12 der 16 Bundesländer gegenüber dem Lobbyranking 2022 leicht verbessert.
          <br />
          <br />
          Dennoch erreichen 13 Bundesländer auch im Lobbyranking 2024 nicht einmal die Hälfte der
          möglichen Transparency-Kriterien. Die Spanne zwischen dem besten Bundesland Thüringen (69 %
          der erreichbaren Punkte) und am schwächsten abschneidenden Bundesland Bremen (9 % der
          erreichbaren Punkte) ist enorm. Ein Großteil der Bundesländer bietet damit noch immer zu
          wenig Nachvollziehbarkeit von politischen Entscheidungen für die Bürgerinnen und Bürger und
          zu viele Möglichkeiten für potenzielle illegitime Lobby-Einflussnahme
          <br />
          <br />
          Thüringen, das 69% der Kriterien erfüllt, konnte dank des im Juni 2024 vorgelegten
          Lobbyregisters seinen Spitzenplatz im Ranking souverän behaupten. Auf den folgenden Plätzen
          vergrößern Bayern (54%) und Baden-Württemberg (53%) dank neuer Karenzzeitregeln ihren
          Abstand zum Mittelfeld. In der Gesamtschau schneidet der Bund dank mittlerweile insgesamt
          recht guter Lobby- und Transparenzregeln mit 71% besser ab als alle Bundesländer.
          <br />
          <br />
          In der unteren Hälfte steigt Sachsen (24%) durch die Einführung von Karenzzeiten für
          ausscheidende Regierungsmitglieder um fünf Plätze auf und landet auf Platz 10 des
          Lobbyrankings 2024. Andererseits verlieren Rheinland-Pfalz (19%), Niedersachsen (19%) und
          Sachsen-Anhalt (18%) aufgrund von Inaktivität vier bzw. drei Plätze und befinden sich auf
          den Rängen 13, 14 sowie 15. Die „rote Laterne“ behält Bremen (9%).
        </p>
      </div>

      <div className={styles.mapSection}>
        <h2 className="text-center">Wählen Sie für Details ein Bundesland aus</h2>
        <GermanyMap />

        <h2>Warum haben wir das Lobbyranking erstellt?</h2>
        <p>
          Auf Länderebene hatte sich bis 2021 bei den Integritätsregeln wenig getan. Die
          Arbeitsgruppe Politik von Transparency Deutschland sah sich daher in der Verantwortung, eine
          umfassende vergleichende Untersuchung durchzuführen und die Ergebnisse zu veröffentlichen.
          Zweck der Bemühungen war und ist es, die Öffentlichkeit in dieser für das Gemeinwohl sehr
          bedeutsamen Angelegenheit zu sensibilisieren sowie bei den verantwortlichen politischen
          Entscheidungstragenden ein Bewusstsein für die Notwendigkeit möglichst schneller und
          einheitlicher regulatorischer Änderungen zu schaffen.
          <br />
          <br />
          Erstmalig wurde mit dem Lobbyranking 2021 am 11. März 2021 in leicht verständlicher und
          transparenter Form für jedes einzelne Bundesland ermittelt, ob und falls ja, in welchem
          Umfang in den vier genannten Gebieten Regeln existieren und welchen genauen Inhalt sie
          haben. Gerade auf dem Hintergrund aktueller Entwicklungen, die von bröckelndem Vertrauen in
          die demokratischen Institutionen bis hin zu Radikalisierungstendenzen reichen, gewinnen
          moderne Transparenz- und Integritätsregeln weiter zunehmend an Bedeutung.
          <br />
          <br />
          Die Webseite www.lobbyranking.de wurde am 11. März 2021 erstmals veröffentlicht und am 10.
          März 2022 sowie am 13. August 2024 aktualisiert.
        </p>

        <h2>So haben wir getestet</h2>
        <p>
          In allen 16 deutschen Bundesländern wurden die Regeln zur Sicherstellung von Transparenz
          und Integrität überprüft. Dabei wurde zwischen den Vorschriften zum Lobbyregister, zum
          legislativen Fußabdruck, zu den Karenzzeiten beim Ausscheiden aus dem Regierungsamt sowie
          zu den parlamentarischen Verhaltensregeln unterschieden. Für jedes Bundesland haben wir die
          entsprechenden gesetzlichen und innerparlamentarischen Regeln getrennt betrachtet und
          anhand fester Kriterien (siehe unten) gewichtet. Zu Vergleichszwecken sind die Regelungen
          des Bundes in das Ranking mit einbezogen.
        </p>

        <h3>So wurde gewichtet</h3>
        <p>
          Die vier Variablen flossen zu je einem Viertel in die Bewertung ein und haben jeweils eine
          Maximalpunktzahl von 50 Punkten. Die Variablen selbst bestehen aus verschiedenen
          Unterkategorien mit teils unterschiedlicher Gewichtung. Anhang fester Kriterien wurden die
          Unterkategorien der vier Bereiche bewertet. Die Bewertungsschemata für die einzelnen
          Unterkategorien finden Sie in der verlinkten Excel im Footer. Die Ergebnisse der einzelnen
          Kategorien können grafisch im Detail für jedes einzelne Bundesland auf den Länderseiten
          nachvollzogen werden.
        </p>
        <p>Weitere Informationen sowie den Datensatz mit den Rohdaten finden Sie im Footer verlinkt.</p>

        <h2>Das Lobbyranking gibt es nur dank Ihnen!</h2>
        <p>
          Transparency Deutschland finanziert das Lobbyranking über Spenden und Förderbeiträge. Wenn
          Sie die Fortführung des Projekts unterstützen möchten, dann greifen Sie uns gern mit einem
          finanziellen Beitrag unter die Arme!
          <br />
          <br />
          <a href="https://www.transparency.de/jetzt-spenden">Jetzt unterstützen</a>
        </p>
      </div>
    </div>
  );
}

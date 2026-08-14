import Image from "next/image";
import DownloadIcon from "@/components/icons/DownloadIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2>Über das Lobbyranking</h2>
        <div className={styles.columns}>
          <div>
            <h3>Die Erhebung</h3>
            <p>
              Für das Funktionieren einer Demokratie ist die Integrität der handelnden Personen von
              nicht zu unterschätzender Bedeutung. In besonderem Maße gilt dies für den Prozess der
              Entstehung der Gesetze. Wir haben die entsprechenden Lobbygesetze in den deutschen
              Bundesländern miteinander verglichen.
            </p>

            <h3>Downloads</h3>
            <div className={styles.downloads}>
              <p>
                <a href="/files/Broschu__re_Lobbyranking_2203_01_gelayoutet.pdf">
                  <DownloadIcon />
                  Die Broschüre zum Ranking
                  <br /> pdf | &lt;1MB
                </a>
              </p>
              <p>
                <a href="/files/Der_Datensatz_13.08.24.xlsx">
                  <DownloadIcon />
                  Der Datensatz - Analysen und Auswertung (excel)
                </a>
              </p>
            </div>

            <h3>Kontakt</h3>
            <p>
              Die Arbeitsgruppe Politik arbeitet ehrenamtlich für Transparency Deutschland. Wir freuen
              uns sehr über Feedback, Kritik und Fragen. Bitte teilen Sie uns mit, wenn Sie andere
              Informationen haben oder Ihnen ein Datenfehler auffällt. Kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:office@transparency.de">office@transparency.de</a> (
              <a href="https://www.transparency.de/rechtliches/impressum/">Impressum</a>).
            </p>
          </div>

          <div>
            <h3>Das Projekt</h3>
            <p>
              Das Lobbyranking der Bundesländer ist ein Projekt der Arbeitsgruppe Politik des
              gemeinnützigen Vereins Transparency International Deutschland e.V.. Der Quellcode wurde
              uns dankenswerterweise von der Open Knowledge Foundation Deutschland e.V. und Mehr
              Demokratie e.V. zur Verfügung gestellt. Er ist zu finden{" "}
              <a href="https://github.com/TransparencyGermany/lrd">auf Github</a>. Verwendete Tools
              sind CartoDB, QGis und Gephi, die Frameworks Next.js und React sowie die Scriptsprachen
              TypeScript, R und JavaScript.
            </p>
            <a href="https://www.transparency.de/" target="_blank" rel="noreferrer">
              <Image
                className={styles.logo}
                src="/img/logo.png"
                alt="Transparency International Deutschland e.V."
                width={294}
                height={85}
              />
            </a>

            <h3>Copyright</h3>
            <p>
              Dieses Werk und die Daten sind lizenziert unter Creative Commons Namensnennung 4.0
              International (
              <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>).
            </p>

            <h3>Impressum</h3>
            <p>
              Verantwortlicher Diensteanbieter für diese Homepage ist der Verein Transparency
              International Deutschland e.V.{" "}
              <a href="https://www.transparency.de/rechtliches/impressum/">Impressum</a>. Alle Angaben
              ohne Gewähr.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

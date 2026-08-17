import DownloadIcon from "@/components/icons/DownloadIcon";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="ueber-uns" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Über das Lobbyranking</h2>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.colHeading}>Die Erhebung</h3>
            <p className={styles.body}>
              Für das Funktionieren einer Demokratie ist die Integrität der handelnden Personen
              von nicht zu unterschätzender Bedeutung. In besonderem Maße gilt dies für den
              Prozess der Entstehung der Gesetze. Wir haben die entsprechenden Lobbygesetze in den
              deutschen Bundesländern miteinander verglichen.
            </p>
          </div>

          <div>
            <h3 className={styles.colHeading}>Downloads</h3>
            <div className={styles.downloads}>
              <a href="/files/Broschu__re_Lobbyranking_2203_01_gelayoutet.pdf">
                <DownloadIcon />
                Die Ranking Broschüre
              </a>
              <a href="/files/Der_Datensatz_13.08.24.xlsx">
                <DownloadIcon />
                Der Ranking Datensatz (excel)
              </a>
            </div>
          </div>

          <div>
            <h3 className={styles.colHeading}>Kontakt</h3>
            <p className={styles.body}>
              Die Arbeitsgruppe Politik arbeitet ehrenamtlich für Transparency Deutschland. Wir
              freuen uns sehr über Feedback, Kritik und Fragen. Bitte teilen Sie uns mit, wenn Sie
              andere Informationen haben oder Ihnen ein Datenfehler auffällt. Kontaktieren Sie uns
              bitte unter <a href="mailto:office@transparency.de">office@transparency.de</a> (
              <a href="https://www.transparency.de/rechtliches/impressum/">Impressum</a>).
            </p>
          </div>

          <div>
            <h3 className={styles.colHeading}>Das Projekt</h3>
            <p className={styles.body}>
              Das Lobbyranking der Bundesländer ist ein Projekt der Arbeitsgruppe Politik des
              gemeinnützigen Vereins Transparency International Deutschland e.V.. Der Quellcode
              wurde uns dankenswerterweise von der Open Knowledge Foundation Deutschland e.V. und
              Mehr Demokratie e.V. zur Verfügung gestellt. Er ist zu finden{" "}
              <a href="https://github.com/TransparencyGermany/lrd">auf Github</a>. Die Seite ist
              mit dem Framework Next.js (React) und der Sprache TypeScript umgesetzt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

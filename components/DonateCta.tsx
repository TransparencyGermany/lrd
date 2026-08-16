import styles from "./DonateCta.module.css";

export default function DonateCta() {
  return (
    <div className={styles.cta}>
      <div>
        <h2 className={styles.heading}>Das Lobbyranking gibt es nur dank Ihnen!</h2>
        <p className={styles.body}>
          Transparency Deutschland finanziert das Lobbyranking über Spenden und Förderbeiträge.
          Wenn Sie die Fortführung des Projekts unterstützen möchten, dann greifen Sie uns gern
          mit einem finanziellen Beitrag unter die Arme!
        </p>
      </div>
      <a className={styles.button} href="https://www.transparency.de/jetzt-spenden">
        Jetzt unterstützen
      </a>
    </div>
  );
}

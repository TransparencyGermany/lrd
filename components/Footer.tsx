import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Dieses Werk und die Daten sind lizenziert unter Creative Commons Namensnennung 4.0
        International (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>).
      </p>
      <p>
        Verantwortlicher Diensteanbieter für diese Homepage ist der Verein Transparency
        International Deutschland e.V. ·{" "}
        <a href="https://www.transparency.de/rechtliches/impressum/">Impressum</a>
      </p>
    </footer>
  );
}

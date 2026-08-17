import Image from "next/image";
import Link from "next/link";
import StatePicker from "@/components/StatePicker";
import type { StateMeta } from "@/lib/types";
import styles from "./Header.module.css";

type HeaderProps = {
  states: StateMeta[];
};

export default function Header({ states }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <Image
            className={styles.logo}
            src="/img/logo.png"
            alt="Transparency International Deutschland e.V."
            width={294}
            height={85}
          />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            <Link href="/#methodik">Methodik</Link>
            <a href="https://www.transparency.de/ueber-uns/wer-sind-wir" target="_blank" rel="noopener noreferrer">
              Über uns
            </a>
          </nav>

          <StatePicker states={states} />
        </div>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import AboutSection from "@/components/AboutSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter } from "@/lib/fonts";
import { getAllStates } from "@/lib/states";
import { SITE_URL } from "@/lib/constants";
import styles from "./layout.module.css";

const DESCRIPTION = "lobbyranking.de vergleicht alle Lobbyregelungen Deutschlands";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Integrität der handelnden Personen - Das Lobbyranking der Bundesländer",
    template: "%s - Lobbyranking der Bundesländer",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Lobbyranking",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/img/logo__transparency.png", width: 462, height: 132 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lobbyranking",
    description: DESCRIPTION,
    images: ["/img/logo__transparency.png"],
  },
};

export default function MainLayout({ children }: { children: ReactNode }) {
  const states = getAllStates();

  return (
    <html lang="de" className={inter.variable}>
      <body>
        <div className={styles.canvas}>
          <div className={styles.card}>
            <Header states={states} />
            {children}
            <AboutSection />
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

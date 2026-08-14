import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllStates } from "@/lib/states";

const DESCRIPTION = "lobbyranking.de vergleicht alle Lobbyregelungen Deutschlands";

export const metadata: Metadata = {
  metadataBase: new URL("https://lobbyranking.de"),
  title: {
    default: "Integrität der handelnden Personen - Das Lobbyranking der Bundesländer",
    template: "%s - Lobbyranking der Bundesländer",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Lobbyranking",
    description: DESCRIPTION,
    url: "https://lobbyranking.de",
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
    <html lang="de">
      <body>
        <Header states={states} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

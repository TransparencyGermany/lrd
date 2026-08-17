import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Lobbyranking",
};

// Bare layout — no Header/Footer, matching _layouts/embed.html — for embedding the
// chart standalone in an iframe elsewhere.
export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

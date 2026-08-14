// Rebuilds data/data.json from the public Google Sheet that holds the ranking data.
// Run manually with `npm run fetch-data` and commit the result — this is intentionally
// NOT wired into `npm run build`, so Render builds never depend on Google Sheets.
//
// The original build.js used the `tabletop` package, which talks to Google's old
// "GData list feed" API (spreadsheets.google.com/feeds/...). That API has since been
// shut down entirely (confirmed while porting this script — it now 404s), so tabletop
// would no longer work even if kept. This uses Google's still-live "gviz" query
// endpoint instead (the same one Google Sheets' own published-chart embeds use), via
// native fetch — no dependency needed, and no API key required for a publicly viewable
// sheet.
//
// If this ever starts failing, the sheet's tab→gid mapping below may be stale (tabs
// were added/removed/renamed). Regenerate it by opening
// https://docs.google.com/spreadsheets/d/<KEY>/pubhtml in a browser, viewing source,
// and searching for `name: "..."` / `gid: "..."` pairs in the embedded tab-switcher script.

import fs from "fs";
import path from "path";
import type { CategoryName } from "../lib/types";

const SHEET_KEY = "1eMAdjdADNSFxl1J2IV15G0byzb5cVHEh-G8u0inasJY";

const SHEET_TABS: Record<string, string> = {
  "Baden-Württemberg": "19197400",
  Bayern: "70703830",
  Berlin: "1226811839",
  Brandenburg: "904159823",
  Bremen: "528476932",
  Hamburg: "525006765",
  Hessen: "1297581146",
  "Mecklenburg-Vorpommern": "1781611954",
  Niedersachsen: "665579941",
  "Nordrhein-Westfalen": "230883534",
  "Rheinland-Pfalz": "1893522980",
  Saarland: "77623434",
  Sachsen: "350108442",
  "Sachsen-Anhalt": "1666154623",
  "Schleswig-Holstein": "2135637747",
  Thüringen: "499473835",
  Bund: "789793112",
};

const CATEGORIES: Record<CategoryName, string> = {
  Lobbyregister:
    "Unter einem Lobbyregister versteht man eine öffentliche Liste von allen Lobbyist:innen, welche als Mitglied bestimmter Gruppen wie etwa Unternehmen oder in deren Auftrag auf den politischen Prozess in schriftlicher oder sonstiger Weise Einfluss nehmen wollen.",
  "Legislativer Fußabdruck":
    "Manchmal auch exekutiver Fußabdruck genannt. Inhaltliche und chronologische Aufzeichnung der Entstehung einer Gesetzesvorlage sowie Nennung der an der Entstehung Beteiligten und ihrer Beiträge. So soll transparent werden, welche Interessen sich möglicherweise in Gesetzesvorhaben widerspiegeln.",
  Karenzzeit:
    "Eine „Wartezeit, Sperrfrist, vor deren Ablauf eine bestimmte Erlaubnis nicht erteilt wird“. In der Politik bedeutet eine Karenzzeit, dass aus ihrem Amt ausgeschiedene Regierungsmitglieder und SpitzenbeamtInnen bis zu einem Wechsel in die Privatwirtschaft eine bestimmte Zeit warten müssen.",
  Verhaltensregeln:
    "Verhaltensregeln listen eine Reihe von Anzeigepflichten und Verbotstatbeständen auf und enthalten meist auch Sanktionen. Sie stehen in einem Spannungsfeld zum Grundsatz der freien Mandatsausübung und dienen der Sicherung der Integrität des Handelns der Volksvertreter.",
};

interface GvizCell {
  v: string | number | null;
}

interface GvizResponse {
  table: {
    cols: { label: string }[];
    rows: { c: (GvizCell | null)[] }[];
  };
}

async function fetchSheetRows(gid: string): Promise<Record<string, unknown>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_KEY}/gviz/tq?tqx=out:json&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${url}`);
  }
  const text = await res.text();
  // Response body is wrapped as: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const json = text.slice(text.indexOf("(") + 1, text.lastIndexOf(")"));
  const data: GvizResponse = JSON.parse(json);

  const columns = data.table.cols
    .map((col, index) => ({ label: col.label, index }))
    .filter((col) => col.label !== "");

  return data.table.rows.map((row) => {
    const element: Record<string, unknown> = {};
    for (const { label, index } of columns) {
      const cell = row.c[index];
      element[label] = cell?.v ?? "";
    }
    return element;
  });
}

async function main() {
  const states: Record<string, Record<string, unknown>[]> = {};

  await Promise.all(
    Object.entries(SHEET_TABS).map(async ([name, gid]) => {
      states[name] = await fetchSheetRows(gid);
    })
  );

  const output = { categories: CATEGORIES, states };
  const outPath = path.join(process.cwd(), "data", "data.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

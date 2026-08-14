import fs from "fs";
import path from "path";
import { DEFAULT_YEAR, YEARS } from "@/lib/constants";
import type { CategoryName, Indicator, RankingData, Year } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

interface RawRankingData {
  categories: Record<string, string>;
  states: Record<string, Record<string, unknown>[]>;
}

// data_2026.json is a UTF-16LE Excel-style export (unlike data_2024.json, which is
// plain UTF-8) — decode based on a BOM sniff rather than assuming either encoding.
// Node's Buffer#toString doesn't strip a decoded BOM character itself, so drop a
// leading U+FEFF from the result regardless of which branch produced it.
function decodeDataFile(filename: string): string {
  const buffer = fs.readFileSync(path.join(DATA_DIR, filename));
  const isUtf16le = buffer[0] === 0xff && buffer[1] === 0xfe;
  const text = isUtf16le ? buffer.toString("utf16le") : buffer.toString("utf-8");
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// data_2026.json has a handful of rows where erreichte_punkte is a string ("0")
// instead of a number, and erklaerung is entirely unset (0) rather than text —
// normalize both here so every downstream consumer can rely on correct types
// without repeating these checks. A no-op for the already-clean 2024 data.
function normalizeIndicator(raw: Record<string, unknown>): Indicator {
  return {
    kategorie: raw.kategorie as CategoryName,
    bezeichnung: toText(raw.bezeichnung),
    hintergrund: toText(raw.hintergrund),
    erklaerung: toText(raw.erklaerung),
    erreichte_punkte: Number(raw.erreichte_punkte) || 0,
    maximalpunkte: Number(raw.maximalpunkte) || 0,
  };
}

function loadRankingData(filename: string): RankingData {
  const parsed = JSON.parse(decodeDataFile(filename)) as RawRankingData;
  const states = Object.fromEntries(
    Object.entries(parsed.states).map(([name, indicators]) => [
      name,
      indicators.map(normalizeIndicator),
    ])
  );
  return { categories: parsed.categories as RankingData["categories"], states };
}

export const rankingDataByYear: Record<Year, RankingData> = Object.fromEntries(
  YEARS.map((year) => [year, loadRankingData(`data_${year}.json`)])
) as Record<Year, RankingData>;

export const rankingData: RankingData = rankingDataByYear[DEFAULT_YEAR];

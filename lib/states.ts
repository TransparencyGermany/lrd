import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { StateMeta } from "@/lib/types";

const STATES_DIR = path.join(process.cwd(), "content", "states");

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function parseStateFile(filename: string): StateMeta {
  const slug = slugFromFilename(filename);
  const raw = fs.readFileSync(path.join(STATES_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    name: data.name,
    slug,
    title: data.title,
    ifgYear: data.ifg_year,
    ifgType: data.ifg_type,
    ifgLink: data.ifg_link,
    status: data.status === "draft" ? "draft" : "complete",
    bodyHtml: marked.parse(content, { async: false }),
  };
}

export function getAllStates(): StateMeta[] {
  return fs
    .readdirSync(STATES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseStateFile)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getAllStateSlugs(): string[] {
  return getAllStates().map((s) => s.slug);
}

export function getStateBySlug(slug: string): StateMeta | undefined {
  return getAllStates().find((s) => s.slug === slug);
}

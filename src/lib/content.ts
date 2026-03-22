import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../data/site";

export async function getEntries(kind: "work", lang: Lang): Promise<Array<CollectionEntry<"work">>>;
export async function getEntries(kind: "methods", lang: Lang): Promise<Array<CollectionEntry<"methods">>>;
export async function getEntries(kind: "work" | "methods", lang: Lang) {
  const entries = await getCollection(kind, ({ data }) => data.lang === lang);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedWork(lang: Lang) {
  const entries = await getEntries("work", lang);
  return entries.filter((entry) => entry.data.featured);
}

export async function getMethodPreview(lang: Lang, limit = 2) {
  const entries = await getEntries("methods", lang);
  return entries.slice(0, limit);
}

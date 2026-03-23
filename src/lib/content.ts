import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../data/site";

type Entry = CollectionEntry<"work"> | CollectionEntry<"methods">;

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

export async function getRelatedEntries(entry: Entry, lang: Lang): Promise<Entry[]> {
  const [workEntries, methodEntries] = await Promise.all([
    getCollection("work", ({ data }) => data.lang === lang),
    getCollection("methods", ({ data }) => data.lang === lang),
  ]);

  const relatedMap = new Map<string, Entry>(
    [...workEntries, ...methodEntries].map((relatedEntry) => [relatedEntry.data.id, relatedEntry]),
  );

  return entry.data.related
    .map((relatedId) => relatedMap.get(relatedId))
    .filter((relatedEntry): relatedEntry is Entry => Boolean(relatedEntry));
}

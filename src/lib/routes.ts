import type { CollectionEntry } from "astro:content";
import type { Lang } from "../data/site";

type Entry = CollectionEntry<"work"> | CollectionEntry<"methods">;
type Kind = "work" | "method";

export function getHomePath(lang: Lang) {
  return lang === "ko" ? "/ko/" : "/";
}

export function getIndexPath(kind: Kind, lang: Lang) {
  const prefix = lang === "ko" ? "/ko" : "";
  return `${prefix}/${kind === "work" ? "work" : "methods"}/`;
}

export function getEntryPath(kind: Kind, id: string, lang: Lang) {
  return `${getIndexPath(kind, lang)}${id}/`;
}

export function getLanguagePartnerPath(entry: Entry) {
  const partnerLang: Lang = entry.data.lang === "en" ? "ko" : "en";
  return getEntryPath(entry.data.kind, entry.data.id, partnerLang);
}

export function getPageLabel(kind: Kind, lang: Lang) {
  if (kind === "work") {
    return lang === "ko" ? "케이스 스터디" : "Case study";
  }

  return lang === "ko" ? "방법론" : "Method";
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, "https://yongjip.github.io").toString();
}

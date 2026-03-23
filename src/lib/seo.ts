import type { CollectionEntry } from "astro:content";
import { HOME_COPY, PROFILE_LINKS, SITE_OWNER, type Lang } from "../data/site";
import { getHomePath, toAbsoluteUrl } from "./routes";

type Entry = CollectionEntry<"work"> | CollectionEntry<"methods">;

export type JsonLdNode = Record<string, unknown>;

export const SITE_OG_IMAGE_URL = "https://yongjip.github.io/resources/og/portfolio-cover.png";

const SEO_LOCALE = {
  en: {
    ogLocale: "en_US",
    alternateOgLocale: "ko_KR",
    schemaLanguage: "en",
  },
  ko: {
    ogLocale: "ko_KR",
    alternateOgLocale: "en_US",
    schemaLanguage: "ko",
  },
} as const;

export function getSeoLocale(lang: Lang) {
  return SEO_LOCALE[lang];
}

function getHomeUrl(lang: Lang) {
  return toAbsoluteUrl(getHomePath(lang));
}

function buildPersonNode(lang: Lang): JsonLdNode {
  const homeUrl = getHomeUrl(lang);

  return {
    "@type": "Person",
    "@id": `${homeUrl}#person`,
    name: SITE_OWNER[lang],
    url: homeUrl,
    description: HOME_COPY[lang].description,
    sameAs: [PROFILE_LINKS.linkedin, PROFILE_LINKS.github],
  };
}

function buildWebsiteNode(lang: Lang): JsonLdNode {
  const homeUrl = getHomeUrl(lang);

  return {
    "@type": "WebSite",
    "@id": `${homeUrl}#website`,
    url: homeUrl,
    name: SITE_OWNER[lang],
    description: HOME_COPY[lang].description,
    inLanguage: getSeoLocale(lang).schemaLanguage,
  };
}

export function buildHomeSchemas(lang: Lang): JsonLdNode[] {
  return [buildWebsiteNode(lang), buildPersonNode(lang)];
}

export function buildCollectionPageSchema({
  lang,
  title,
  description,
  canonical,
}: {
  lang: Lang;
  title: string;
  description: string;
  canonical: string;
}): JsonLdNode[] {
  return [
    {
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: getSeoLocale(lang).schemaLanguage,
      isPartOf: buildWebsiteNode(lang),
      about: buildPersonNode(lang),
    },
  ];
}

export function buildArticleSchema({
  entry,
  lang,
  canonical,
}: {
  entry: Entry;
  lang: Lang;
  canonical: string;
}): JsonLdNode[] {
  const description = entry.data.ogDescription ?? entry.data.description;

  return [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: entry.data.ogTitle ?? entry.data.title,
      description,
      url: canonical,
      image: SITE_OG_IMAGE_URL,
      inLanguage: getSeoLocale(lang).schemaLanguage,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      author: buildPersonNode(lang),
      publisher: buildPersonNode(lang),
      isPartOf: buildWebsiteNode(lang),
    },
  ];
}

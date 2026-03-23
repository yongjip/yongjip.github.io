import type { Lang } from "../data/site";

const DISPLAY_FORMATTERS = {
  en: new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  ko: new Intl.DateTimeFormat("ko-KR", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
} as const;

export function toIsoDateTime(date: string) {
  return new Date(`${date}T00:00:00Z`).toISOString();
}

export function formatDisplayDate(date: string, lang: Lang) {
  return DISPLAY_FORMATTERS[lang].format(new Date(`${date}T00:00:00Z`));
}

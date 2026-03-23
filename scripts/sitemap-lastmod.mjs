import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHARED_LAYOUT_FILES = [
  "src/layouts/BaseLayout.astro",
  "src/components/SiteHeader.astro",
  "src/components/SiteFooter.astro",
];
const DETAIL_LAYOUT_FILES = [
  ...SHARED_LAYOUT_FILES,
  "src/components/DetailPageLayout.astro",
  "src/components/ArticleHeader.astro",
  "src/components/WorkCard.astro",
];

function getGitLastModified(filePath) {
  try {
    const output = execFileSync("git", ["log", "-1", "--format=%cI", "--", filePath], {
      cwd: ROOT_DIR,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return output ? new Date(output) : undefined;
  } catch {
    return undefined;
  }
}

function getLatestDate(files) {
  return files.reduce((latest, filePath) => {
    const modifiedAt = getGitLastModified(filePath);

    if (!modifiedAt) {
      return latest;
    }

    return !latest || modifiedAt > latest ? modifiedAt : latest;
  }, undefined);
}

function listContentFiles(contentRoot) {
  return fs
    .readdirSync(path.join(ROOT_DIR, contentRoot), { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
    .map((entry) => path.posix.join(contentRoot, entry.name));
}

function toContentRoute(kind, lang, filePath) {
  const slug = path.basename(filePath).replace(/\.(md|mdx)$/u, "");
  const prefix = lang === "ko" ? "/ko" : "";
  const segment = kind === "work" ? "work" : "methods";

  return `${prefix}/${segment}/${slug}/`;
}

export function buildSitemapLastmodMap() {
  const routeLastmod = new Map();

  const staticRoutes = new Map([
    ["/", ["src/pages/index.astro", ...SHARED_LAYOUT_FILES]],
    ["/ko/", ["src/pages/ko/index.astro", ...SHARED_LAYOUT_FILES]],
    ["/work/", ["src/pages/work/index.astro", ...SHARED_LAYOUT_FILES]],
    ["/ko/work/", ["src/pages/ko/work/index.astro", ...SHARED_LAYOUT_FILES]],
    ["/methods/", ["src/pages/methods/index.astro", ...SHARED_LAYOUT_FILES]],
    ["/ko/methods/", ["src/pages/ko/methods/index.astro", ...SHARED_LAYOUT_FILES]],
  ]);

  for (const [route, files] of staticRoutes) {
    const lastmod = getLatestDate(files);
    if (lastmod) {
      routeLastmod.set(route, lastmod);
    }
  }

  const contentConfigs = [
    { kind: "work", lang: "en", root: "src/content/work/en" },
    { kind: "work", lang: "ko", root: "src/content/work/ko" },
    { kind: "method", lang: "en", root: "src/content/methods/en" },
    { kind: "method", lang: "ko", root: "src/content/methods/ko" },
  ];

  for (const config of contentConfigs) {
    for (const filePath of listContentFiles(config.root)) {
      const route = toContentRoute(config.kind, config.lang, filePath);
      const lastmod = getLatestDate([filePath, ...DETAIL_LAYOUT_FILES]);

      if (lastmod) {
        routeLastmod.set(route, lastmod);
      }
    }
  }

  return routeLastmod;
}

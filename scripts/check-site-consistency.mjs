import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(rootDir, "src", "content");

const collections = {
  work: {
    requiredLabels: {
      en: ["Overview", "Results", "Takeaways"],
      ko: ["개요", "결과", "배운 점"],
    },
    allowedLabels: {
      en: [
        "Overview",
        "Workflow",
        "Method",
        "Results",
        "Takeaways",
        "Related work",
        "Constraints",
        "Decision logic",
        "Outputs",
        "Flow",
        "Graph construction",
        "Simulation",
        "System flow",
      ],
      ko: [
        "개요",
        "워크플로우",
        "흐름",
        "방법",
        "결과",
        "배운 점",
        "관련 작업",
        "제약 조건",
        "의사결정 로직",
        "출력",
        "그래프 구성",
        "시뮬레이션",
        "시스템 흐름",
      ],
    },
  },
  methods: {
    requiredLabels: {
      en: ["Overview", "Method", "Why it matters", "Source"],
      ko: ["개요", "방법", "왜 중요한가", "원문"],
    },
    allowedLabels: {
      en: ["Overview", "Method", "Why it matters", "Source", "Related work"],
      ko: ["개요", "방법", "왜 중요한가", "원문", "관련 작업"],
    },
  },
};

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(fullPath);
      }

      if (!/\.(md|mdx)$/.test(entry.name)) {
        return [];
      }

      return [fullPath];
    }),
  );

  return files.flat();
}

function getId(filePath) {
  return path.basename(filePath).replace(/\.(md|mdx)$/, "");
}

function getSectionLabels(source) {
  const legacyLabels = Array.from(source.matchAll(/<p class="section-label">([^<]+)<\/p>/g), (match) => match[1].trim());
  const detailSections = Array.from(source.matchAll(/<DetailSection\b[^>]*>/g));
  const labels = Array.from(
    source.matchAll(/<DetailSection\b[^>]*\blabel\s*=\s*"([^"]+)"[^>]*>/g),
    (match) => match[1].trim(),
  );

  return {
    legacyLabels,
    detailSectionCount: detailSections.length,
    labels,
  };
}

async function validateCollection(kind) {
  const config = collections[kind];
  const enFiles = await collectFiles(path.join(contentDir, kind, "en"));
  const koFiles = await collectFiles(path.join(contentDir, kind, "ko"));
  const enIds = new Set(enFiles.map(getId));
  const koIds = new Set(koFiles.map(getId));
  const issues = [];

  for (const id of enIds) {
    if (!koIds.has(id)) {
      issues.push(`[${kind}] Missing Korean entry for "${id}".`);
    }
  }

  for (const id of koIds) {
    if (!enIds.has(id)) {
      issues.push(`[${kind}] Missing English entry for "${id}".`);
    }
  }

  for (const [lang, files] of [
    ["en", enFiles],
    ["ko", koFiles],
  ]) {
    const allowedLabels = new Set(config.allowedLabels[lang]);
    const requiredLabels = config.requiredLabels[lang];

    for (const filePath of files) {
      const source = await readFile(filePath, "utf8");
      const { legacyLabels, detailSectionCount, labels } = getSectionLabels(source);

      if (legacyLabels.length > 0) {
        issues.push(
          `[${kind}] Legacy section label markup found in ${path.relative(rootDir, filePath)}. Use <DetailSection label="..."> instead.`,
        );
      }

      if (detailSectionCount === 0) {
        issues.push(
          `[${kind}] No <DetailSection> found in ${path.relative(rootDir, filePath)}. Direct HTML sections are not allowed; compose content with <DetailSection label="..." title="...">.`,
        );
        continue;
      }

      if (labels.length !== detailSectionCount) {
        issues.push(
          `[${kind}] Every <DetailSection> must include a double-quoted string literal label in ${path.relative(rootDir, filePath)}.`,
        );
      }

      for (const requiredLabel of requiredLabels) {
        if (!labels.includes(requiredLabel)) {
          issues.push(
            `[${kind}] Missing required section label "${requiredLabel}" in ${path.relative(rootDir, filePath)}.`,
          );
        }
      }

      for (const label of labels) {
        if (!allowedLabels.has(label)) {
          issues.push(
            `[${kind}] Unsupported section label "${label}" in ${path.relative(rootDir, filePath)}.`,
          );
        }
      }
    }
  }

  return issues;
}

const issues = (await Promise.all(Object.keys(collections).map(validateCollection))).flat();

if (issues.length > 0) {
  console.error("Site consistency check failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Site consistency check passed.");

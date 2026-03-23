import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const blockElements = [
  "article",
  "aside",
  "blockquote",
  "div",
  "dl",
  "fieldset",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "main",
  "nav",
  "ol",
  "p",
  "picture",
  "pre",
  "section",
  "table",
  "ul",
];
const blockPattern = blockElements.join("|");
const invalidParagraphPattern = new RegExp(
  `<p\\b[^>]*>(?:(?!<\\/p>)[\\s\\S])*?<(?:${blockPattern})\\b`,
  "gi",
);

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }

      return entry.isFile() && fullPath.endsWith(".html") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

const issues = [];

for (const filePath of await collectHtmlFiles(distDir)) {
  const source = await readFile(filePath, "utf8");
  const matches = source.match(invalidParagraphPattern);

  if (matches?.length) {
    issues.push({
      filePath,
      sample: matches[0].replace(/\s+/g, " ").slice(0, 180),
    });
  }
}

if (issues.length > 0) {
  console.error("Built HTML validation failed:\n");

  for (const issue of issues) {
    console.error(`- ${path.relative(rootDir, issue.filePath)} :: ${issue.sample}`);
  }

  process.exit(1);
}

console.log("Built HTML validation passed.");

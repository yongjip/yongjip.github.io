import http from "node:http";
import { access, readFile, readdir, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer-core";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");

const DEFAULT_VIEWPORTS = [
  { name: "desktop", width: 1400, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const DEFAULT_ROUTES = [
  "/",
  "/ko/",
  "/work/",
  "/ko/work/",
  "/methods/",
  "/ko/methods/",
  "/work/text-to-sql/",
  "/ko/work/text-to-sql/",
  "/work/warehouse-optimization/",
  "/ko/work/warehouse-optimization/",
  "/methods/seasonality-index/",
  "/ko/methods/seasonality-index/",
];

const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

function resolveDistPath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname);
  const safePath = decodedPath.replaceAll("\\", "/");

  if (safePath.includes("..")) return null;

  const normalized = safePath.startsWith("/") ? safePath.slice(1) : safePath;
  const withIndex = normalized === "" || normalized.endsWith("/") ? `${normalized}index.html` : normalized;
  return path.join(distDir, withIndex);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function startStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      if (!req.url) {
        res.writeHead(400);
        res.end("Bad Request");
        return;
      }

      const url = new URL(req.url, "http://127.0.0.1");
      const resolved = resolveDistPath(url.pathname);

      if (!resolved) {
        res.writeHead(400);
        res.end("Bad Request");
        return;
      }

      let target = resolved;
      if (!(await fileExists(target))) {
        // Allow asset URLs without trailing slash (e.g. /assets/foo.css)
        const assetCandidate = path.join(distDir, decodeURIComponent(url.pathname).replaceAll("\\", "/").replace(/^\/+/, ""));
        if (await fileExists(assetCandidate)) {
          target = assetCandidate;
        } else {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
      }

      const fileStats = await stat(target);
      if (!fileStats.isFile()) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const ext = path.extname(target).toLowerCase();
      const contentType = MIME_TYPES.get(ext) ?? "application/octet-stream";
      const body = await readFile(target);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(body);
    } catch (error) {
      res.writeHead(500);
      res.end("Internal Server Error");
      console.error(error);
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Failed to start static server.");
  }

  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
  };
}

async function findExecutable(cacheDir, productDirName, executableName) {
  const root = path.join(cacheDir, productDirName);
  if (!(await fileExists(root))) return null;

  const queue = [root];
  while (queue.length > 0) {
    const currentDir = queue.shift();
    if (!currentDir) continue;

    let dirents;
    try {
      dirents = await readdir(currentDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of dirents) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === executableName) {
        return fullPath;
      }
    }
  }

  return null;
}

async function resolveBrowserExecutable() {
  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && (await fileExists(envPath))) return envPath;

  const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (await fileExists(macChrome)) return macChrome;

  const macCanary = "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary";
  if (await fileExists(macCanary)) return macCanary;

  const cacheDir = process.env.PUPPETEER_CACHE_DIR ?? path.join(os.homedir(), ".cache", "puppeteer");
  const headlessShell = await findExecutable(cacheDir, "chrome-headless-shell", "chrome-headless-shell");
  if (headlessShell) return headlessShell;

  return null;
}

function formatDiff(px) {
  const rounded = Math.round(px * 10) / 10;
  return `${rounded}px`;
}

async function getViewportWidth(page) {
  return page.evaluate(() => window.innerWidth);
}

async function getRect(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      width: rect.width,
    };
  }, selector);
}

async function getRects(page, selector) {
  return page.evaluate((sel) => {
    return Array.from(document.querySelectorAll(sel)).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        width: rect.width,
      };
    });
  }, selector);
}

function assertCentered(rect, viewportWidth, tolerancePx, label) {
  const leftSpace = rect.left;
  const rightSpace = viewportWidth - rect.right;
  const diff = Math.abs(leftSpace - rightSpace);
  if (diff > tolerancePx) {
    throw new Error(
      `${label} not centered (diff ${formatDiff(diff)}; left ${formatDiff(leftSpace)} vs right ${formatDiff(rightSpace)}).`,
    );
  }
}

async function checkMetricRowCentering(page, tolerancePx) {
  const issues = await page.evaluate(() => {
    const grids = Array.from(document.querySelectorAll(".metric-grid"));
    return grids
      .map((grid, index) => {
        const gridRect = grid.getBoundingClientRect();
        const items = Array.from(grid.querySelectorAll(".metric-item"));
        if (items.length < 2) return null;

        const rects = items.map((item) => item.getBoundingClientRect());
        const rowYs = new Set(rects.map((r) => Math.round(r.top)));
        if (rowYs.size !== 1) return null;

        const minLeft = Math.min(...rects.map((r) => r.left));
        const maxRight = Math.max(...rects.map((r) => r.right));
        return {
          index,
          leftSpace: minLeft - gridRect.left,
          rightSpace: gridRect.right - maxRight,
          itemCount: items.length,
        };
      })
      .filter(Boolean);
  });

  for (const issue of issues) {
    const diff = Math.abs(issue.leftSpace - issue.rightSpace);
    if (diff > tolerancePx) {
      throw new Error(
        `.metric-grid[${issue.index}] items not centered (diff ${formatDiff(diff)}; left ${formatDiff(issue.leftSpace)} vs right ${formatDiff(issue.rightSpace)}).`,
      );
    }
  }
}

async function checkCenteredAll(page, selector, viewportWidth, tolerancePx) {
  const rects = await getRects(page, selector);
  for (const rect of rects) {
    assertCentered(rect, viewportWidth, tolerancePx, selector);
  }
}

async function main() {
  const distIndex = path.join(distDir, "index.html");
  if (!(await fileExists(distIndex))) {
    console.error(`Layout check failed: build output not found at ${path.relative(rootDir, distIndex)}.`);
    console.error("Run `npm run build` first so `dist/` exists.");
    process.exit(1);
  }

  const executablePath = await resolveBrowserExecutable();
  if (!executablePath) {
    console.error("Layout check failed: could not find a Chrome/Chromium executable.");
    console.error("- Set `PUPPETEER_EXECUTABLE_PATH` to a local Chrome/Chromium binary, or");
    console.error("- Install a Puppeteer-managed browser: `npx --yes puppeteer browsers install chrome-headless-shell`");
    process.exit(1);
  }

  const { server, baseUrl } = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let failures = 0;

  try {
    const page = await browser.newPage();

    for (const viewport of DEFAULT_VIEWPORTS) {
      await page.setViewport({ width: viewport.width, height: viewport.height });

      for (const route of DEFAULT_ROUTES) {
        const url = `${baseUrl}${route}`;
        const context = `${viewport.name} ${route}`;

        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
          await page.waitForFunction(() => (document.fonts ? document.fonts.status === "loaded" : true), {
            timeout: 5_000,
          }).catch(() => {});

          const viewportWidth = await getViewportWidth(page);

          const shellRect = await getRect(page, ".site-shell");
          if (!shellRect) throw new Error("Missing `.site-shell`.");
          assertCentered(shellRect, viewportWidth, 3, "`.site-shell`");

          const articleHeaderRect = await getRect(page, ".article-header");
          if (articleHeaderRect) assertCentered(articleHeaderRect, viewportWidth, 3, "`.article-header`");

          const heroRect = await getRect(page, ".hero-home");
          if (heroRect) assertCentered(heroRect, viewportWidth, 3, "`.hero-home`");

          await checkCenteredAll(page, ".diagram-frame", viewportWidth, 4);
          await checkCenteredAll(page, ".metric-grid", viewportWidth, 4);

          await checkMetricRowCentering(page, 4);
        } catch (error) {
          failures += 1;
          console.error(`[layout] ${context}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures > 0) {
    console.error(`\nLayout alignment check failed (${failures} case(s)).`);
    process.exit(1);
  }

  console.log("Layout alignment check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

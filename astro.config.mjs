import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { buildSitemapLastmodMap } from "./scripts/sitemap-lastmod.mjs";

const sitemapLastmodMap = buildSitemapLastmodMap();

export default defineConfig({
  site: "https://yongjip.github.io",
  output: "static",
  integrations: [
    mdx(),
    react(),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = sitemapLastmodMap.get(pathname);

        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});

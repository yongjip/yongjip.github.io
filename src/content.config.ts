import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const factSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Expected YYYY-MM-DD date.");

const baseSchema = z.object({
  id: z.string(),
  lang: z.enum(["en", "ko"]),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  summary: z.string(),
  kind: z.enum(["work", "method"]),
  featured: z.boolean(),
  order: z.number(),
  related: z.array(z.string()),
  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema,
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  facts: z.array(factSchema).min(1),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: baseSchema.extend({
    kind: z.literal("work"),
    status: z.string(),
    scope: z.string(),
    resultSummary: z.string(),
  }),
});

const methods = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/methods" }),
  schema: baseSchema.extend({
    kind: z.literal("method"),
    format: z.string(),
    planningUse: z.string(),
  }),
});

export const collections = { work, methods };

import { defineCollection, z } from "astro:content";

const factSchema = z.object({
  label: z.string(),
  value: z.string(),
});

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
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  facts: z.array(factSchema).length(2),
});

const work = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    kind: z.literal("work"),
    status: z.string(),
    scope: z.string(),
    resultSummary: z.string(),
  }),
});

const methods = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    kind: z.literal("method"),
    format: z.string(),
    planningUse: z.string(),
  }),
});

export const collections = { work, methods };

import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import dayjs from 'dayjs';

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/post" }),
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    publishedAt: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD')),
    lastModified: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD'))
      .optional(),
    series: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
  })
});

const workCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/work" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD')),
    lastModified: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD'))
      .optional(),
    image: image(),
    alt: z.string(),
    developedStart: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD')),
    developedEnd: z.string()
      .or(z.date())
      .transform((date) => dayjs(date).format('YYYY/MM/DD'))
      .optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    pinned: z.boolean().optional(),
  })
});

export const collections = {
  'post': postCollection,
  'work': workCollection,
};
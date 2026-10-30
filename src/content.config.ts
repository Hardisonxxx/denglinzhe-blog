import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry
  }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.enum(['essay', 'photo', 'media']),
    slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/).optional(),
    tags: z.array(z.string()).default([]),
    cover: image().optional(),
    coverAlt: z.string().default(''),
    photos: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional()
    })).default([]),
    draft: z.boolean().default(false)
  })
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    type: z.enum(['direction', 'publication', 'project']),
    date: z.coerce.date().optional(),
    url: z.url().optional(),
    order: z.number().int().default(100)
  })
});

export const collections = { notes, research };

import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  attached: z.string().optional(),
})

const about = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/about' }),
  schema: pageSchema,
})

const contact = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/contact' }),
  schema: pageSchema,
})

export const collections = { about, contact }

import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
    attached: z.string().optional(),
  }),
})

export const collections = {
  about: pages,
  contact: pages,
}

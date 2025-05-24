import { z } from 'zod'

export const linkSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortUrl: z.string(),
  accessCount: z.number(),
  createdAt: z.date(),
})

export type Link = z.infer<typeof linkSchema>

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { ShortURLAlreadyExistsError } from '~/app/functions/errors/shortUrlAlreadyExists'
import { db } from '~/infra/database'
import { links } from '~/infra/database/schemas/links'
import { type Either, makeLeft, makeRight } from '~/shared/either'
import { refinedUrl } from '~/shared/zod'

export const createLinkInput = z.object({
  originalUrl: refinedUrl,
  shortUrl: refinedUrl,
})

export type CreateLinkInput = z.infer<typeof createLinkInput>

type CreateLinkOutput = {
  shortUrl: string
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<ShortURLAlreadyExistsError, CreateLinkOutput>> {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl))

  if (result.length > 0) {
    return makeLeft(new ShortURLAlreadyExistsError())
  }

  await db.insert(links).values({
    originalUrl,
    shortUrl,
  })

  return makeRight({ shortUrl })
}

import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { ShortUrlDoesNotExistsError } from '~/app/functions/errors/shortUrlDoesNotExists'
import { db } from '~/infra/database'
import { links } from '~/infra/database/schemas/links'
import { Either, makeLeft, makeRight } from '~/shared/either'

export const updateAccessInput = z.object({
  shortUrl: z.string(),
})

type UpdateAccessInput = z.infer<typeof updateAccessInput>

export type UpdateAccessOutput = {
  accessCount: number
}

export const updateAccess = async (
  input: UpdateAccessInput
): Promise<Either<ShortUrlDoesNotExistsError, UpdateAccessOutput>> => {
  const { shortUrl } = updateAccessInput.parse(input)

  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl))

  if (result.length === 0) {
    return makeLeft(new ShortUrlDoesNotExistsError())
  }

  const updated = await db
    .update(links)
    .set({ accessCount: sql`access_count + 1` })
    .where(eq(links.shortUrl, shortUrl))
    .returning()

  return makeRight({ accessCount: updated[0].accessCount })
}

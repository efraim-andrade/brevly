import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { ShortUrlDoesNotExistsError } from '~/app/functions/errors/shortUrlDoesNotExists'
import type { Link } from '~/app/types/link'
import { db } from '~/infra/database'
import { links } from '~/infra/database/schemas/links'
import { type Either, makeLeft, makeRight } from '~/shared/either'

export const getLinkInput = z.object({
  shortUrl: z.string(),
})

export type GetLinkInput = z.infer<typeof getLinkInput>

export async function getLink(
  input: GetLinkInput
): Promise<Either<ShortUrlDoesNotExistsError, Link>> {
  const { shortUrl } = input

  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl))

  if (result.length === 0) {
    return makeLeft(new ShortUrlDoesNotExistsError())
  }

  return makeRight(result[0])
}

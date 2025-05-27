import { eq } from "drizzle-orm";
import { z } from "zod";
import { ShortUrlDoesNotExistsError } from "~/app/functions/errors/shortUrlDoesNotExists";
import { db } from "~/infra/database";
import { links } from "~/infra/database/schemas/links";
import { makeLeft, makeRight } from "~/shared/either";

export const deleteLinkInput = z.object({
	shortUrl: z.string(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkInput>;

export async function deleteLink(input: DeleteLinkInput) {
	const { shortUrl } = input;

	const result = await db
		.select()
		.from(links)
		.where(eq(links.shortUrl, shortUrl));

	if (result.length === 0) {
		return makeLeft(new ShortUrlDoesNotExistsError());
	}

	await db.delete(links).where(eq(links.shortUrl, shortUrl));

	return makeRight({ shortUrl });
}

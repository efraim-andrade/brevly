import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";
import type { ErrorExportingLink } from "~/app/functions/errors/errorExportingLink";
import { db, pg } from "~/infra/database";
import { links } from "~/infra/database/schemas/links";
import { uploadFileToStorage } from "~/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "~/shared/either";

export async function exportLinks(): Promise<
	Either<ErrorExportingLink, string>
> {
	const { sql, params } = db
		.select({
			originalUrl: links.originalUrl,
			shortUrl: links.shortUrl,
			accessCount: links.accessCount,
			createdAt: links.createdAt,
		})
		.from(links)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(2);

	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "original_url", header: "Original URL" },
			{ key: "short_url", header: "Short URL" },
			{ key: "access_count", header: "Access Count" },
			{ key: "created_at", header: "Created At" },
		],
	});

	const uploadToStorageStream = new PassThrough();

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk);
				}

				callback();
			},
		}),
		csv,
		uploadToStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "downloads",
		fileName: `${new Date().toISOString()}-uploads.csv`,
		contentStream: uploadToStorageStream,
	});

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

	await convertToCSVPipeline;

	return makeRight(url);
}

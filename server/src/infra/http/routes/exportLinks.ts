import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { exportLinks } from "~/app/functions/exportLinks";

const swaggerSchema = {
	response: {
		200: z.object({
			url: z.string().url(),
		}),
		500: z.object({
			message: z.string(),
		}),
	},
	summary: "Export links to CSV",
	tags: ["Links"],
	description:
		"Exports all links in the database to a CSV file and returns the download URL.",
	schema: {
		response: {
			"2xx": {
				type: "object",
				properties: {
					url: { type: "string", format: "uri" },
				},
			},
			"5xx": {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
};

export async function exportLinksRoute(server: FastifyInstance) {
	server.get("/links/export", { schema: swaggerSchema }, async (_, reply) => {
		const result = await exportLinks();

		if (result.left) {
			return reply.status(500).send({ message: result.left.message });
		}

		return reply.send({
			url: result.right,
		});
	});
}

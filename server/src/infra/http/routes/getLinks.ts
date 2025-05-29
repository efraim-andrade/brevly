import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getLinks } from "~/app/functions/getLinks";
import { linkSchema } from "~/app/types/link";

const swaggerSchema = {
	response: {
		200: linkSchema.array(),
	},
	summary: "Get all links",
	tags: ["Links"],
	description: "Retrieves all links stored in the database.",
	schema: {
		response: {
			"200": {
				type: "array",
				items: {
					type: "object",
					properties: {
						originalUrl: { type: "string", format: "uri" },
						shortUrl: { type: "string" },
						accessCount: { type: "number" },
						createdAt: { type: "string", format: "date-time" },
						expirationDate: {
							type: "string",
							format: "date-time",
							nullable: true,
						},
					},
					required: ["originalUrl", "shortUrl", "accessCount", "createdAt"],
				},
			},
		},
	},
};

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get("/links", { schema: swaggerSchema }, async (_, reply) => {
		const allLinks = await getLinks();

		return reply.send(allLinks);
	});
};

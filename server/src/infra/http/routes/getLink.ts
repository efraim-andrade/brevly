import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { getLink, getLinkInput } from "~/app/functions/getLink";
import { linkSchema } from "~/app/types/link";

const getLinkSchema = {
	params: getLinkInput,
};

const swaggerSchema = {
	params: getLinkSchema.params,
	response: {
		200: linkSchema,
		404: z.object({
			message: z.string(),
		}),
	},
	summary: "Get a link by its short URL",
	tags: ["Links"],
	description: "Retrieves a link by its short URL.",
	schema: {
		params: {
			type: "object",
			properties: {
				shortUrl: { type: "string", minLength: 1, description: "Short URL" },
			},
			required: ["shortUrl"],
		},
		response: {
			"200": {
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
			"404": {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
};

export async function getLinkRoute(server: FastifyInstance) {
	server.get(
		"/link/:shortUrl",
		{ schema: swaggerSchema },
		async (request, reply) => {
			const { shortUrl } = getLinkSchema.params.parse(request.params);

			const result = await getLink({ shortUrl });

			if (result.left) {
				return reply.status(404).send({ message: result.left.message });
			}

			return reply.send(result.right);
		},
	);
}

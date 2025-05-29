import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { DeleteLinkInput, deleteLink } from "~/app/functions/deleteLink";

const swaggerSchema = {
	response: {
		204: z.object({
			shortUrl: z.string(),
		}),
		409: z.object({
			message: z.string(),
		}),
	},
	summary: "Delete a link",
	tags: ["Links"],
	description: "Deletes a link by its short URL.",
	schema: {
		params: z.object({
			shortUrl: z.string().min(1, "Short URL is required"),
		}),
		response: {
			"204": {
				type: "object",
				properties: {
					shortUrl: { type: "string" },
				},
			},
			"409": {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
};

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/link/:shortUrl",
		{
			schema: swaggerSchema,
		},
		async (request, reply) => {
			const result = await deleteLink(request.params as DeleteLinkInput);

			if (result.left) {
				return reply.status(409).send({ message: result.left.message });
			}

			return reply.status(204).send();
		},
	);
};

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import {
	type CreateLinkInput,
	createLink,
	createLinkInput,
} from "~/app/functions/createLink";

const createLinkSchema = {
	body: createLinkInput,
};

const swaggerSchema = {
	body: createLinkSchema.body,
	response: {
		201: z.object({
			shortUrl: z.string(),
		}),
		409: z.object({
			message: z.string(),
		}),
	},
	summary: "Create a new link",
	tags: ["Links"],
	description: "Creates a new link and returns the short URL.",
	schema: {
		body: {
			type: "object",
			properties: {
				originalUrl: { type: "string", format: "uri" },
				customShortUrl: { type: "string", nullable: true },
				expirationDate: { type: "string", format: "date-time", nullable: true },
			},
			required: ["originalUrl"],
		},
		response: {
			"201": {
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

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/link",
		{
			schema: swaggerSchema,
		},
		async (request, reply) => {
			const result = await createLink(request.body as CreateLinkInput);

			if (result.left) {
				return reply.status(409).send({ message: result.left.message });
			}

			return reply.status(201).send({ shortUrl: result.right.shortUrl });
		},
	);
};

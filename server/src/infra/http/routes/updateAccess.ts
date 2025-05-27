import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { updateAccess, updateAccessInput } from "~/app/functions/updateAccess";

const updateAccessSchema = {
	params: updateAccessInput,
};

const swaggerSchema = {
	params: updateAccessSchema.params,
	response: {
		200: z.object({
			accessCount: z.number(),
		}),
		404: z.object({
			message: z.string(),
		}),
	},
};

export async function updateAccessRoute(server: FastifyInstance) {
	server.put(
		"/link/:shortUrl/access",
		{ schema: swaggerSchema },
		async (request, reply) => {
			const { shortUrl } = updateAccessSchema.params.parse(request.params);

			const result = await updateAccess({ shortUrl });

			if (result.left) {
				return reply.status(404).send({ message: result.left.message });
			}

			return reply.send(result.right);
		},
	);
}

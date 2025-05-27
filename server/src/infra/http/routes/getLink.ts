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

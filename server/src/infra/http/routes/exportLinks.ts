import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { exportLinks } from "~/app/functions/exportLinks";

const swaggerSchema = {
	response: {
		200: z.string(),
	},
};

export async function exportLinksRoute(server: FastifyInstance) {
	server.get("/links/export", { schema: swaggerSchema }, async (_, reply) => {
		const result = await exportLinks();

		if (result.left) {
			return reply.status(500).send({ message: result.left.message });
		}

		return reply.send(result.right);
	});
}

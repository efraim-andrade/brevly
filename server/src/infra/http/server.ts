import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import { env } from "~/env";
import { createLinkRoute } from "~/infra/http/routes/createLink";
import { deleteLinkRoute } from "~/infra/http/routes/deleteLink";
import { exportLinksRoute } from "~/infra/http/routes/exportLinks";
import { getLinkRoute } from "~/infra/http/routes/getLink";
import { getLinksRoute } from "~/infra/http/routes/getLinks";
import { healthCheckRoute } from "~/infra/http/routes/healthCheck";
import { updateAccessRoute } from "~/infra/http/routes/updateAccess";
import { transformSwaggerSchema } from "~/infra/http/transform-swagger-schema";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply
			.status(400)
			.send({ message: "Validation error", error: error.validation });
	}

	// Envia o erro para alguma ferramenta de observabilidade (Sentry/Datadog/Grafana)

	console.error("Error: ", error);

	return reply.status(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

server.register(fastifyMultipart);
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "brev.ly server",
			version: "1.0.0",
		},
	},
	transform: transformSwaggerSchema,
});
server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(healthCheckRoute);

server.register(getLinksRoute);
server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(getLinkRoute);
server.register(updateAccessRoute);
server.register(exportLinksRoute);

server.listen({ port: Number(env.PORT) }).then(() => {
	console.log(`Brev.ly server is running on port ${env.PORT}... 🪴`);
});

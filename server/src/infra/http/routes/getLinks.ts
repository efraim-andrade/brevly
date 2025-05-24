import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getLinks } from '~/app/functions/getLinks'
import { linkSchema } from '~/app/types/link'

const swaggerSchema = {
  response: {
    200: linkSchema.array(),
  },
}

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get('/links', { schema: swaggerSchema }, async (_, reply) => {
    const allLinks = await getLinks()

    return reply.send(allLinks)
  })
}

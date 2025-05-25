import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import {
  type DeleteLinkInput,
  deleteLink,
  deleteLinkInput,
} from '~/app/functions/deleteLink'

const deleteLinkSchema = {
  body: deleteLinkInput,
}

const swaggerSchema = {
  body: deleteLinkSchema.body,
  response: {
    204: z.object({
      shortUrl: z.string(),
    }),
    409: z.object({
      message: z.string(),
    }),
  },
}

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:shortUrl',
    {
      schema: swaggerSchema,
    },
    async (request, reply) => {
      const result = await deleteLink(request.body as DeleteLinkInput)

      if (result.left) {
        return reply.status(409).send({ message: result.left.message })
      }

      return reply.status(204).send()
    }
  )
}

import type { Config } from 'drizzle-kit'
import { env } from '~/env'

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/infra/database/schemas/*',
  out: 'src/infra/database/migrations',
} satisfies Config

import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
	CLOUDFLARE_ACCOUNT_ID: z.string(),
	CLOUDFLARE_ACCESS_KEY_ID: z.string(),
	CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
	CLOUDFLARE_BUCKET: z.string(),
	CLOUDFLARE_PUBLIC_URL: z.string(),
});

export const env = envSchema.parse(process.env);

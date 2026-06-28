import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["production", "development", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(8080),
    CORS_ORIGIN: z.string().default("http://localhost:5173"),
    API_PREFIX: z.string(),
    MONGO_URI: z.string(),
    DB_NAME: z.string().default("CARRIER_COPILOT"),
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRY: z.string(),
    REFRESH_TOKEN_EXPIRY: z.string().default("30d"),
    BCRYPT_SALT_ROUNDSL: z.coerce.number().int().positive().default(10)
})

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}

export const env = loadEnv();
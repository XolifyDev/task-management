import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./migrations/schema.ts",
  out: "./migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

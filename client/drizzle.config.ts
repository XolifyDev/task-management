import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "127.0.0.1",
    user: "root",
    database: "xolitask",
    password: "",
  },
} satisfies Config;

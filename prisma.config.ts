import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // dotenv: true, // <-- Required
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});

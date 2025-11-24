import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
//   dotenv: true,  // <-- REQUIRED for Prisma migrate to see .env

  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

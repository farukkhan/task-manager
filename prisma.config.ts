import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "packages/infrastructure/prisma/schema.prisma",
  migrations: {
    path: "packages/infrastructure/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

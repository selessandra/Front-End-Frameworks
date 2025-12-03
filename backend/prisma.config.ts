//backend/prisma.config.ts
import dotenv from "dotenv";
dotenv.config();
import { defineConfig, env } from "prisma/config";

import path from "path";


export default defineConfig({
  schema: path.resolve(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});

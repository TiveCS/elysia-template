import "dotenv/config";
import { DataSource } from "typeorm";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl)
  throw new Error("DATABASE_URL is not defined in environment variables");

export const database = new DataSource({
  type: "postgres",
  url: databaseUrl,
  logging: true,
  logger: "file",
  entities: [
    "src/infra/auth/entities/*.entity.{ts,js}",
    "src/modules/entities/*.entity.{ts,js}",
  ],
  migrations: ["migrations/*.{ts,js}"],
  migrationsRun: false,
});

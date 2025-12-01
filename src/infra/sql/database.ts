import { DataSource } from "typeorm";
import path from "path";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl)
  throw new Error("DATABASE_URL is not defined in environment variables");

export const database = new DataSource({
  type: "postgres",
  url: databaseUrl,
  logging: true,
  logger: "file",
  entities: [
    path.join(__dirname, "src/infra/auth/entities/*.entity.{ts,js}"),
    path.join(__dirname, "src/modules/entities/*.entity.{ts,js}"),
  ],
  migrations: [path.join(__dirname, "migrations/*.{ts,js}")],
  migrationsRun: true,
});

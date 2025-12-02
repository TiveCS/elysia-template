import { openAPI } from "better-auth/plugins";
import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { betterAuth } from "better-auth";
import { database } from "../sql/database";

// Initialize database connection for the application
if (!database.isInitialized) {
  await database.initialize();
}

export const auth = betterAuth({
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
  },
  database: typeormAdapter(database, {
    entitiesDir: "src/infra/auth/entities",
    migrationsDir: "migrations",
    outputDir: "src/infra/sql",
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  plugins: [openAPI()],
});

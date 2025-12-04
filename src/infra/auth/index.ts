import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "../sql/database";

export const auth = betterAuth({
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  experimental: {
    joins: true,
  },
  plugins: [openAPI()],
});

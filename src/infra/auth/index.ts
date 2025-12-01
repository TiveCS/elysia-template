import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { betterAuth } from "better-auth/*";
import { database } from "../sql/database";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: typeormAdapter(database),
});

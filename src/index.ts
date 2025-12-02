import "reflect-metadata";
import openapi from "@elysiajs/openapi";
import { logger, pino } from "@bogeychan/elysia-logger";
import { Elysia } from "elysia";
import { betterAuth, BetterAuthOpenAPI } from "./infra/auth/auth.setup";

const port = process.env.PORT;

if (!port) throw new Error("PORT is not defined in environment variables");

const app = new Elysia()
  .use(
    logger({
      stream: pino.destination("./activity.log"),
    }),
  )
  .use(betterAuth)
  .use(
    openapi({
      documentation: {
        components: await BetterAuthOpenAPI.components,
        paths: await BetterAuthOpenAPI.getPaths(),
      },
    }),
  )
  .get("/", () => {
    throw new Error("Hello World Error");
  })
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

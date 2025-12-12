import { logger, pino } from "@bogeychan/elysia-logger";
import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import "reflect-metadata";
import { BetterAuthOpenAPI, betterAuth } from "./infra/auth/auth.setup";
import { todosRoute } from "./modules/todos/routes";

const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URL;

if (!port) throw new Error("PORT is not defined in environment variables");

if (!frontendUrl)
  throw new Error("FRONTEND_URLS is not defined in environment variables");

const app = new Elysia()
  .use(
    cors({
      origin: frontendUrl,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
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
  .use(todosRoute)
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

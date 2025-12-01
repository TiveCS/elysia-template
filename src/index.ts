import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { database } from "./infra/sql/database";

const port = process.env.PORT;

if (!port) throw new Error("PORT is not defined in environment variables");

const app = new Elysia()
  .use(openapi())
  .get("/", () => "Hello Elysia")
  .listen(port);

await database.initialize();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

import { Hono } from "hono";
import { handle } from "hono/vercel";

import users from "@/features/auth/server/route";
import requests from "@/features/contact-admins/server/route";

export const runtime = "nodejs";

const app = new Hono().basePath("/api")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/users", users)
  .route("/requests", requests)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
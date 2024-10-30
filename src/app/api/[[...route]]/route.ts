import { Hono } from "hono";
import { handle } from "hono/vercel";

import users from "@/features/auth/server/route";
import groups from "@/features/groups/server/route";
import trashs from "@/features/trashs/server/route";
import requests from "@/features/contact-admins/server/route";
import competencies from "@/features/competencies/server/route";

export const runtime = "nodejs";

const app = new Hono().basePath("/api")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/users", users)
  .route("/groups", groups)
  .route("/trashs", trashs)
  .route("/requests", requests)
  .route("/competencies", competencies)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
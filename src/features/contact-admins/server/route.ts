import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { departments, positions, requests } from "@/db/schema";

import { RequestSchema } from "@/features/contact-admins/schemas";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      RequestSchema,
    ),
    async (c) => {
      const values = c.req.valid("json");

      // TODO: Handle existing email already in use 

      await db
        .insert(requests)
        .values({
          ...values,
          department: values.department as typeof departments.enumValues[number],
          position: values.position as typeof positions.enumValues[number],
        });

      return c.json({ data: null });
    }
  )

export default app;
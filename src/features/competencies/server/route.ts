import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { competencies } from "@/db/schema";

const app = new Hono()
  .post(
    "/instant",
    zValidator(
      "json",
      z.object({
        type: 
      })
    ),
    async (c) => {
      const session = await auth();

      if (!session || !session.user.name) {
        return c.text("Unauthorized", 401);
      }

      await db
        .insert(competencies)
        .values({
          name: "Untitled",
          createdBy: session.user.name,
          updatedBy: session.user.name,
        })

      return c.json(null, 200);
    }
  )

export default app;
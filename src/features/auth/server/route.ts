import bcrypt from "bcryptjs";

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

import { ChangePasswordSchema, SignUpSchema } from "@/features/auth/schemas";
import { z } from "zod";
import { auth } from "@/auth";

const app = new Hono()
  .post(
    "/sign-up",
    zValidator(
      "json",
      SignUpSchema
    ),
    async (c) => {
      const { name, email, password } = c.req.valid("json");

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (user[0]) {
        return c.json({ error: "Email already in use" }, 400);
      }

      console.log(password);

      await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword
        });

      return c.json(null, 200);
    }
  )
  .patch(
    "/:id",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        image: z.string(),
      }),
    ),
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();
      const { name, image } = c.req.valid("json");

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(users)
        .set({
          name,
          image,
        })
        .where(eq(users.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Data not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .patch(
    "change-password/:id",
    zValidator(
      "json",
      ChangePasswordSchema.pick({ password: true }),
    ),
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();
      const { password } = c.req.valid("json");

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const [data] = await db  
        .update(users)
        .set({
          password: hashedPassword
        })
        .where(eq(users.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Data not found" }, 404);
      }

      return c.json({ data });
    }
  )

export default app;
import bcrypt from "bcryptjs";

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

import { SignUpSchema } from "@/features/auth/schemas";

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

export default app;
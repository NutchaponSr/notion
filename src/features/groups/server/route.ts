import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { groups } from "@/db/schema";
import { and, desc, eq, gte, lte } from "drizzle-orm";

import { GroupInstant } from "@/features/groups/types";

const app = new Hono()
  .get(
    "/instant",
    async (c) => {
      const session = await auth();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      const group = await db
        .select({
          id: groups.id,
          name: groups.name,
          icon: groups.icon,
          year: groups.year,
        })
        .from(groups)
        .where(
          and(
            eq(groups.inTrash, false),
            gte(groups.year, (new Date().getFullYear() - 5).toString()),
            lte(groups.year, new Date().getFullYear().toString())
          )
        )
        .orderBy(
          desc(groups.createdAt),
        );

        const populatedGroup: Record<string, GroupInstant[]> = {};

        group.forEach((item) => {
          if (!populatedGroup[item.year]) {
            populatedGroup[item.year] = [];  
          }
          populatedGroup[item.year].push({
            id: item.id,
            name: item.name,
            icon: item.icon,
            year: item.year
          });
        });

      return c.json({ data: populatedGroup });
    }
  )
  .post(
    "/instant",
    zValidator(
      "json",
      z.object({
        year: z.string(),
      }),
    ),
    async (c) => {
      const session = await auth();
      const { year } = c.req.valid("json");

      if (!session || !session.user.name) {
        return c.text("Unauthorized", 401);
      }

      await db
        .insert(groups)
        .values({
          year,
          name: "Untitled",
          createdBy: session.user.name,
          updatedBy: session.user.name,
        });

      return c.json(null, 200);
    }
  )

export default app;
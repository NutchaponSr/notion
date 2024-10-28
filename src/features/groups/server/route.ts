import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { favorites, groups, users } from "@/db/schema";
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
  .get(
    "/favorite",
    async (c) => {
      const session = await auth();

      if (!session || !session.user.id) {
        return c.text("Unauthorized", 401);
      }

      const data = await db
        .select()
        .from(favorites)
        .leftJoin(groups, eq(groups.id, favorites.groupId))
        .leftJoin(users, eq(users.id, favorites.userId))
        .where(eq(favorites.userId, session.user.id))
        .orderBy(desc(groups.createdAt))

      return c.json({ data }, 200);
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
  .post(
    "/duplicate/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session || !session.user.name) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [query] = await db
        .select()
        .from(groups)
        .where(eq(groups.id, id));

      if (!query) {
        return c.json({ error: "Not found" }, 404);
      }

      await db
        .insert(groups)
        .values({
          name: query.name + " (Copy)",
          icon: query.icon,
          year: query.year,
          inTrash: false,
          createdBy: session.user.name,
          updatedBy: session.user.name
        });

      return c.json(null, 200);
    }
  )
  .post(
    "/favorite/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session || !session.user.id) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
        
      const [data] = await db
        .insert(favorites)
        .values({
          groupId: id,
          userId: session.user.id,
        })
        .returning()
        
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .patch(
    "/rename/:id",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        icon: z.string().nullable(),
      }),
    ),
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();
      const { name, icon } = c.req.valid("json");

      if (!session || !session.user.name) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({
          name,
          icon,
          updatedBy: session.user.name
        })
        .where(eq(groups.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .patch(
    "/trash/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({
          inTrash: true,
        })
        .where(eq(groups.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .patch(
    "/restore/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({
          inTrash: false,
        })
        .where(eq(groups.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .delete(
    "/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .delete(groups)
        .where(eq(groups.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .delete(
    "/favorite/:id",
    async (c) => {
      const session = await auth();

      const { id } = c.req.param();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .delete(favorites)
        .where(eq(favorites.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )

export default app;
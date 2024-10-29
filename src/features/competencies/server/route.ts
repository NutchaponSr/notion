import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { zValidator } from "@hono/zod-validator";

import { desc, eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { competencies, insertCompetencySchema } from "@/db/schema";

import { getEmojiForType } from "@/features/competencies/utils";
import { CompetencyInstant, Types } from "@/features/competencies/types";

const app = new Hono()
  .get(
    "/instant",
    async (c) => {
      const session = await auth();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      const competency = await db
        .select({
          id: competencies.id,
          name: competencies.name,
          icon: competencies.icon,
          type: competencies.type,
          updatedAt: competencies.updatedAt,
          updatedBy: competencies.updatedBy
        })
        .from(competencies)
        .where(eq(competencies.inTrash, false))
        .orderBy(desc(competencies.createdAt))

      const populatedCompetency: Record<Types, CompetencyInstant[]> = {
        [Types.CC]: [],
        [Types.FC]: [],
        [Types.TC]: []
      };

      competency.forEach((item) => {
        if (!populatedCompetency[item.type]) {
          populatedCompetency[item.type] = [];  
        }
        populatedCompetency[item.type].push({
          id: item.id,
          name: item.name,
          icon: item.icon,
          type: item.type as Types,
          updatedAt: item.updatedAt,
          updatedBy: item.updatedBy
        });
      });

      return c.json({ data: populatedCompetency });
    }
  )
  .post(
    "/instant",
    zValidator(
      "json",
      insertCompetencySchema.pick({
        type: true
      })
    ),
    async (c) => {
      const session = await auth();

      const { type } = c.req.valid("json");

      if (!session || !session.user.name) {
        return c.text("Unauthorized", 401);
      }

      const icon = getEmojiForType(type);

      await db
        .insert(competencies)
        .values({
          icon,
          type,
          name: "Untitled",
          createdBy: session.user.name,
          updatedBy: session.user.name,
        })

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
        .from(competencies)
        .where(eq(competencies.id, id));

      if (!query) {
        return c.json({ error: "Not found" }, 404);
      }

      await db
        .insert(competencies)
        .values({
          name: query.name + " (Copy)",
          icon: query.icon,
          type: query.type,
          inTrash: false,
          createdBy: session.user.name,
          updatedBy: session.user.name
        });

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
        .update(competencies)
        .set({
          name,
          icon,
          updatedBy: session.user.name
        })
        .where(eq(competencies.id, id))
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
        .update(competencies)
        .set({
          inTrash: true,
        })
        .where(eq(competencies.id, id))
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
        .update(competencies)
        .set({
          inTrash: false,
        })
        .where(eq(competencies.id, id))
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
        .delete(competencies)
        .where(eq(competencies.id, id))
        .returning()

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )

export default app;
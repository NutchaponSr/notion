import { Hono } from "hono";
import { auth } from "@/auth";

import { db } from "@/db/drizzle";
import { competencies, groups, users } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { Category } from "@/types";

const app = new Hono()
  .get(
    "/",
    async (c) => {
      const session = await auth();

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      const [group, competency] = await Promise.all([
        db
          .select({
            id: groups.id,
            name: groups.name,
            icon: groups.icon,
            description: groups.year,
            createdBy: groups.createdBy,
            createdAt: groups.createdAt,         
          })
          .from(groups)
          .where(
            eq(groups.inTrash, false)
          ),
        db
          .select({
            id: competencies.id,
            name: competencies.name,
            icon: competencies.icon,
            description: competencies.type,
            createdBy: competencies.createdBy,
            createdAt: competencies.createdAt,         
          })
          .from(competencies)
          .where(
            eq(competencies.inTrash, false)
          )
      ]);

      const populatedData = [
        ...(group?.map(group => ({
          ...group,
          type: Category.GROUP
        })) || []),
        ...(competency?.map(comp => ({
          ...comp,
          type: Category.COMPETENCY
        })) || [])
      ]
      const createdPeoples = await db
        .select({
          name: users.name,
          image: users.image,
        })
        .from(users)
        .where(
          inArray(
            users.name,
            Array.from(new Set(populatedData.map((item) => item.createdBy)))
          )
        );

      return c.json({
        data: {
          data: [
            { label: Category.GROUP, data: group },
            { label: Category.COMPETENCY, data: competency },
          ],
          createdPeoples
        }
      })
    }
  )

export default app;
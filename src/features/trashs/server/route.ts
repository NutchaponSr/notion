import { Hono } from "hono";
import { auth } from "@/auth";

import { db } from "@/db/drizzle";
import { desc, eq, inArray } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";
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
            updatedBy: groups.updatedBy,
            updatedAt: groups.updatedAt,
          })
          .from(groups)
          .where(eq(groups.inTrash, true))
          .orderBy(desc(groups.updatedAt)),
        db
          .select({
            id: competencies.id,
            name: competencies.name,
            icon: competencies.icon,
            description: competencies.type,
            updatedBy: competencies.updatedBy,
            updatedAt: competencies.updatedAt,
          })
          .from(competencies)
          .where(eq(competencies.inTrash, true))
          .orderBy(desc(competencies.updatedAt)),
      ]);
        
      const parsedCompetency = competency.map(item => ({
        ...item,
        description: String(item.description)  ,
      }));

      const populatedData = [
        ...(group?.map(group => ({
          ...group,
          type: Category.GROUP
        })) || []),
        ...(parsedCompetency?.map(comp => ({
          ...comp,
          type: Category.COMPETENCY
        })) || [])
      ].sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));

      const updatedPeoples = await db
        .select({
          name: users.name,
          image: users.image,
        })
        .from(users)
        .where(
          inArray(
            users.name,
            Array.from(new Set(populatedData.map((item) => item.updatedBy)))
          )
        );

      return c.json({ 
        data: {
          populatedData,
          updatedPeoples,
        } 
      });
    }
  )

export default app;
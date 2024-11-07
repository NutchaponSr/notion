import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { Category } from "@/types";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { and, eq, inArray } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";
import { parse } from "date-fns";
import { buildSearchCondition, formatDateCondition, sortOrder } from "../utils";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        sort: z.string().nullish(),
        from: z.string().optional(),
        to: z.string().optional(),
        type: z.string().optional(),
        search: z.string().optional(),
      }),
    ),
    async (c) => {
      const session = await auth();

      const { sort, from, to, type, search } = c.req.valid("query");

      if (!session) {
        return c.text("Unauthorized", 401);
      }

      const searchTerm = search && search.trim() !== "" ? `%${search}%` : null;
      const fromDate = from ? parse(from, "yyyy-MM-dd", new Date()) : null;
      const toDate = to ? parse(to, "yyyy-MM-dd", new Date()) : null;

      const dateField = {
        group: type !== "edit" ? groups.createdAt : groups.updatedAt,
        competency: type !== "edit" ? competencies.createdAt : competencies.updatedAt
      };

      const [orderByGroup, orderByCompetency] = sortOrder(sort);

      const fetchResults = async () => {
        const [groupResults, competencyResults] = await Promise.all([
          db.select({
            id: groups.id,
            name: groups.name,
            icon: groups.icon,
            description: groups.year,
            createdBy: groups.createdBy,
            createdAt: groups.createdAt,
          })
          .from(groups)
          .where(and(
            eq(groups.inTrash, false),
            buildSearchCondition(searchTerm, groups.name),
            ...formatDateCondition(fromDate, toDate, dateField.group)
          ))
          .orderBy(orderByGroup),

          db.select({
            id: competencies.id,
            name: competencies.name,
            icon: competencies.icon,
            description: competencies.type,
            createdBy: competencies.createdBy,
            createdAt: competencies.createdAt,
          })
          .from(competencies)
          .where(and(
            eq(competencies.inTrash, false),
            buildSearchCondition(searchTerm, competencies.name),
            ...formatDateCondition(fromDate, toDate, dateField.competency)
          ))
          .orderBy(orderByCompetency)
        ]);

        const createdByIds = [...groupResults, ...competencyResults]
          .map(item => item.createdBy);

        const creators = await db
          .select({
            name: users.name,
            image: users.image,
          })
          .from(users)
          .where(inArray(users.name, Array.from(new Set(createdByIds))));

        return {
          data: [
            { 
              label: Category.GROUP,
              data: groupResults.map(item => ({ ...item, type: Category.GROUP }))
            },
            {
              label: Category.COMPETENCY,
              data: competencyResults.map(item => ({ ...item, type: Category.COMPETENCY }))
            }
          ],
          createdPeoples: creators
        };
      };

      return c.json({ data: await fetchResults() });
    }
  )

export default app;
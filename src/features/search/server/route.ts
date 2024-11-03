import { z } from "zod";
import { Hono } from "hono";
import { auth } from "@/auth";
import { Category } from "@/types";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { and, asc, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";
import { addDays, isSameDay, parse } from "date-fns";

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

      const modeGroup = !type || type === "create" ? groups.createdAt : groups.updatedAt;
      const modeCompetency = !type || type === "create" ? competencies.createdAt : competencies.updatedAt;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleDateCondition = (fromDate: Date | null, toDate: Date | null, mode: any) => {
        if (fromDate && toDate && isSameDay(fromDate, toDate)) {
          return [
            fromDate ? gte(mode, fromDate) : undefined,
            fromDate && undefined,
          ]
        } else {
          const adjustedToDate = toDate ? addDays(toDate, 1) : undefined;
      
          return [
            fromDate ? gte(mode, fromDate) : undefined, 
            adjustedToDate ? lte(mode, adjustedToDate) : undefined, 
          ].filter(Boolean); 
        }
      };

      const groupConditions = [
        eq(groups.inTrash, false),
        searchTerm ? sql`LOWER(${groups.name}) LIKE ${searchTerm}` : undefined,
        ...handleDateCondition(fromDate, toDate, modeGroup),
      ].filter(Boolean);
      
      const competencyConditions = [
        eq(competencies.inTrash, false),
        searchTerm ? sql`LOWER(${competencies.name}) LIKE ${searchTerm}` : undefined,
        ...handleDateCondition(fromDate, toDate, modeCompetency),
      ].filter(Boolean);

      let orderBy = null;
      switch (sort) {
        case "EDITED_ASC":
          orderBy = [asc(groups.updatedAt), asc(competencies.updatedAt)];
          break;
        case "EDITED_DESC":
          orderBy = [desc(groups.updatedAt), desc(groups.updatedAt)];
          break;
        case "CREATED_ASC":
          orderBy = [asc(groups.createdAt), asc(competencies.createdAt)];
          break;
        case "CREATED_DESC":
          orderBy = [desc(groups.createdAt), desc(competencies.createdAt)];
          break;
        default:
          orderBy = [desc(groups.id), desc(competencies.id)];
          break;
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
          .where(and(...groupConditions))
          .orderBy(orderBy[0]),
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
          .where(and(...competencyConditions))
          .orderBy(orderBy[1]),
      ]);

      const createdPeoples = await db
        .select({
          name: users.name,
          image: users.image,
        })
        .from(users)
        .where(
          inArray(
            users.name,
            Array.from(
              new Set([...group, ...competency].map((item) => item.createdBy)),
            ),
          )
        );

      return c.json({
        data: {
          data: [
            { 
              label: Category.GROUP, 
              data: group.map(item => ({ ...item, type: Category.GROUP }))
            },
            { 
              label: Category.COMPETENCY, 
              data: competency.map(item => ({ ...item, type: Category.COMPETENCY }))
            },
          ],
          createdPeoples
        }
      })
    }
  )

export default app;
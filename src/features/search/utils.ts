import { addDays, isSameDay } from "date-fns";

import { competencies, groups } from "@/db/schema";
import { asc, desc, gte, lte, sql, SQLWrapper } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildSearchCondition(search: string | null, field: any) {
  return search ? sql`LOWER(${field}) LIKE ${search}` : undefined;
}

export function sortOrder(value: string | null | undefined) {
  const sortMap = {
    EDITED_ASC: [asc, "updatedAt"],
    EDITED_DESC: [desc, "updatedAt"],
    CREATED_ASC: [asc, "createdAt"],
    CREATED_DESC: [asc, "createdAt"],
    DEFAULT: [desc, "id"],
  } as const;

  const [sort, field] = sortMap[value as keyof typeof sortMap] ?? sortMap.DEFAULT;
  return [sort(groups[field]), sort(competencies[field])];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatDateCondition(from: Date | null, to: Date | null, field: any): SQLWrapper[] {
  if (!from && !to) return [];

  if (from && to && isSameDay(from, to)) {
    return [gte(field, from)];
  }

  return [
    from && gte(field, from),
    to && lte(field, addDays(to, 1))
  ].filter(Boolean) as SQLWrapper[]; 
}
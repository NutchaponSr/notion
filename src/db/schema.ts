
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const roles = pgEnum("roles", ["ADMIN", "USER"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image"),
  role: roles("role").default("USER").notNull(),
  password: text("password").notNull(),
});

export const departments = pgEnum("departments", [
  "Marketing",
  "Human resources",
  "Finance",
  "Product development",
  "Customer support",
]);

export const positions = pgEnum("positions", [
  "Worker",
  "Chief",
  "Manager"
]);

export const requests = pgTable("request", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").notNull(),
  department: departments("department").notNull(),
  position: positions("position").notNull(),
  description: text("description"),
  requestedAt: timestamp("requestedAt", { mode: "string" }).notNull().defaultNow(),
});

export const groups = pgTable("group", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  icon: varchar("icon", { length: 1 }),
  year: text("year").notNull(),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});

export const favorites = pgTable("favorite", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  groupId: text("groupId").references(() => groups.id, { onDelete: "cascade" }).notNull(),
});

export const typesCompetency = pgEnum("typesCompetency", ["CC", "FC", "TC"]);

export const competencies = pgTable("competency", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  icon: varchar("icon", { length: 1 }),
  definition: text("definition"),
  pl1: text("pl1"),
  pl2: text("pl2"),
  pl3: text("pl3"),
  pl4: text("pl4"),
  pl5: text("pl5"),
  type: typesCompetency("type").notNull(),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});

export const insertCompetencySchema = createInsertSchema(competencies);
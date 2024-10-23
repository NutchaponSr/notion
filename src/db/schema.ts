
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

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
CREATE TYPE "public"."departments" AS ENUM('Marketing', 'Human resources', 'Finance', 'Product development', 'Customer support');--> statement-breakpoint
CREATE TYPE "public"."positions" AS ENUM('Worker', 'Chief', 'Manager');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "request" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"department" "departments" NOT NULL,
	"position" "positions" NOT NULL,
	"description" text,
	"requestedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"role" "roles" DEFAULT 'USER' NOT NULL,
	"password" text NOT NULL
);

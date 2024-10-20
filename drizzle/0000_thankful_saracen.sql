CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"role" "roles" DEFAULT 'USER' NOT NULL,
	"password" text NOT NULL
);

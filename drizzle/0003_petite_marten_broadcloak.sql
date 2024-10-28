CREATE TYPE "public"."typesCompetency" AS ENUM('CC', 'FC', 'TC');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" varchar(1),
	"definition" text,
	"pl1" text,
	"pl2" text,
	"pl3" text,
	"pl4" text,
	"pl5" text,
	"type" "typesCompetency" NOT NULL,
	"inTrash" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"updatedBy" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "group" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" varchar(1),
	"year" text NOT NULL,
	"inTrash" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"updatedBy" text NOT NULL
);

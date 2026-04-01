-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"content" jsonb NOT NULL,
	"params" jsonb NOT NULL,
	"gen_metadata" text DEFAULT '{}' NOT NULL,
	"name" text
);
--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "fk_created_by_users_id" FOREIGN KEY ("created_by") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;
*/
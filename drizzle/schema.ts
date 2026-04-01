import { pgTable, foreignKey, uuid, jsonb, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const assignments = pgTable("assignments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdBy: uuid("created_by").notNull(),
	content: jsonb().notNull(),
	params: jsonb().notNull(),
	genMetadata: text("gen_metadata").default('{}').notNull(),
	name: text(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [user.id],
			name: "fk_created_by_users_id"
		}),
]);

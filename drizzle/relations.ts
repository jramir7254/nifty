import { relations } from "drizzle-orm/relations";
import { userInNeonAuth, assignments } from "./schema";

export const assignmentsRelations = relations(assignments, ({one}) => ({
	userInNeonAuth: one(userInNeonAuth, {
		fields: [assignments.createdBy],
		references: [userInNeonAuth.id]
	}),
}));

export const userInNeonAuthRelations = relations(userInNeonAuth, ({many}) => ({
	assignments: many(assignments),
}));
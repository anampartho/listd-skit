import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

export type User = typeof schema.usersTable.$inferSelect; // return type when queried
export type NewUser = typeof schema.usersTable.$inferInsert; // insert type

export async function getAllUsers(): Promise<User[]> {
	return db.query.usersTable.findMany();
}

export async function createNewUser(user: NewUser): Promise<User[]> {
	return db.insert(schema.usersTable).values(user).returning();
}

import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	username: varchar('username', { length: 100 }).notNull().unique(),
	email: text('email').notNull().unique()
});

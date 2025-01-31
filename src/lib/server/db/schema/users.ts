import { relations } from 'drizzle-orm';
import { uuid, varchar } from 'drizzle-orm/pg-core';

import listdSchema, { timestamps } from './shared';
import { feed } from '.';

const users = listdSchema.table('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	...timestamps
});

export const usersRelation = relations(users, ({ many }) => ({
	feeds: many(feed)
}));

export default users;

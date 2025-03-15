import { relations } from 'drizzle-orm';
import { timestamp, text } from 'drizzle-orm/pg-core';
import { feed, userSettings } from '.';
import listdSchema from './shared';

export const users = listdSchema.table('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});

export const usersRelation = relations(users, ({ one, many }) => ({
	feeds: many(feed),
	settings: one(userSettings)
}));

export default users;

import { relations } from 'drizzle-orm';
import { uuid, varchar } from 'drizzle-orm/pg-core';

import listdSchema, { timestamps } from './shared';
import { users, feedItem, feedVisibility } from '.';

const feed = listdSchema.table('feed', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }),
	createdBy: uuid('created_by').references(() => users.id),
	visibility: uuid('visibility').references(() => feedVisibility.id),
	...timestamps
});

export const feedRelations = relations(feed, ({ many, one }) => ({
	items: many(feedItem),
	creator: one(users, {
		fields: [feed.createdBy],
		references: [users.id]
	}),
	visibility: one(feedVisibility, {
		fields: [feed.visibility],
		references: [feedVisibility.id]
	})
}));

export default feed;

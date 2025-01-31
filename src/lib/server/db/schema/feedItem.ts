import { relations } from 'drizzle-orm';
import { uuid, varchar } from 'drizzle-orm/pg-core';

import listdSchema, { timestamps } from './shared';
import { feedItemMeta, feed } from '.';

const feedItem = listdSchema.table('feed_item', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }),
	metaId: uuid('meta_id').references(() => feedItemMeta.id),
	feedId: uuid('feed_id').references(() => feed.id),
	...timestamps
});

export const feedItemRelations = relations(feedItem, ({ one }) => ({
	feed: one(feed, {
		fields: [feedItem.feedId],
		references: [feed.id]
	}),
	meta: one(feedItemMeta, {
		fields: [feedItem.metaId],
		references: [feedItemMeta.id]
	})
}));

export default feedItem;

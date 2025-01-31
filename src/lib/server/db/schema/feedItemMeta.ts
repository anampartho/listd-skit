import { text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import listdSchema, { timestamps } from './shared';
import { feedItem } from '.';

export const feedItemTypeEnum = listdSchema.enum('feed_item_type', ['YOUTUBE_CHANNEL']);

const feedItemMeta = listdSchema.table('feed_item_meta', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	type: feedItemTypeEnum('type').notNull(),
	originId: text('origin_id').notNull(),
	...timestamps
});

export const feedItemMetaRelations = relations(feedItemMeta, ({ many }) => ({
	items: many(feedItem)
}));

export default feedItemMeta;

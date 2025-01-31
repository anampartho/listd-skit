import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';

import listdSchema, { timestamps } from './shared';
import { feed } from '.';

export const feedVisibilityEnum = listdSchema.enum('feed_visibility_type', [
	'PUBLIC',
	'PRIVATE',
	'UNLISTED'
]);

const feedVisibility = listdSchema.table('feed_visibility', {
	id: uuid('id').primaryKey().defaultRandom(),
	visibilityType: feedVisibilityEnum('visibility_type').notNull(),
	...timestamps
});

export const feedVisibilityRelations = relations(feedVisibility, ({ many }) => ({
	feeds: many(feed)
}));

export default feedVisibility;

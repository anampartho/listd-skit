import { relations } from 'drizzle-orm';
import { varchar, uuid, pgSchema, text, timestamp } from 'drizzle-orm/pg-core';

export const schema = pgSchema('listd-skit');

const timestamps = {
	updated_at: timestamp(),
	created_at: timestamp().defaultNow().notNull()
};

// User table
export const usersTable = schema.table('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	username: varchar('username', { length: 100 }).notNull().unique(),
	...timestamps
});

export const usersRelation = relations(usersTable, ({ many }) => ({
	feeds: many(feedTable)
}));

// Feed table
export const feedTable = schema.table('feed', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull(),
	description: varchar('description', { length: 200 }),
	createdBy: uuid('created_by').notNull(),
	visibility: uuid('visibility').notNull(),
	...timestamps
});

export const feedRelations = relations(feedTable, ({ many, one }) => ({
	items: many(feedItemTable),
	creator: one(usersTable, {
		fields: [feedTable.createdBy],
		references: [usersTable.id]
	}),
	visibility: one(feedVisibilityTable, {
		fields: [feedTable.visibility],
		references: [feedVisibilityTable.id]
	})
}));

// Feed Visibility Table
export const feedVisibilityEnum = schema.enum('feed_visibility_type', [
	'PUBLIC',
	'PRIVATE',
	'UNLISTED'
]);
export const feedVisibilityTable = schema.table('feed_visibility', {
	id: uuid('id').primaryKey().defaultRandom(),
	visibilityType: feedVisibilityEnum('visibility_type').notNull(),
	...timestamps
});

export const feedVisibilityRelations = relations(feedVisibilityTable, ({ many }) => ({
	feeds: many(feedTable)
}));

// FeedItem Schema
export const feedItemTable = schema.table('feed_item', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull(),
	description: varchar('description', { length: 200 }),
	metaId: uuid('meta_id').notNull(),
	feedId: uuid('feed_id').notNull(),
	...timestamps
});

export const feedItemRelations = relations(feedItemTable, ({ one }) => ({
	feed: one(feedTable, {
		fields: [feedItemTable.feedId],
		references: [feedTable.id]
	}),
	meta: one(feedItemMetaTable, {
		fields: [feedItemTable.metaId],
		references: [feedItemMetaTable.id]
	})
}));

// Feed Item Meta
export const feedItemTypeEnum = schema.enum('feed_item_type', ['YOUTUBE_CHANNEL']);

export const feedItemMetaTable = schema.table('feed_item_meta', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull(),
	type: feedItemTypeEnum('type').notNull(),
	originId: text('origin_id').notNull(),
	...timestamps
});

export const feedItemMetaRelations = relations(feedItemMetaTable, ({ many }) => ({
	items: many(feedItemTable)
}));

// TODO: Auth Schemas

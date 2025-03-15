import { boolean, pgEnum, text } from 'drizzle-orm/pg-core';
import listdSchema from './shared';
import users from './users';
import { relations } from 'drizzle-orm';

export const colorScheme = pgEnum('color_scheme', ['light', 'dark', 'system']);

export const userSettings = listdSchema.table('user_settings', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('userId').references(() => users.id, {
		onDelete: 'cascade'
	}),
	onboarded: boolean('onboarded').notNull().default(false),
	colorScheme: colorScheme().default('system')
});

export const userSettingsRelation = relations(userSettings, ({ one }) => ({
	user: one(users, {
		fields: [userSettings.userId],
		references: [users.id]
	})
}));

export default userSettings;

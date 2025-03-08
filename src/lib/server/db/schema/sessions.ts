import { timestamp, text } from 'drizzle-orm/pg-core';
import listdSchema from './shared';
import users from './users';

export const sessions = listdSchema.table('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export default sessions;

import { timestamp, text, primaryKey } from 'drizzle-orm/pg-core';
import listdSchema from './shared';

export const verificationTokens = listdSchema.table(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(verificationToken) => [
		{
			compositePk: primaryKey({
				columns: [verificationToken.identifier, verificationToken.token]
			})
		}
	]
);

export default verificationTokens;

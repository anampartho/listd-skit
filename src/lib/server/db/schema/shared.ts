import { pgSchema, timestamp } from 'drizzle-orm/pg-core';

const listdSchema = pgSchema('listd-skit');

export const timestamps = {
	updated_at: timestamp(),
	created_at: timestamp().defaultNow().notNull()
};

export default listdSchema;

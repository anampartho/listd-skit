import { defineConfig } from 'drizzle-kit';
if (!process.env.DB_URL) throw new Error('DB_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema/index.ts',
	out: './src/lib/server/db/migrations',
	dbCredentials: {
		url: process.env.DB_URL
	},
	verbose: true,
	strict: true,
	dialect: 'postgresql',
	schemaFilter: ['listd-skit']
});

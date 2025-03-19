import { type Adapter, type AdapterSession, type AdapterUser } from '@auth/core/adapters';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db/client';
import { accounts, sessions, users, userSettings, verificationTokens } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const DEFAULT_USER_SETTINGS = {
	onboarded: false,
	colorScheme: 'system'
} as const;

const PgDrizzleAdapter: Adapter = {
	...DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	async getSessionAndUser(
		sessionToken: string
	): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
		const result = await db
			.select({
				session: {
					sessionToken: sessions.sessionToken,
					userId: sessions.userId,
					expires: sessions.expires
				},
				user: {
					id: users.id,
					name: users.name,
					email: users.email,
					image: users.image
				},
				settings: {
					onboarded: userSettings.onboarded,
					colorScheme: userSettings.colorScheme
				}
			})
			.from(sessions)
			.where(eq(sessions.sessionToken, sessionToken))
			.innerJoin(users, eq(users.id, sessions.userId))
			.leftJoin(userSettings, eq(userSettings.userId, users.id))
			.limit(1);

		if (!result.length) return null;

		const [{ session, user, settings }] = result;

		return {
			session,
			user: {
				...user,
				// @ts-expect-error - This is a custom field
				onboarded: settings?.onboarded ?? DEFAULT_USER_SETTINGS.onboarded,
				colorScheme: settings?.colorScheme ?? DEFAULT_USER_SETTINGS.colorScheme
			}
		};
	}
};

export default PgDrizzleAdapter;

import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db/client';
import { accounts, sessions, users, userSettings, verificationTokens } from '$lib/server/db/schema';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	providers: [Google],
	events: {
		async createUser({ user }) {
			await db.insert(userSettings).values({
				userId: user.id
			});
		}
	}
});

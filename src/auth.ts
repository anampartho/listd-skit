import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import PgDrizzleAdapter from '$lib/adapters/pg-drizzle';
import { db } from '$lib/server/db/client';
import { userSettings } from '$lib/server/db/schema';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			onboarded: boolean;
			colorScheme: string;
		} & DefaultSession['user'];
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	adapter: PgDrizzleAdapter,
	providers: [Google],
	callbacks: {
		async session({ session, user }) {
			return {
				...session,
				user
			};
		}
	},
	events: {
		async createUser({ user }) {
			await db.insert(userSettings).values({
				userId: user.id
			});
		}
	}
});

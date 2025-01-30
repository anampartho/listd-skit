import { db } from '$lib/server/db';
import { createNewUser } from '$lib/server/router/users';
import type { Actions } from '@sveltejs/kit';

export async function load() {
	const users = await db.query.usersTable.findMany();
	return {
		users
	};
}

export const actions = {
	register: async function ({ request }) {
		const data = await request.formData();
		const username = data.get('username') as string;
		const email = data.get('email') as string;

		const newUser = await createNewUser({ username, email });

		return { success: true, newUser };
	}
} satisfies Actions;

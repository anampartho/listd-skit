import { redirect } from '@sveltejs/kit';
import { signOut } from '../../auth';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		await signOut(event);
		throw redirect(302, '/');
	}
} satisfies Actions;

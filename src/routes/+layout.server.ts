import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, route }) => {
	const session = await locals.auth();

	if (session?.user && !session.user.onboarded && route.id !== '/(protected)/onboarding') {
		redirect(302, '/onboarding');
	}

	if (session?.user && session.user.onboarded && route.id === '/(protected)/onboarding') {
		redirect(302, '/');
	}

	return {
		session
	};
};

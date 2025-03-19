import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';

const protectedHandle = (async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!session && event.route.id?.includes('(protected)')) {
		redirect(302, '/');
	}
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth, protectedHandle);

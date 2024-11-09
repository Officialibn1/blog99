import db from '$lib/database';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const adminSession = event.cookies.get('adminSession');

	// const currentPath = event.url.pathname

	const protectedPath = '/dashboard';

	if (!adminSession && event.url.pathname.startsWith(protectedPath)) {
		// console.log('Redirect UnAuthorised User');

		throw redirect(303, '/signin');
	}

	if (
		(adminSession && event.url.pathname.startsWith('/signin')) ||
		(adminSession && event.url.pathname.startsWith('/register'))
	) {
		// console.log('Redirect Authorised User');

		throw redirect(303, '/dashboard');
	}

	if (adminSession) {
		// console.log('Fetching user from DB');

		const user = await db.user.findUnique({
			where: { authToken: adminSession }
		});

		if (!user) {
			event.cookies.delete('adminSession', {
				path: '/dashboard'
			});
			throw redirect(303, '/signin');
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...publicData } = user;

		event.locals.user = publicData;
	}

	// console.log('COOKIES: ', adminSession);

	return resolve(event);
};

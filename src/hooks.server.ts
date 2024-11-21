import jwt from 'jsonwebtoken';
import { redirect, type Handle } from '@sveltejs/kit';
import { SECRET_INGREDIENT } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const adminSession = event.cookies.get('adminSession');

	const publicRoutes = ['/signin', '/register', '/', '/blogs', '/contact', '/api/public'];

	const currentPath = event.url.pathname;

	// console.log('HOOKS LOCALS USER: ', event.locals);

	const isPublicRoute = (path: string): boolean => {
		return publicRoutes.some((route) => path === route || path.startsWith(`${route}/`));
	};

	if (!isPublicRoute(currentPath) && !adminSession) {
		// event.locals.user = null;
		// event.locals.session = null;

		return redirect(303, '/signin');
	}

	if (adminSession) {
		const claims = jwt.verify(adminSession, SECRET_INGREDIENT);

		if (!claims) {
			// event.locals.user = null;
			// event.locals.session = null;
			event.cookies.delete('adminSession', { path: '/' });

			return redirect(302, '/signin');
		}

		if (adminSession && claims && (currentPath === '/signin' || currentPath === '/register')) {
			return redirect(303, '/dashboard');
		}
	}

	return resolve(event);
};

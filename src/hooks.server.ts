import jwt from 'jsonwebtoken';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const adminSession = event.cookies.get('adminSession');

	const publicRoutes = ['/signin', '/register', '/', '/blogs', '/contact', '/api/public'];

	const currentPath = event.url.pathname;

	// console.log('HOOKS LOCALS USER: ', event.locals);

	if (
		!event.url.pathname.startsWith('/api/') &&
		!event.url.pathname.startsWith('/dashboard') &&
		!event.url.pathname.includes('favicon')
	) {
		try {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const todaysTraffic = await db.traffic.findFirst({
				where: {
					date: today
				}
			});

			if (todaysTraffic) {
				await db.traffic.update({
					where: {
						date: today
					},
					data: {
						count: {
							increment: 1
						}
					}
				});
			} else {
				await db.traffic.upsert({
					where: {
						date: today
					},
					create: {
						count: 1,
						date: today
					},
					update: {
						count: {
							increment: 1
						}
					}
				});
			}

			console.log('Count Hook Run');
		} catch (e) {
			console.error('Error in traffic hook:', e);

			error(500, e instanceof Error ? e.message : String(e));
		}
	}

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

import { error, json, type RequestHandler } from '@sveltejs/kit';

import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';

export const GET = (async ({ cookies }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, 'AunAuthorized');
	}

	try {
		const claim = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claim) {
			cookies.delete('adminSession', { path: '/' });

			error(400, 'Session Expired!');
		} else {
			const author = await db.user.findUnique({ where: { authToken } });

			const categories = await db.category.findMany({
				where: { authorId: author?.id },
				include: {
					blogs: true
				}
			});

			// console.log(categories);

			return json(categories);
		}
	} catch (e) {
		console.error(e);

		return error(400, 'Failed to fetch categories!!');
	}
}) satisfies RequestHandler;

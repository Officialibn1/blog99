import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';
import { json, type RequestHandler, error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const GET = (async ({ cookies }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, 'UnAuthorized');
	}

	try {
		const claim = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claim) {
			cookies.delete('adminSession', { path: '/' });

			error(400, 'Session Expired!');
		} else {
			const author = await db.user.findUnique({ where: { authToken } });

			const tags = await db.tag.findMany({ where: { authorId: author?.id } });

			// setHeaders({
			// 	'Cache-Control': 'max-age=60'
			// });

			return json(tags);
		}
	} catch (e) {
		console.log(e);

		return error(400, 'Failed to fetch tags!!');
	}
}) satisfies RequestHandler;

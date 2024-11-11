import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';
import { json, type RequestHandler, error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const GET: RequestHandler = async (event) => {
	const authToken = event.cookies.get('adminSession');

	if (!authToken) {
		error(400, 'UnAuthorized');
	}

	try {
		const claim = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claim) {
			event.cookies.delete('authToken', { path: '/' });

			error(400, 'UnAuthorized');
		} else {
			const author = await db.user.findUnique({ where: { authToken } });

			const tags = await db.tag.findMany({ where: { authorId: author?.id } });

			event.setHeaders({
				'Cache-Control': 'max-age=60'
			});

			return json(tags);
		}
	} catch (e) {
		console.log(e);

		return error(400, 'Failed to fetch tags!!');
	}
};

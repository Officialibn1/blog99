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
			const admin = await db.user.findUnique({ where: { authToken } });

			if (!admin) {
				cookies.delete('adminSession', { path: '/' });

				error(400, `Session Expired / User doesn't exist`);
			}

			const tags = await db.tag.findMany({ where: { authorId: admin.id } });

			// setHeaders({
			// 	'Cache-Control': 'max-age=60'
			// });

			return json(tags);
		}
	} catch (e) {
		console.error(JSON.stringify(e));

		return error(400, 'Failed to fetch tags!!');
	}
}) satisfies RequestHandler;

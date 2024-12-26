import { error, json, type RequestHandler } from '@sveltejs/kit';

import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';

export const GET = (async ({ cookies }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, 'Unauthorized');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			cookies.delete('adminSession', { path: '/' });

			error(400, 'Session Expired');
		} else {
			const admin = await db.user.findUnique({ where: { authToken } });

			if (!admin) {
				cookies.delete('adminSession', { path: '/' });

				error(400, `User doesn't exist /  Session Expired`);
			}

			const subscribers = await db.subscriber.findMany();

			return json(subscribers);
		}
	} catch (e) {
		error(500, JSON.stringify(e));
		// return {
		//     status: 500,
		//     body: { error: 'Internal Server Error' }
		// };
	}
}) satisfies RequestHandler;

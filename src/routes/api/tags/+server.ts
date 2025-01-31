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

export const POST = (async ({ cookies, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(401, 'unAuthorized Access');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			error(401, 'Session Expired');
		}

		const author = await db.user.findUnique({ where: { authToken } });

		if (!author) {
			error(401, 'Session Expired');
		}

		const { name } = await request.json();

		const tag = await db.tag.findUnique({ where: { name } });

		if (tag && tag.name.toLowerCase() === name.toLowerCase()) {
			error(400, 'Tag already exists');
		}

		const newTag = await db.tag.create({
			data: {
				name,
				authorId: author.id
			}
		});

		return json(newTag);
	} catch (e) {
		console.error(e);

		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;

export const PUT = (async ({ cookies, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(401, 'unAuthorized');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			error(401, 'Session Expired');
		}

		const author = await db.user.findUnique({ where: { authToken } });

		if (!author) {
			error(401, 'Session Expired');
		}

		const { id, name }: { id: string; name: string } = await request.json();

		const tag = await db.tag.findUnique({ where: { id } });

		if (!tag) {
			error(404, 'Tag not found');
		}

		const newTag = await db.tag.update({
			where: { id },
			data: { name }
		});

		return json(newTag);
	} catch (e) {
		console.error(e);

		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ cookies, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(401, 'unAuthorized Access');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			error(401, 'Session Expired!');
		}

		const author = await db.user.findUnique({ where: { authToken } });

		if (!author) {
			error(401, 'Session Expired!');
		}

		const { id } = await request.json();

		const tag = await db.tag.findUnique({ where: { id } });

		if (!tag) {
			error(404, 'Tag not found');
		}

		const deletedTag = await db.tag.delete({ where: { id } });

		return json(deletedTag);
	} catch (e) {
		console.error(e);

		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;

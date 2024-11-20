import db from '$lib/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	try {
		const blogs = await db.blog.findMany({
			where: {
				published: true
			},
			include: {
				comments: true,
				category: true,
				tags: true
			}
		});

		return json(blogs);
	} catch (e) {
		console.error('PUBLIC BLOGS SERVER ERROR: ', e);

		error(400, JSON.stringify(e, null, 2));
	}
}) satisfies RequestHandler;

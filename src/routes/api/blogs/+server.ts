import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';
import { formatTitleToSlug } from '$lib/utils';

import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

interface Blog {
	title: string;
	description: string;
	tags: string[];
	category: string;
	content: string;
	published: boolean;
}

export const POST = (async ({ cookies, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		return error(400, {
			message: 'UnAuthorized'
		});
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			cookies.delete('adminSession', { path: '/' });

			error(400, {
				message: 'Session Expired!'
			});
		} else {
			const data: Blog = await request.json();

			const slug = formatTitleToSlug(data.title);

			const author = await db.user.findUnique({ where: { authToken } });

			const blog = await db.blog.create({
				data: {
					authorId: author?.id as string,
					title: data.title,
					slug,
					description: data.description,
					tagsIds: data.tags,
					categoryId: data.category,
					markdown: data.content,
					published: data.published
				}
			});

			return json(blog);
		}
	} catch (e) {
		console.log('ERROR CREATING BLOG IN SERVER.TS: ', JSON.stringify(e, null, 2));

		return error(400, {
			message: JSON.stringify(e, null, 2)
		});
	}
}) satisfies RequestHandler;

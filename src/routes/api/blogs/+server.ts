import { SECRET_INGREDIENT } from '$env/static/private';
import { uploadThumnailToCloudinary } from '$lib/cloudinary';
import db from '$lib/database';
import { formatTitleToSlug } from '$lib/utils';

import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

interface Blog {
	title: string;
	description: string;
	tags: string[];
	thumbNail: File;
	category: string;
	content: string;
	published: boolean;
}

export const POST = (async ({ cookies, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, {
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
			const formData = await request.formData();

			const data = Object.fromEntries(formData.entries());

			const parsedData = {
				...data,
				tags: JSON.parse(data.tags as string),
				published: data.published === 'true',
				thumbNail: formData.get('thumbNail') as File
			} as Blog;

			const slug = formatTitleToSlug(parsedData.title);

			const existingBlogWithSlug = await db.blog.findUnique({ where: { slug } });

			if (existingBlogWithSlug) {
				throw new Error('A blog with this title already exist', {
					cause: {
						status: 400
					}
				});
			}

			const author = await db.user.findUnique({ where: { authToken } });

			let cloudinaryUpload: { public_id: string; secure_url: string } | null = null;

			cloudinaryUpload = await uploadThumnailToCloudinary(parsedData.thumbNail);

			const blogTransaction = await db.$transaction(async (tx) => {
				const blog = await tx.blog.create({
					data: {
						authorId: author?.id as string,
						title: parsedData.title,
						slug,
						description: parsedData.description,
						tagsIds: parsedData.tags,
						categoryId: parsedData.category,
						thumbnail: cloudinaryUpload.secure_url,
						markdown: parsedData.content,
						published: parsedData.published,
						views: 0
					}
				});

				await tx.tag.updateMany({
					where: {
						id: {
							in: parsedData.tags
						}
					},
					data: {
						blogsIds: {
							push: blog.id
						}
					}
				});

				return tx.blog.findUnique({
					where: {
						id: blog.id
					},
					include: {
						tags: {
							select: {
								name: true
							}
						}
					}
				});
			});

			return json(blogTransaction);
		}
	} catch (e) {
		console.log('ERROR CREATING BLOG IN SERVER.TS: ', e);

		error(400, e as Error);
	}
}) satisfies RequestHandler;

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

			const blogs = await db.blog.findMany({ where: { authorId: admin.id } });

			return json(blogs);
		}
	} catch (e) {
		error(400, JSON.stringify(e));
	}
}) satisfies RequestHandler;

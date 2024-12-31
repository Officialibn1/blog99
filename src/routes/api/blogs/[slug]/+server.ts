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

export const GET = (async ({ cookies, params }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, 'Unauthorized');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			cookies.delete('adminSession', { path: '/' });

			error(400, 'Session Expired');
		}

		const admin = await db.user.findUnique({ where: { authToken } });

		if (!admin) {
			cookies.delete('adminSession', { path: '/' });

			error(400, `User doesn't exist /  Session Expired`);
		}

		const blog = await db.blog.findUnique({
			where: { id: params.slug }
		});

		return json(blog);
	} catch (e) {
		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;

export const PUT = (async ({ cookies, params: { slug: id }, request }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(401, 'UnAuthorized');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			cookies.delete('adminSession', { path: '/' });

			error(401, 'Session Expired');
		}

		const admin = await db.user.findUnique({ where: { authToken } });

		if (!admin) {
			cookies.delete('adminSession', { path: '/' });

			error(401, `User doesn't exist /  Session Expired`);
		}

		const blog = await db.blog.findUnique({
			where: { id }
		});

		if (!blog) {
			error(404, 'Blog not found');
		}

		const formData = await request.formData();

		const data = Object.fromEntries(formData);

		const parsedData = {
			...data,
			tags: JSON.parse(data.tags as string),
			published: data.published === 'true',
			thumbNail: formData.get('thumbNail') as File
		} as Blog;

		const newSlug = formatTitleToSlug(parsedData.title);

		let cloudinaryUpload: {
			public_id: string;
			secure_url: string;
		} | null = null;

		if (parsedData.thumbNail) {
			cloudinaryUpload = await uploadThumnailToCloudinary(parsedData.thumbNail);
		}

		const blogTransaction = await db.$transaction(async (tx) => {
			const updatedBlog = await tx.blog.update({
				where: { id: blog.id },
				data: {
					title: parsedData.title,
					description: parsedData.description,
					slug: newSlug,
					tagsIds: parsedData.tags,
					categoryId: parsedData.category,
					thumbnail: cloudinaryUpload ? cloudinaryUpload.secure_url : blog.thumbnail,
					thumbnailPublicId: cloudinaryUpload ? cloudinaryUpload.public_id : blog.thumbnailPublicId,
					markdown: parsedData.content,
					published: parsedData.published
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
						push: updatedBlog.id
					}
				}
			});

			return tx.blog.findUnique({
				where: { id: updatedBlog.id },
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
	} catch (e) {
		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;
